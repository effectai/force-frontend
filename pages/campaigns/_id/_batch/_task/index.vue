<template>
  <section class="section is-max-widescreen">
    <div class="container">
      <div v-if="loading" class="loader-wrapper is-active">
        <div class="loader is-loading" />
        <br>Waiting for the transaction to complete...
      </div>
      <h2 class="subtitle mt-5">
        Task
      </h2>
      <template-media
        v-if="campaign && campaign.info"
        :html="renderTemplate(
          campaign.info.template || 'No template found..',
          task)"
        @submit="submitTask"
      />

      <!-- Reserve task -->
      <reserve-task v-if="reserveNextTask" :batch="batch" />
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'
import ReserveTask from '@/components/ReserveTask'

export default {
  components: {
    'template-media': TemplateMedia,
    'reserve-task': ReserveTask
  },
  middleware: ['auth'],
  data () {
    return {
      campaignId: parseInt(this.$route.params.id),
      batchId: parseInt(this.$route.params.batch),
      taskIndex: parseInt(this.$route.params.task),
      // TODO: pass reservation/reservation.id in a different way
      submissionId: parseInt(this.$route.query.submissionId),
      campaign: undefined,
      batch: undefined,
      task: undefined,
      reserveNextTask: false,
      loading: false
    }
  },
  computed: {
    ...mapState({
      batches: state => state.campaign.batches,
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading,
      batchLoading: state => state.campaign.loadingBatch
    })
  },
  created () {
    this.getBatch()
    this.getCampaign()
  },
  methods: {
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    async getBatch () {
      await this.$store.dispatch('campaign/getBatch', { batchId: this.batchId })
      this.batch = this.batches.find(b => b.batch_id === this.batchId)
      this.task = this.batch.tasks[this.taskIndex]
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.campaignId)
      this.campaign = this.campaigns.find(c => c.id === this.campaignId)
    },
    async submitTask (values) {
      this.loading = true
      this.reserveNextTask = false
      const result = await this.$blockchain.submitTask(this.batch.batch_id, this.submissionId, JSON.stringify(values))
      await this.$blockchain.waitForTransaction(result.transaction_id)
      this.$store.dispatch('transaction/addTransaction', result)
      this.loading = false
      await this.getBatch()
      if (this.batch.tasks_done === this.batch.num_tasks) {
        this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id)
      } else {
        this.reserveNextTask = true
      }
    }
  }
}
</script>
