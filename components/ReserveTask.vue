<template>
  <span>
    <div v-if="loading" class="loader-wrapper is-active">
      <img src="~assets/img/loading.svg">
      <br><span class="loading-text">Making reservation</span>
    </div>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
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
      reserveInBatch: null
    }
  },
  computed: {
    ...mapGetters({
      batchesByCampaignId: 'campaign/batchesByCampaignId'
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
    updateNow () {
      this.now = parseInt((Date.now() / 1000).toFixed(0))
    },
    async makeReservation () {
      try {
        // if there's no batch specified, check in all the batches if there's still available tasks
        if (!this.batch) {
          for (const batch of this.campaignBatches) {
            if (batch.num_tasks * batch.repetitions > batch.tasks_done) {
              this.reserveInBatch = batch
              break
            }
          }
        }

        if (this.reserveInBatch || this.batch) {
          const batch = this.batch ? this.batch : this.reserveInBatch
          await this.$store.dispatch('campaign/getBatchTasks', batch)
          this.loading = true
          const rs = await this.$blockchain.getSubmissionsAndReservationsForBatch(batch.batch_id)
          const reservations = rs.filter((r) => {
            return !r.data || !r.data.length
          })
          const submissions = rs.filter((s) => {
            return s.data || s.data.length
          })

          // get a reservation for the user
          // could be an active reservation of the user, or an expired/released reservation in the batch
          let rvObj = await this.getReservationForUser(reservations)
          if (rvObj.reservation) {
            // There is a reservation available that is either from the user OR is expired/released

            if (rvObj.isExpired) {
              // (re) claim expired task
              const result = await this.$blockchain.claimExpiredTask(rvObj.reservation.id)
              console.log('resuklt', result)
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
            }
          } else {
            // User doesn't have reservation yet, so let's make one!
            let taskIndex

            // First go through the submissions and get all the indexes of the tasks that are done
            const indexes = []
            const userIndexes = []

            const treeLeaves = await this.$blockchain.getTreeLeaves(batch.campaign_id, batch.id, batch.tasks)
            for (const sub of submissions) {
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
              console.log('Found an available task index: ', taskIndex)
            } else {
              // no submissions yet in batch
              taskIndex = 0
            }

            // if the taskIndex is empty, it means that there are no available tasks anymore
            if (taskIndex !== null) {
              const result = await this.$blockchain.reserveTask(batch.id, taskIndex, batch.campaign_id, batch.tasks)
              this.$store.dispatch('transaction/addTransaction', result)
              // get reservations and see if this user has a reservation
              rvObj = await this.findReservation(rvObj, batch)
            } else {
              this.$router.push('/campaigns/' + batch.campaign_id + '/' + batch.batch_id + '?batchCompleted=1')
            }
          }

          // redirect to reservation
          if (rvObj.reservation) {
            console.log('batch', batch)
            const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(batch.campaign_id, batch.id, rvObj.reservation.leaf_hash, batch.tasks)
            this.$router.push('/campaigns/' + batch.campaign_id + '/' + batch.batch_id + '/' + taskIndex + '?submissionId=' + rvObj.reservation.id)
          } else {
            this.$router.push('/campaigns/' + batch.campaign_id)
          }
          this.loading = false
        } else {
          this.loading = false
          throw new Error('No available tasks an anymore in campaign')
        }
      } catch (e) {
        this.loading = false
        this.$blockchain.handleError(e)
        this.$router.push('/campaigns/' + this.campaignId)
      }
    },
    didWorkerDoTask (userIndexes, key) {
      const item = userIndexes.find(i => parseInt(i) === parseInt(key))
      return item !== null && item !== undefined
    },
    getReservationForUser (reservations) {
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
            break
          }
        }
      }
      return { reservation, isReleased, isExpired }
    },
    async findReservation (rvObj, batch) {
      return await retry(async () => {
        const rvs = await this.$blockchain.getTaskReservationsForBatch(batch.batch_id)
        rvObj = await this.getReservationForUser(rvs)
        console.log('deze gevonden', rvObj)
        if (!rvObj.reservation || rvObj.isReleased) {
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
