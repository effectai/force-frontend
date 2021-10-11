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
  created () {
    this.makeReservation()
  },
  methods: {
    async makeReservation () {
      try {
        this.loading = true
        let reservations = await this.$blockchain.getReservations()
        let reservation = this.getReservationForUser(reservations)
        if (!reservation) {
          await this.$blockchain.reserveTask(this.batch.id, this.batch.campaign_id, this.batch.tasks_done, this.batch.tasks)

          // get reservations and see if this user has a reservation
          await retry(async () => {
            reservations = await this.$blockchain.getReservations()
            reservation = this.getReservationForUser(reservations)

            if (!reservation) {
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
        if (reservation) {
          const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(reservation.leaf_hash, this.batch.tasks)
          // TODO: temp for demo, pass reservation/reservation.id in a different way
          this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.id + '/' + taskIndex + '?submissionId=' + reservation.id)
        } else {
          this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.id)
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$blockchain.handleError(e)
      }
    },
    getReservationForUser (reservations) {
      let reservation
      for (const rv of reservations.rows) {
        if (rv.account_id === this.$auth.user.vAccountRows[0].id && parseInt(this.$blockchain.sdk.force.getCompositeKey(this.batch.id, this.batch.campaign_id)) === parseInt(rv.batch_id) && (!rv.data || !rv.data.length) && 0 > 1) {
          reservation = rv
          break
        }
      }
      return reservation
    }
  }
}
</script>
