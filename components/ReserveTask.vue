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

        // get the user reservation + the status of the reservation
        let rvObj = await this.getReservationForUser(reservations)

        if (rvObj.reservation === null && rvObj.isReleased === false) {
          let taskIndex = this.batch.tasks_done

          // Check here in submissions if user already did the task of this.batch.tasks_done
          for (const sub of submissions) {
            const indexes = []
            if (sub.account_id === this.$auth.user.vAccountRows[0].id) {
              const index = await this.$blockchain.getTaskIndexFromLeaf(this.batch.campaign_id, this.batch.id, sub.leaf_hash, this.batch.tasks)
              indexes.push(index)
            }

            // check highest taskindex user has done, and up it
            if (indexes.length > 0 && Math.max(indexes) >= this.batch.tasks_done) {
              taskIndex = Math.max(indexes) + 1
            }
          }

          if (taskIndex > this.batch.num_tasks) {
            this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id + '?batchCompleted=1')
          }
          const result = await this.$blockchain.reserveTask(this.batch.id, taskIndex, this.batch.campaign_id, this.batch.tasks)
          this.$store.dispatch('transaction/addTransaction', result)
          // get reservations and see if this user has a reservation
          await retry(async () => {
            const rvs = await this.$blockchain.getTaskReservationsForBatch(this.batch.batch_id)
            rvObj = await this.getReservationForUser(rvs)
            if (!rvObj.reservation) {
              throw new Error('Reservation not found')
            }
          }, {
            retries: 5,
            onRetry: (error, number) => {
              console.log('attempt', number, error)
            }
          })
        }

        // Reclaim expired task
        if (rvObj.reservation && rvObj.isReleased === false && rvObj.isExpired === true) {
          const result = await this.$blockchain.claimExpiredTask(rvObj.reservation.id)
          this.$store.dispatch('transaction/addTransaction', result)
          // get reservations and see if this user has a reservation
          await retry(async () => {
            const rvs = await this.$blockchain.getTaskReservationsForBatch(this.batch.batch_id)
            rvObj = await this.getReservationForUser(rvs)
            if (!rvObj.reservation) {
              throw new Error('Reservation not found')
            }
          }, {
            retries: 5,
            onRetry: (error, number) => {
              console.log('attempt', number, error)
            }
          })
        }

        // Reclaim released task
        if (rvObj.reservation && rvObj.isReleased === true && rvObj.isExpired === false) {
          const result = await this.$blockchain.reclaimTask(rvObj.reservation.id)
          this.$store.dispatch('transaction/addTransaction', result)
          // get reservations and see if this user has a reservation
          await retry(async () => {
            const rvs = await this.$blockchain.getTaskReservationsForBatch(this.batch.batch_id)
            rvObj = await this.getReservationForUser(rvs)
            if (!rvObj.reservation) {
              throw new Error('Reservation not found')
            }
          }, {
            retries: 5,
            onRetry: (error, number) => {
              console.log('attempt', number, error)
            }
          })
        }

        // get task form reservation and go to task page
        if (rvObj.reservation && rvObj.isExpired === false && rvObj.isReleased === false) {
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
    getReservationForUser (reservations) {
      let reservation, isReleased, isExpired
      for (const rv of reservations) {
        // TODO: check if this logic is correct
        if (rv.account_id === this.$auth.user.vAccountRows[0].id && parseInt(this.batch.batch_id) === parseInt(rv.batch_id) && (!rv.data || !rv.data.length)) {
          reservation = rv
          isReleased = false
          isExpired = false
          break
        } else if (rv.account_id === null && parseInt(this.batch.batch_id) === parseInt(rv.batch_id) && (!rv.data || !rv.data.length)) {
          reservation = rv
          isReleased = true
          isExpired = false
          break
        } else if (rv.account_id !== null && parseInt(new Date(new Date(rv.submitted_on) + 'UTC').getTime() / 1000) + parseInt(this.$blockchain.sdk.force.config.release_task_delay_sec.toFixed(0)) < this.now && parseInt(this.batch.batch_id) === parseInt(rv.batch_id) && (!rv.data || !rv.data.length)) {
          reservation = rv
          isReleased = false
          isExpired = true
        } else {
          reservation = null
          isReleased = false
          isExpired = false
        }
      }

      if (reservations.length === 0) {
        reservation = null
        isReleased = false
        isExpired = false
      }
      return { reservation, isReleased, isExpired }
    }
  }
}
</script>
