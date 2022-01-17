<template>
  <section class="section is-max-widescreen">
    <!-- Instructions modal -->
    <instructions-modal v-if="campaign && campaign.info" :show="joinCampaignPopup" :campaign="campaign" :info="campaign.info" @clicked="campaignModalChange" />
    <!-- Reserve task -->
    <reserve-task v-if="showReserveTask" :batch="reserveInBatch" />
    <!-- Batch modal -->
    <batch-modal v-if="campaign && campaignBatches" :show="$auth.user.accountName === campaign.owner[1] && showBatchesPopup && !cancelledBatchesPopup" @cancelled="cancelBatchModal" />

    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              Campaigns
            </nuxt-link>
          </li>
          <li class="is-active">
            <nuxt-link :to="'/campaigns/' + id" aria-current="page">
              Campaign {{ id }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div v-if="loading" class="loader-wrapper is-active">
        <div class="loader is-loading" />
        <br>Waiting for the transaction to complete...
      </div>
      <div v-if="!campaign">
        Campaign loading..
      </div>
      <div v-else class="columns">
        <div class="column is-two-thirds">
          <div class="title">
            <span>#{{ id }}: </span>
            <span v-if="campaign.info">{{ campaign.info.title }}</span>
            <span v-else-if="campaign.info !== null">Loading..</span>
            <span v-else class="has-text-danger-dark">Could not load campaign info</span>
          </div>
          <div class="tabs">
            <ul>
              <li :class="{'is-active': body === 'description'}">
                <a @click.prevent="body = 'description'">Batches</a>
              </li>
              <li :class="{'is-active': body === 'instruction'}">
                <a @click.prevent="body = 'instruction'">Instructions</a>
              </li>
            </ul>
          </div>
          <div v-if="body === 'description'" class="block">
            <p v-if="campaign.info">
              {{ campaign.info.description }}
            </p>
            <p v-else>
              ...
            </p>
            <h2 class="subtitle mt-5">
              Task Preview
            </h2>
            <template-media
              v-if="campaign && campaign.info"
              :html="renderTemplate(
                campaign.info.template || 'No template found..',
                campaign.info.example_task || {})"
              @submit="submitTask"
            />
            <div class="mt-5">
              <nuxt-link v-if="$auth.user.accountName === campaign.owner[1]" class="button is-primary is-pulled-right" :to="`/campaigns/${id}/new`">
                <span class="icon">
                  +
                </span>
                <span>Create Batch</span>
              </nuxt-link>
              <h4 class="is-size-4">
                <b>Batches</b>
              </h4>
              <div class="block mt-5">
                <nuxt-link
                  v-for="batch in campaignBatches"
                  :key="batch.id"
                  :to="`/campaigns/${batch.campaign_id}/${batch.batch_id}`"
                  class="box p-4"
                  :class="{'is-disabled': false}"
                >
                  <div class="columns is-vcentered is-multiline is-mobile">
                    <div class="column">
                      <p class="has-text-grey is-size-7">
                        Batch
                      </p>
                      <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                        #<span v-if="campaign">{{ campaign.id }}.</span>{{ batch.id }}
                      </h2>
                    </div>
                    <div class="column">
                      <p class="has-text-grey is-size-7">
                        Status
                      </p>
                      <h2 v-if="batch" class="subtitle is-6 has-text-weight-semibold mb-0">
                        {{ batch.status }}
                      </h2>
                    </div>
                    <div class="column">
                      <p v-if="batch.num_tasks - batch.tasks_done === 0" class="has-text-grey is-size-7">
                        Tasks <small>(<b class="has-text-success">Done</b>)</small>
                      </p>
                      <p v-else-if="batch.status === 'Active' && batch.num_tasks - batch.tasks_done > 0" class="has-text-grey is-size-7">
                        Tasks <small>(<b>{{ batch.num_tasks - batch.tasks_done }} / {{ batch.num_tasks }}</b> left)</small>
                      </p>
                      <p v-else-if="batch.status === 'Paused'" class="has-text-grey is-size-7">
                        {{ batch.tasks_done }} Task <span v-if="batch.tasks_done > 1">s</span><small><b>completed</b></small>
                      </p>
                      <progress class="progress is-small mt-2" :class="{'is-success': batch ? batch.tasks_done === batch.num_tasks: false }" :value="batch.tasks_done" :max="batch.num_tasks" />
                    </div>
                  </div>
                </nuxt-link>
                <div v-if="batchesLoading">
                  Batches loading..
                </div>
                <div v-else-if="campaignBatches && !campaignBatches.length">
                  No batches
                </div>
                <div v-else-if="!campaignBatches">
                  Could not retrieve batches
                </div>
              </div>
            </div>
          </div>
          <div v-if="body === 'instruction'" class="block">
            <div v-if="campaign && campaign.info" class="content" v-html="$md.render(campaign.info.instructions)" />
            <p v-else>
              ...
            </p>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box">
            <h4 class="box-title is-size-4">
              <b>Information</b>
            </h4>

            <div class="block">
              <b>Requester</b>
              <br>
              <div class="blockchain-address">
                <nuxt-link :to="'/profile/' + campaign.owner[1]">
                  {{ campaign.owner[1] }}
                </nuxt-link>
              </div>
            </div>
            <div class="block">
              <b>Reward</b>
              <br>
              <span>{{ campaign.reward.quantity }}</span>
            </div>
            <div class="block">
              <b>Batches</b>
              <br>
              <span v-if="campaignBatches === null">Loading..</span>
              <span v-else>{{ campaignBatches.length }}</span>
            </div>
            <div v-if="campaign.info" class="block">
              <b>Category</b>
              <br>
              <span
                v-if="campaign.info && campaign.info.category"
                class="tag is-light is-medium"
                :class="{'is-secondary': campaign.info.category === 'translation', 'is-info': campaign.info.category === 'image_classification', 'is-warning': campaign.info.category === 'text_classification', 'is-danger': campaign.info.category === 'video_classification'}"
              >{{ campaign.info.category }}</span>
              <span v-else class="tag is-info is-light is-medium">...</span>
            </div>
            <div class="block">
              <b>IPFS</b>
              <br>
              <div class="blockchain-address">
                <a target="_blank" :href="`${ipfsExplorer}/ipfs/${campaign.content.field_1}`">{{ campaign.content.field_1 }}</a>
              </div>
            </div>
            <div class="block">
              <b>Blockchain</b>
              <br>
              <a target="_blank" :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.force_contract}?loadContract=true&tab=Tables&table=campaign&account=${$blockchain.sdk.force.config.force_contract}&scope=${$blockchain.sdk.force.config.force_contract}&limit=1&lower_bound=${id}&upper_bound=${id}`">View Campaign on Explorer</a>
            </div>
            <div class="block">
              <nuxt-link v-if="$auth.user.accountName === campaign.owner[1]" :to="`/campaigns/${id}/edit`" class="button is-primary is-light">
                Edit Campaign
              </nuxt-link>
              <button v-if="loading || userReservation === null || campaignBatches === null" class="button is-primary is-loading">
                Loading
              </button>
              <button v-else-if="userJoined === false" class="button is-primary" @click.prevent="joinCampaignPopup = true">
                Join Campaign
              </button>
              <button
                v-else-if="campaignBatches.reduce(function(a,b){
                  return a + b.num_tasks
                },0) - campaignBatches.reduce(function(a,b){
                  return a + b.tasks_done
                },0) > 0 && !userReservation"
                class="button is-primary"
                @click.prevent="reserveTask"
              >
                Make Task Reservation
              </button>
              <button
                v-else-if="userReservation"
                class="button is-accent has-text-weight-semibold"
                @click.prevent="goToTask"
              >
                Go To Task
              </button>
              <template v-else>
                <button v-if="userJoined" class="button is-primary" :disabled="true">
                  Joined Campaign
                </button>
                <p>No active tasks currently</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'
import ReserveTask from '@/components/ReserveTask'
import InstructionsModal from '@/components/InstructionsModal'
import BatchModal from '@/components/BatchModal'

export default {
  components: {
    TemplateMedia,
    ReserveTask,
    InstructionsModal,
    BatchModal
  },
  middleware: ['auth'],
  data () {
    return {
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      id: parseInt(this.$route.params.id),
      accountId: this.$auth.user.vAccountRows[0].id,
      body: 'description',
      userJoined: null,
      loading: false,
      joinCampaignPopup: false,
      showReserveTask: false,
      reserveInBatch: null,
      userReservation: null,
      cancelledBatchesPopup: false,
      showBatchesPopup: false
    }
  },
  computed: {
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId'
    }),
    ...mapState({
      batches: state => state.campaign.batches,
      campaigns: state => state.campaign.campaigns,
      batchesLoading: state => state.campaign.loadingBatch && !state.campaign.allBatchesLoaded
    }),
    campaignBatches () {
      return this.batchByCampaignId(this.id)
    },
    campaign () {
      if (this.campaigns) {
        return this.campaigns.find(c => c.id === this.id)
      }
      return undefined
    }
  },
  mounted () {
  },
  created () {
    this.checkUserCampaign()
    this.getCampaign()
    this.getBatches()
  },
  methods: {
    async reserveTask () {
      const batch = this.campaignBatches.find((b) => {
        return b.num_tasks - b.tasks_done > 0
      })

      if (!batch) {
        console.error('Could not find batch with active tasks')
        return
      }
      await this.$store.dispatch('campaign/getBatchTasks', batch)
      this.reserveInBatch = batch
      this.showReserveTask = true
    },
    async goToTask () {
      const batch = this.campaignBatches.find((b) => {
        return parseInt(b.batch_id) === parseInt(this.userReservation.batch_id)
      })
      await this.$store.dispatch('campaign/getBatchTasks', batch)

      this.reserveInBatch = batch
      this.showReserveTask = true
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    campaignModalChange (val) {
      this.joinCampaignPopup = val
    },
    cancelBatchModal () {
      this.cancelledBatchesPopup = true
    },
    async joinCampaign () {
      try {
        // function that makes the user join this campaign.
        const data = await this.$blockchain.joinCampaign(this.id)
        this.$store.dispatch('transaction/addTransaction', data)
        if (data) {
          this.loading = true
          this.joinCampaignPopup = false
          await this.$blockchain.waitForTransaction(data)
          await this.checkUserCampaign()
          if (this.userJoined) {
            this.reserveTask()
          }
        }
        this.joinCampaignPopup = false
      } catch (e) {
        this.$blockchain.handleError(e)
      }
    },
    async getBatches () {
      await this.$store.dispatch('campaign/getBatches')

      if (!this.campaignBatches.length) {
        this.userReservation = false
      }

      // check if user has reservation for a batch in this campaign
      for (const batch of this.campaignBatches) {
        const reservations = await this.$blockchain.getTaskReservationsForBatch(batch.batch_id)
        this.userReservation = reservations.find(r => r.account_id === this.$auth.user.vAccountRows[0].id)
      }
      if (this.campaignBatches.length === 0) {
        this.showBatchesPopup = true
      }
    },
    async checkUserCampaign () {
      this.loading = true
      try {
        // checks if the user joined this campaign.
        const data = await this.$blockchain.getCampaignJoins(this.id)
        this.userJoined = (data.rows.length > 0)
      } catch (e) {
        this.$blockchain.handleError(e)
      }
      this.loading = false
    },
    submitTask (values) {
      console.log('Task submitted!', values)
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.id)
      // this.campaign = this.campaigns.find(c => c.id === this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.box-title {
  text-align: center;
  border-bottom: 2px solid #cdd4e6;
  padding-bottom: 31px;
  margin: 10px 0 15px 0;
}
.progress::-webkit-progress-value {
  transition: width 0.5s ease;
}
</style>
