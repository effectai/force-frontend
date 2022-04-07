<template>
  <span>
    <div v-if="loading" class="loader-wrapper is-active">
      <img src="~assets/img/loading.svg">
      <br><span class="loading-text">Making reservation</span>
    </div>
  </span>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
const retry = require('async-retry')

export default {
  props: {
    batch: {
      type: Object,
      default: null
    },
    campaignId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      error: null,
      now: 0,
      reserveInBatch: null,
      availableBatches: []
    }
  },
  computed: {
    ...mapGetters({
      batchesByCampaignId: 'campaign/batchesByCampaignId',
      submissionsByBatchId: 'campaign/submissionsByBatchId'
    }),
    ...mapState({
      allSubmissionsLoaded: state => state.campaign.allSubmissionsLoaded
    }),
    campaignBatches () {
      return this.batchesByCampaignId(this.campaignId)
    }
  },
  mounted () {
    this.updateNow()
    setInterval(this.updateNow, 1000)
    this.makeReservation()
  },
  methods: {
    async submissions (id) {
      return await this.submissionsByBatchId(id)
    },
    async getSubmissions () {
      await this.$store.dispatch('campaign/getSubmissions')
    },
    updateNow () {
      this.now = parseInt((Date.now() / 1000).toFixed(0))
    },
    async makeReservation () {
      try {
        let foundReservation = false
        await this.getSubmissions()
        // if there's no batch specified, check in all the batches if there's still available tasks
        if (!this.batch) {
          for (const batch of this.campaignBatches) {
            if (batch.num_tasks * batch.repetitions > batch.tasks_done) {
              this.reserveInBatch = batch
              this.availableBatches.push(batch)
            }
          }
        } else {
          this.availableBatches.push(this.batch)
        }

        // go through the batches that have available tasks
        for (const batch of this.availableBatches) {
          await this.$store.dispatch('campaign/getBatchTasks', batch)
          this.loading = true
          const rs = await this.submissions(batch.batch_id)

          // seperate reservations and submissions
          const reservations = []
          const submissions = []
          for (const r of Object.values(rs)) {
            if (!r.data || !r.data.length) {
              reservations.push(r)
            }
          }
          for (const r of Object.values(rs)) {
            if (r.data || r.data.length) {
              submissions.push(r)
            }
          }

          // get a reservation for the user
          // could be an active reservation of the user, or an expired/released reservation in the batch
          let rvObj = await this.pickReservationForUser(reservations)
          console.log('hi', rvObj)
          if (rvObj.reservation) {
            // There is a reservation available that is either from the user OR is expired/released

            if (rvObj.isExpired) {
              // (re) claim expired task
              const result = await this.$blockchain.claimExpiredTask(rvObj.reservation.id, rvObj.reservation.account_id)
              this.$store.dispatch('transaction/addTransaction', result)
              rvObj = await this.findReservation(rvObj, batch)
            } else if (rvObj.isReleased) {
              // (re) claim released task
              const result = await this.$blockchain.reclaimTask(rvObj.reservation.id)
              this.$store.dispatch('transaction/addTransaction', result)
              rvObj = await this.findReservation(rvObj, batch)
            } else {
              // user has a reservation
              const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(batch.campaign_id, batch.id, rvObj.reservation.leaf_hash, batch.tasks)
              this.$router.push('/campaigns/' + batch.campaign_id + '/' + batch.batch_id + '/' + taskIndex + '?submissionId=' + rvObj.reservation.id)
              foundReservation = true
              break
            }
          } else {
            // User doesn't have reservation yet, so let's make one!
            rvObj = await this.createNewReservation(batch, submissions, rvObj)
          }
          // redirect to reservation
          if (rvObj.reservation) {
            foundReservation = true
            const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(batch.campaign_id, batch.id, rvObj.reservation.leaf_hash, batch.tasks)
            this.$router.push('/campaigns/' + batch.campaign_id + '/' + batch.batch_id + '/' + taskIndex + '?submissionId=' + rvObj.reservation.id)
            break
          }
          // no reservation yet? if there are more batches with tasks available it'll try this again
        }
        this.loading = false
        if (!foundReservation) {
          this.$router.push('/campaigns/' + this.campaignId)
          throw new Error('No available tasks anymore in campaign')
        }
      } catch (e) {
        this.loading = false
        this.$blockchain.handleError(e)
        this.$router.push('/campaigns/' + this.campaignId)
      }
    },
    async createNewReservation (batch, submissions, rvObj) {
      let taskIndex

      // First go through the submissions and get all the indexes of the tasks that are done
      const indexes = []
      const userIndexes = []
      const treeLeaves = await this.$blockchain.getTreeLeaves(batch.campaign_id, batch.id, batch.tasks)
      for await (const sub of submissions) {
        const index = await this.$blockchain.getTaskIndexFromLeaf(batch.campaign_id, batch.id, sub.leaf_hash, batch.tasks, treeLeaves)
        indexes.push(index)
        if (sub.account_id === this.$auth.user.vAccountRows[0].id) {
          userIndexes.push(index)
        }
      }

      if (indexes.length > 0) {
        // create object, which holds the count of the task indexes in the submissions
        const indexesCount = {}
        for (let i = 0; i < batch.num_tasks; i++) {
          indexesCount[i] = 0
        }
        for (const num of indexes) {
          indexesCount[num] = indexesCount[num] ? indexesCount[num] + 1 : 1
        }

        // grab the first available index, that the user hasn't done yet
        const availableIndex = Object.keys(indexesCount).find(key => indexesCount[key] < batch.repetitions && !this.didWorkerDoTask(userIndexes, key))
        taskIndex = availableIndex ? parseInt(availableIndex) : null
        console.log('taskIndex?', taskIndex)
      } else {
        // no submissions yet in batch
        taskIndex = 0
      }

      // if the taskIndex is empty, it means that there are no available tasks anymore
      if (taskIndex !== null) {
        const result = await this.$blockchain.reserveTask(batch.id, taskIndex, batch.campaign_id, batch.tasks)
        this.$store.dispatch('transaction/addTransaction', result)
        // get reservations and see if this user has a reservation
        return await this.findReservation(rvObj, batch)
      } else {
        return { reservation: null, isReleased: false, isExpired: false }
      }
    },
    didWorkerDoTask (userIndexes, key) {
      const item = userIndexes.find(i => parseInt(i) === parseInt(key))
      return item !== null && item !== undefined
    },
    pickReservationForUser (reservations) {
      let reservation = null
      let isExpired = false
      let isReleased = false
      for (const rv of reservations) {
        if ((!rv.data || !rv.data.length)) {
          if (rv.account_id !== null && parseInt(new Date(new Date(rv.submitted_on) + 'UTC').getTime() / 1000) + parseInt(this.$blockchain.sdk.force.config.releaseTaskDelaySec.toFixed(0)) < this.now) {
            reservation = rv
            isExpired = true
          } else if (rv.account_id === null) {
            reservation = rv
            isReleased = true
            break
          } else if (rv.account_id === this.$auth.user.vAccountRows[0].id) {
            reservation = rv
            isExpired = false
            isReleased = false
            break
          }
        }
      }
      return { reservation, isReleased, isExpired }
    },
    async findReservation (rvObj, batch) {
      return await retry(async () => {
        await this.getSubmissions()
        const rvs = await this.submissions(batch.batch_id)
        const reservations = []
        for (const r of Object.values(rvs)) {
          if (!r.data || !r.data.length) {
            reservations.push(r)
          }
        }
        rvObj = await this.pickReservationForUser(reservations)
        if (!rvObj.reservation || rvObj.isReleased || rvObj.isExpired) {
          throw new Error('Reservation not found')
        } else {
          return rvObj
        }
      }, {
        retries: 5,
        onRetry: (error, number) => {
          console.log('attempt', number, error)
        }
      })
    }
  }
}
</script>
