<template>
  <div class="wrapper">
    <instructions-modal
      v-if="campaign && campaign.info"
      :readonly="true"
      :campaign="campaign"
      :info="campaign.info"
      :show="showInstructionsModal"
      @clicked="showInstructions"
    />
    <section class="section has-background-secondary py-1 has-text-white">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-narrow is-flex is-align-items-center is-justify-content-space-between">
            <button class="button is-secondary" @click.prevent="showInstructions">
              <span class="icon">
                <img src="~assets/img/icons/instruction-icon.svg">
              </span>
              <span>Instructions</span>
            </button>
            <span class="is-hidden-desktop">
              Reward:
              <b v-if="campaign">{{ campaign.reward.quantity }}</b>
              <b v-else>...... EFX</b>
            </span>
          </div>
          <div class="column has-text-centered">
            <b v-if="campaign && campaign.info">{{ campaign.info.title }}</b>
            <b v-else>......</b>
            <span class="px-2 is-hidden-touch"> | </span>
            <span><span class="is-hidden-touch">Task </span><b>#{{ taskIndex }}</b></span>
          </div>
          <div class="column is-narrow is-hidden-touch">
            Reward:
            <b v-if="campaign">{{ campaign.reward.quantity }}</b>
            <b v-else>...... EFX</b>
          </div>
        </div>
      </div>
    </section>
    <section class="section template-section">
      <div class="container">
        <div v-if="loading" class="loader-wrapper is-active">
          <div class="loader is-loading" />
          <br>Waiting for the transaction to complete...
        </div>
        <div v-if="!campaign || !campaign.info || !task">
          Loading..
        </div>
        <template-media
          v-else
          :html="renderTemplate(
            campaign.info.template || 'No template found..',
            task)"
          @submit="submitTask"
        />

        <!-- SuccessModal -->
        <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
        <!-- Reserve task -->
        <reserve-task v-if="reserveNextTask" :batch="reserveInBatch ? reserveInBatch : batch" />
      </div>
    </section>
    <section class="py-3 has-background-light">
      <div class="container has-text-centered">
        <button class="button is-danger" @click.prevent="releaseTask(submissionId)">
          Stop Task
        </button>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'
import ReserveTask from '@/components/ReserveTask'
import InstructionsModal from '@/components/InstructionsModal'
import SuccessModal from '@/components/SuccessModal'

export default {
  components: {
    TemplateMedia,
    ReserveTask,
    InstructionsModal,
    SuccessModal
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
      loading: false,
      successMessage: null,
      successTitle: null,
      showInstructionsModal: false,
      reserveInBatch: null
    }
  },
  computed: {
    ...mapState({
      batches: state => state.campaign.batches,
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading,
      batchLoading: state => state.campaign.loadingBatch
    }),
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId'
    }),
    campaignBatches () {
      return this.batchByCampaignId(this.campaignId)
    }
  },
  created () {
    this.getBatch()
    this.getCampaign()
  },
  methods: {
    showInstructions (val = true) {
      this.showInstructionsModal = val
    },
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
    async releaseTask (id) {
      const data = await this.$blockchain.releaseTask(id)
      this.$store.dispatch('transaction/addTransaction', data)
      this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id)
    },
    async submitTask (values) {
      try {
        this.loading = true
        this.reserveNextTask = false

        const result = await this.$blockchain.submitTask(this.batch.batch_id, this.submissionId, JSON.stringify(values))
        this.successTitle = 'Task submitted successfully'
        this.successMessage = 'Waiting for transaction to complete before continuing'
        await this.$blockchain.waitForTransaction(result)
        this.$store.dispatch('transaction/addTransaction', result)
        this.loading = false

        await this.getBatch()

        // if there are no more tasks left in this batch, look in other batches
        if (this.batch.tasks_done === this.batch.num_tasks) {
          const batch = this.campaignBatches.find((b) => {
            return b.num_tasks - b.tasks_done > 0
          })

          if (!batch) {
            console.error('Could not find batch with active tasks')
            this.$router.push('/campaigns/' + this.batch.campaign_id)
            return
          }
          await this.$store.dispatch('campaign/getBatchTasks', batch)
          this.reserveInBatch = batch
        }
        this.reserveNextTask = true
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  min-height: calc(100vh - 66px);
  display: flex;
  flex-direction: column;

  section.template-section {
    flex: 1;
  }
}
</style>
