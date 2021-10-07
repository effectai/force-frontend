<template>
  <span>
    <div v-if="loading" class="loader-wrapper is-active">
      <div class="loader is-loading" />
      <br>Making reservation...
    </div>
  </span>
</template>

<script>
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
      this.loading = true
      const result = await this.$blockchain.reserveTask(this.batch.id, this.batch.campaign_id, this.batch.tasks_done, this.batch.tasks)
      console.log('transaction', result)
      // todo: go to submissions page
    }
  }
}
</script>
