<template>
  <section class="section is-max-widescreen">
    <div class="container">
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
import TemplateMedia from '@/components/Template'
import ReserveTask from '@/components/ReserveTask'
import { Template } from '@/../effect-js'

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
      reserveNextTask: false
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
      await this.$store.dispatch('campaign/getBatch', { id: this.batchId, campaignId: this.campaignId })
      this.batch = this.batches.find(b => b.id === this.batchId && b.campaign_id === this.campaignId)
      this.task = this.batch.tasks[this.taskIndex]
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.campaignId)
      this.campaign = this.campaigns.find(c => c.id === this.campaignId)
    },
    async submitTask (values) {
      await this.$blockchain.submitTask(this.$blockchain.sdk.force.getCompositeKey(this.batchId, this.campaignId), this.campaignId, this.submissionId, JSON.stringify(values))
      await this.getBatch()
      if (this.batch.tasks_done === this.batch.num_tasks) {
        this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.id)
      } else {
        this.reserveNextTask = true
      }
    }
  }
}
</script>
