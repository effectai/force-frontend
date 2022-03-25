<template>
  <span>
    <div v-if="loading" class="loader-wrapper is-active">
      <img src="~assets/img/loading.svg">
      <br><span class="loading-text">Making reservation</span>
    </div>
  </span>
</template>

<script>
const retry = require('async-retry')
export default {
  props: {
    batch: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      error: null,
      now: 0
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
        this.loading = true
        const rs = await this.$blockchain.getSubmissionsAndReservationsForBatch(this.batch.batch_id)
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
            this.$store.dispatch('transaction/addTransaction', result)

            // TODO: reuse this retry statement, its now three times the same code in this function
            await retry(async () => {
              const rvs = await this.$blockchain.getTaskReservationsForBatch(this.batch.batch_id)
              rvObj = await this.getReservationForUser(rvs)
              if (!rvObj.reservation || rvObj.isReleased || rvObj.isExpired) {
                throw new Error('Reservation not found')
              }
            }, {
              retries: 5,
              onRetry: (error, number) => {
                console.log('attempt', number, error)
              }
            })
          } else if (rvObj.isReleased) {
            // (re) claim released task
            const result = await this.$blockchain.reclaimTask(rvObj.reservation.id)
            this.$store.dispatch('transaction/addTransaction', result)

            await retry(async () => {
              const rvs = await this.$blockchain.getTaskReservationsForBatch(this.batch.batch_id)
              rvObj = await this.getReservationForUser(rvs)
              if (!rvObj.reservation || rvObj.isReleased || rvObj.isExpired) {
                throw new Error('Reservation not found')
              }
            }, {
              retries: 5,
              onRetry: (error, number) => {
                console.log('attempt', number, error)
              }
            })
          } else {
            // user has no reservation
            const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(this.batch.campaign_id, this.batch.id, rvObj.reservation.leaf_hash, this.batch.tasks)
            this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id + '/' + taskIndex + '?submissionId=' + rvObj.reservation.id)
          }
        } else {
          // User doesn't have reservation yet, so let's make one!
          let taskIndex

          // First go through the submissions and get all the indexes of the tasks that are done
          const indexes = []
          const userIndexes = []

          const treeLeaves = await this.$blockchain.getTreeLeaves(this.batch.campaign_id, this.batch.id, this.batch.tasks)
          for (const sub of submissions) {
            const index = await this.$blockchain.getTaskIndexFromLeaf(this.batch.campaign_id, this.batch.id, sub.leaf_hash, this.batch.tasks, treeLeaves)
            indexes.push(index)
            if (sub.account_id === this.$auth.user.vAccountRows[0].id) {
              userIndexes.push(index)
            }
          }

          if (indexes.length > 0) {
            // create object, which holds the count of the task indexes in the submissions
            const indexesCount = {}
            for (let i = 0; i < this.batch.num_tasks; i++) {
              indexesCount[i] = 0
            }
            for (const num of indexes) {
              indexesCount[num] = indexesCount[num] ? indexesCount[num] + 1 : 1
            }

            // grab the first available index, that the user hasn't done yet
            const availableIndex = Object.keys(indexesCount).find(key => indexesCount[key] < this.batch.repetitions && !this.didWorkerDoTask(userIndexes, key))
            taskIndex = availableIndex ? parseInt(availableIndex) : null
            console.log('Found an available task index: ', taskIndex)
          } else {
            // no submissions yet in batch
            taskIndex = 0
          }

          // if the taskIndex is empty, it means that there are no available tasks anymore
          if (taskIndex !== null) {
            const result = await this.$blockchain.reserveTask(this.batch.id, taskIndex, this.batch.campaign_id, this.batch.tasks)
            this.$store.dispatch('transaction/addTransaction', result)
            // get reservations and see if this user has a reservation
            await retry(async () => {
              const rvs = await this.$blockchain.getTaskReservationsForBatch(this.batch.batch_id)
              rvObj = await this.getReservationForUser(rvs)
              if (!rvObj.reservation || rvObj.isReleased || rvObj.isExpired) {
                throw new Error('Reservation not found')
              }
            }, {
              retries: 5,
              onRetry: (error, number) => {
                console.log('attempt', number, error)
              }
            })
          } else {
            this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id + '?batchCompleted=1')
          }
        }

        // redirect to reservation
        if (rvObj.reservation) {
          const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(this.batch.campaign_id, this.batch.id, rvObj.reservation.leaf_hash, this.batch.tasks)
          this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id + '/' + taskIndex + '?submissionId=' + rvObj.reservation.id)
        } else {
          this.$router.push('/campaigns/' + this.batch.campaign_id)
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$blockchain.handleError(e)
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
          if (rv.account_id !== null && parseInt(new Date(new Date(rv.submitted_on) + 'UTC').getTime() / 1000) + parseInt(this.$blockchain.sdk.force.config.release_task_delay_sec.toFixed(0)) < this.now) {
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
    }
  }
}
</script>
