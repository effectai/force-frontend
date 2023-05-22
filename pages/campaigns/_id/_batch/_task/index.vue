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
    <submitted-task-modal
      v-if="campaign && campaign.reward"
      :campaign="campaign"
      :show="showSubmittedTaskModal"
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
          <img src="~assets/img/loading.svg">
          <br><span class="loading-text">Waiting for the transaction to complete</span>
        </div>
        <div v-if="!campaign || !campaign.info || !task" class="loading-text">
          Loading
        </div>
        <template-media
          v-else
          :html="renderTemplate(
            campaign.info.template || 'No template found..',
            task)"
          :is-live-task="false"
          @submit="submitTask"
        />

        <!-- Reserve task -->
        <div v-if="loadingReservation" class="loader-wrapper is-active">
          <img src="~assets/img/loading.svg">
          <br><span class="loading-text">Making reservation</span>
        </div>
      </div>
    </section>
    <section class="py-3 has-background-light">
      <div class="container has-text-centered">
        <button class="button is-danger is-small" @click.prevent="releaseTask(submissionId)">
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
import InstructionsModal from '@/components/InstructionsModal'
import SubmittedTaskModal from '@/components/SubmittedTaskModal'

export default {
  components: {
    TemplateMedia,
    InstructionsModal,
    SubmittedTaskModal
  },
  middleware: ['auth'],
  data () {
    return {
      campaignId: parseInt(this.$route.params.id),
      batchId: parseInt(this.$route.params.batch),
      submissionId: parseInt(this.$route.params.task),
      campaign: undefined,
      batch: undefined,
      task: undefined,
      loading: false,
      loadingReservation: false,
      showInstructionsModal: false,
      showSubmittedTaskModal: false,
      reserveInBatch: null,
      reservation: null,
      taskIndex: null
    }
  },
  computed: {
    ...mapGetters({
      submissionById: 'campaign/submissionById',
      batchesByCampaignId: 'campaign/batchesByCampaignId'
    }),
    ...mapState({
      batches: state => state.campaign.batches,
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading,
      batchLoading: state => state.campaign.loadingBatch
    }),
    campaignBatches () {
      return this.batchesByCampaignId(this.campaignId)
    }
  },
  created () {
    this.getBatch()
    this.getCampaign()
  },
  methods: {
    async reserveNextTask () {
      this.loadingReservation = true
      const availableBatches = []
      await this.$store.dispatch('campaign/getBatches')
      for (const batch of this.campaignBatches) {
        if (batch.num_tasks * batch.repetitions > batch.tasks_done) {
          availableBatches.push(batch)
        }
      }
      try {
        await this.$blockchain.makeReservation(availableBatches)
      } catch (error) {
        this.$blockchain.handleError(error)
      }
      this.loadingReservation = false
    },
    showInstructions (val = true) {
      this.showInstructionsModal = val
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options,
        { accountId: this.$auth.user.vAccountRows[0].id, campaignId: this.campaignId, batchId: this.batchId, submissionId: this.submissionId }).render()
    },
    async getBatch () {
      await this.$store.dispatch('campaign/getBatch', { batchId: this.batchId })
      this.batch = this.batches.find(b => b.batch_id === this.batchId)
      await this.getTask()
    },
    async getTask () {
      await this.$store.dispatch('campaign/getSubmission', this.submissionId)
      this.reservation = this.submissionById(this.submissionId)

      // if the submission can't be found, or is not from the current user, throw error and redirect
      if (!this.reservation || this.reservation.account_id !== this.$auth.user.vAccountRows[0].id) {
        // this.$blockchain.handleError('Reservation not found')
        console.error('Reservation not found ⚠⚠⚠')
        this.$router.push('/campaigns/' + this.campaignId)
      } else if (this.reservation.data) {
        this.$blockchain.handleError('Task already submitted by you')
        this.showSubmittedTaskModal = true
        return
      }
      this.taskIndex = await this.$blockchain.getTaskIndexFromLeaf(this.batch.campaign_id, this.batch.id, this.reservation.leaf_hash, this.batch.tasks)
      this.task = this.batch.tasks[this.taskIndex]
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.campaignId)
      this.campaign = this.campaigns.find(c => c.id === this.campaignId)
    },
    async releaseTask (id) {
      try {
        const data = await this.$blockchain.releaseTask(id)
        this.$store.dispatch('transaction/addTransaction', data)
        this.$router.push('/campaigns/' + this.batch.campaign_id + '/' + this.batch.batch_id)
      } catch (e) {
        console.error(e)
      }
    },
    reserveTask () {
      try {
        this.showSubmittedTaskModal = false
        this.reserveNextTask()
      } catch (e) {
        this.loading = false
        throw new Error(e)
      }
    },
    async submitTask (values) {
      try {
        this.loading = true

        const result = await this.$blockchain.submitTask(this.batch.batch_id, this.submissionId, JSON.stringify(values))
        await this.$blockchain.waitForTransaction(result)
        try {
          if (this.campaign && this.campaign.info && this.campaign.info.webhook && this.campaign.info.webhook.length > 0) {
            fetch(this.campaign.info.webhook, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                campaignId: this.campaign.id,
                batchId: this.batch.batch_id,
                batchNumber: this.batch.id,
                submissionId: this.submissionId,
                userId: this.$auth.user.vAccountRows[0].id,
                submission: values
              })
            })
              .then(response => response.json())
              .then((data) => {
                console.log('webhook success:', data)
              })
              .catch((e) => {
                console.error('webhook fail', e)
              })
          }
        } catch (e) {
          console.error('webhook fail', e)
        }
        this.$store.dispatch('transaction/addTransaction', result)
        this.loading = false
        this.showSubmittedTaskModal = true
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;

  section.template-section {
    flex: 1;
  }
}
</style>
