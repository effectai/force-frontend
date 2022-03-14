<template>
  <span>
    <div v-if="loading" class="loader-wrapper is-active">
      <div class="loader is-loading" />
      <br>Making reservation...
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
      error: null
    }
  },
  mounted () {
    this.makeReservation()
  },
  methods: {
    async makeReservation () {
      try {
        this.loading = true
        let reservations = await this.$blockchain.getReservations()
        let rvObj = await this.getReservationForUser(reservations)
        if (rvObj.reservation === null && rvObj.isReleased === false) {
          const result = await this.$blockchain.reserveTask(this.batch.id, this.batch.campaign_id, this.batch.tasks_done, this.batch.tasks)
          this.$store.dispatch('transaction/addTransaction', result)

          // get reservations and see if this user has a reservation
          await retry(async () => {
            reservations = await this.$blockchain.getReservations()
            rvObj = await this.getReservationForUser(reservations)

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

        if (rvObj.reservation && rvObj.isReleased === true) {
          const result = await this.$blockchain.reclaimTask(rvObj.reservation.id)
          this.$store.dispatch('transaction/addTransaction', result)

          // get reservations and see if this user has a reservation
          await retry(async () => {
            reservations = await this.$blockchain.getReservations()
            rvObj = await this.getReservationForUser(reservations)

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
        if (rvObj.reservation && rvObj.isReleased === false) {
          const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(this.batch.campaign_id, this.batch.id, rvObj.reservation.leaf_hash, this.batch.tasks)
          // TODO: temp for demo, pass reservation/reservation.id in a different way
          this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id + '/' + taskIndex + '?submissionId=' + rvObj.reservation.id)
        } else {
          this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id)
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$blockchain.handleError(e)
      }
    },
    getReservationForUser (reservations) {
      let reservation, isReleased
      for (const rv of reservations.rows) {
        if (rv.account_id === this.$auth.user.vAccountRows[0].id && parseInt(this.batch.batch_id) === parseInt(rv.batch_id) && (!rv.data || !rv.data.length)) {
          reservation = rv
          isReleased = false
          break
        } else if (rv.account_id === null && parseInt(this.batch.batch_id) === parseInt(rv.batch_id) && (!rv.data || !rv.data.length)) {
          reservation = rv
          isReleased = true

          break
        } else {
          reservation = null
          isReleased = false
        }
      }
      return { reservation, isReleased }
    }
  }
}
</script>
