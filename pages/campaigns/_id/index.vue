<template>
  <section class="section is-max-widescreen">
    <!-- Instructions modal -->
    <instructions-modal v-if="campaign && campaign.info" :show="joinCampaignPopup" :campaign="campaign" :info="campaign.info" @clicked="campaignModalChange" />
    <!-- Reserve task -->
    <reserve-task v-if="showReserveTask" :campaign-id="campaign.id" />
    <!-- Batch modal -->
    <batch-modal v-if="campaign && campaignBatches" :show="$auth.user.accountName === campaign.owner[1] && showBatchesPopup && !cancelledBatchesPopup" @cancelled="cancelBatchModal" />

    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              Tasks
            </nuxt-link>
          </li>
          <li class="is-active">
            <nuxt-link :to="'/campaigns/' + id" aria-current="page">
              Task {{ id }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div v-if="loading" class="loader-wrapper is-active">
        <img src="~assets/img/loading.svg">
        <br>
        <span v-if="waitingOnTransaction" class="loading-text subtitle">Waiting for the transaction to complete</span>
        <span v-else class="loading-text subtitle">Please sign the transaction</span>
      </div>
      <div v-if="!campaign" class="loading-text">
        Task loading
      </div>
      <div v-else class="columns">
        <div class="column is-three-fifths">
          <div class="is-flex is-align-items-center mb-6">
            <p v-if="campaign" class="image has-radius mr-4" style="width: 52px; height: 52px">
              <img v-if="campaign.info && campaign.info.image" :src="campaign.info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaign.info.image.Hash : campaign.info.image">
              <img v-else-if="campaign.info && campaign.info.category && categories.includes(campaign.info.category)" :src="require(`~/assets/img/dapps/effect-${campaign.info.category}-icon.png`)">
              <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)" alt="campaign title">
            </p>
            <div class="title has-text-weight-bold">
              <span>#{{ id }} </span>
              <span v-if="campaign.info">{{ campaign.info.title }}</span>
              <span v-else-if="campaign.info !== null" class="loading-text">Loading</span>
              <span v-else class="has-text-danger-dark">Could not load campaign info</span>
            </div>
          </div>
          <div class="tabs campaign-tabs">
            <ul>
              <li :class="{'is-active': body === 'description'}">
                <a @click.prevent="body = 'description'">Tasks</a>
              </li>
              <li :class="{'is-active': body === 'instruction'}">
                <a @click.prevent="body = 'instruction'">Instructions</a>
              </li>
              <li :class="{'is-active': body === 'preview'}">
                <a @click.prevent="body = 'preview'">Preview</a>
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
            <div class="mt-5">
              <div class="is-flex is-justify-content-space-between is-align-items-center">
                <h4 class="is-size-6 mb-0 has-text-weight-bold">
                  Tasks
                </h4>
                <nuxt-link v-if="$auth.user.accountName === campaign.owner[1]" class="button is-primary is-pulled-right no-float-mobile has-margin-bottom-mobile" :to="`/campaigns/${id}/new`">
                  <span class="icon">
                    +
                  </span>
                  <span>Add Tasks</span>
                </nuxt-link>
              </div>
              <hr class="mt-2 mb-5">
              <div class="block mt-5">
                <div v-if="campaignBatches">
                  <nuxt-link
                    v-for="batch in campaignBatches.slice().reverse()"
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
                          {{ batch.tasks_done }} Task<span v-if="batch.tasks_done > 1">s</span> <small>(<b class="has-text-info">Done</b>)</small>
                        </p>
                        <p v-else-if="batch.status === 'Active' && batch.num_tasks - batch.tasks_done > 0" class="has-text-grey is-size-7">
                          Tasks <small>(<b>{{ batch.num_tasks - batch.tasks_done }} / {{ batch.num_tasks }}</b> left)</small>
                        </p>
                        <p v-else-if="batch.status === 'Paused'" class="has-text-grey is-size-7">
                          {{ batch.tasks_done }} Task <span v-if="batch.tasks_done > 1">s</span><small><b>completed</b></small>
                        </p>
                        <progress
                          class="progress is-small mt-2"
                          :class="getProgressBatch(batch)"
                          :value="batch.tasks_done"
                          :max="batch.num_tasks"
                        />
                      </div>
                    </div>
                  </nuxt-link>
                </div>
                <div v-if="batchesLoading" class="loading-text">
                  Tasks loading
                </div>
                <div v-else-if="campaignBatches && !campaignBatches.length">
                  No tasks
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
          <div v-if="body === 'preview'" class="block">
            <template-media
              v-if="campaign && campaign.info"
              :html="renderTemplate(
                campaign.info.template || 'No template found..',
                campaign.info.example_task || {})"
              @submit="submitTask"
            />
          </div>
        </div>
        <div class="column is-two-fifths">
          <div class="information-block">
            <div class="information-header has-text-centered">
              <h4 class="p-5 is-size-4">
                <b>Information</b>
              </h4>
            </div>
            <div class="columns p-5">
              <div class="column is-half">
                <div v-if="campaign.info" class="block">
                  <nuxt-link
                    v-if="campaign.info && campaign.info.category"
                    :to="'/?category=' + campaign.info.category"
                    class="tag is-light is-medium mb-5"
                    :class="{'is-dao': campaign.info.category === 'dao', 'is-dao': campaign.info.category === 'dao', 'is-socials': campaign.info.category === 'socials', 'is-translate': campaign.info.category === 'translate', 'is-captions': campaign.info.category === 'captions'}"
                  >
                    {{ campaign.info.category }}
                  </nuxt-link>
                  <span v-else class="tag is-info is-light is-medium">...</span>
                </div>
                <div class="block mb-6">
                  Reward
                  <br>
                  <b><span>{{ campaign.reward.quantity }}</span></b>
                </div>
                <div class="block">
                  <div v-if="$auth.user.accountName === campaign.owner[1]">
                    <nuxt-link :to="`/campaigns/${id}/edit`" class="button is-fullwidth is-primary is-light has-margin-bottom-mobile">
                      Edit Task
                    </nuxt-link>
                    <br>
                  </div>
                  <button v-if="loading || campaignBatches === null" class="button is-fullwidth is-primary is-loading">
                    Loading
                  </button>
                  <button v-else-if="userJoined === false" class="button is-fullwidth is-primary" @click.prevent="joinCampaignPopup = true">
                    Qualify
                  </button>
                  <button
                    v-else-if="campaignBatches.reduce((a,b) => a + b.num_tasks, 0) - campaignBatches.reduce((a,b) => a + b.tasks_done, 0) > 0 && !userReservation"
                    class="button is-fullwidth is-primary"
                    @click.prevent="reserveTask"
                  >
                    Make Task Reservation
                  </button>
                  <button v-else-if="userReservation" class="button is-fullwidth is-accent has-text-weight-semibold" @click.prevent="goToTask">
                    Go To Task
                  </button>
                  <template v-else>
                    <button v-if="userJoined" class="button is-fullwidth is-primary" :disabled="true">
                      Qualified for Task
                    </button>
                    <div class="has-text-centered">
                      <i>No active tasks currently</i>
                    </div>
                  </template>
                </div>
              </div>
              <div class="column is-half">
                <div class="block">
                  Requester
                  <br>
                  <div class="blockchain-address">
                    <nuxt-link :to="'/profile/' + campaign.owner[1]">
                      {{ campaign.owner[1] }}
                    </nuxt-link>
                  </div>
                </div>
                <div class="block">
                  IPFS
                  <br>
                  <div class="blockchain-address">
                    <a target="_blank" :href="`${ipfsExplorer}/ipfs/${campaign.content.field_1}`">{{ campaign.content.field_1 }}</a>
                  </div>
                </div>
                <div class="block">
                  Blockchain
                  <br>
                  <a target="_blank" :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.forceContract}?loadContract=true&tab=Tables&table=campaign&account=${$blockchain.sdk.force.config.forceContract}&scope=${$blockchain.sdk.force.config.forceContract}&limit=1&lower_bound=${id}&upper_bound=${id}`">View in Explorer</a>
                </div>
                <div class="block">
                  Tasks
                  <br>
                  <span v-if="batchesByCampaignId(campaign.id) === null" class="loading-text">
                    Loading
                  </span>
                  <span v-else>
                    {{ batchesByCampaignId(campaign.id).reduce(function(a,b){
                      return a + b.num_tasks
                    },0) - batchesByCampaignId(campaign.id).reduce(function(a,b){
                      return a + b.tasks_done
                    },0) }}/{{ batchesByCampaignId(campaign.id).reduce(function(a,b){
                      return a + b.num_tasks
                    },0) }} left
                    <br>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SuccessModal -->
    <success-modal v-if="batchCompleted && successMessage" :message="successMessage" :title="successTitle" />
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'
import ReserveTask from '@/components/ReserveTask'
import SuccessModal from '@/components/SuccessModal'
import InstructionsModal from '@/components/InstructionsModal'
import BatchModal from '@/components/BatchModal'

export default {
  components: {
    TemplateMedia,
    ReserveTask,
    InstructionsModal,
    BatchModal,
    SuccessModal
  },
  middleware: ['auth'],
  data () {
    return {
      completed: parseInt(this.$route.query.completed),
      ipfsExplorer: this.$blockchain.sdk.config.ipfsNode,
      id: parseInt(this.$route.params.id),
      accountId: this.$auth.user.vAccountRows[0].id,
      body: 'description',
      userJoined: null,
      loading: false,
      joinCampaignPopup: false,
      showReserveTask: false,
      userReservation: null,
      cancelledBatchesPopup: false,
      showBatchesPopup: false,
      waitingOnTransaction: false,
      categories: ['translate', 'captions', 'socials', 'dao']
    }
  },
  computed: {
    ...mapGetters({
      batchesByCampaignId: 'campaign/batchesByCampaignId'
    }),
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      batchesLoading: state => state.campaign.loadingBatch && !state.campaign.allBatchesLoaded
    }),
    campaignBatches () {
      return this.batchesByCampaignId(this.id)
    },
    campaign () {
      if (this.campaigns) {
        return this.campaigns.find(c => c.id === this.id)
      }
      return undefined
    }
  },
  mounted () {
    if (this.completed) {
      this.successTitle = 'Campaign is completed'
      this.successMessage = 'There are no more available tasks for you in this campaign'
    }
  },
  created () {
    this.checkUserCampaign()
    this.getCampaign()
    this.getBatches()
  },
  methods: {
    reserveTask () {
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
        this.loading = true
        this.joinCampaignPopup = false
        const data = await this.$blockchain.joinCampaign(this.id)
        this.$store.dispatch('transaction/addTransaction', data)
        if (data) {
          this.loading = true
          this.waitingOnTransaction = true
          await this.$blockchain.waitForTransaction(data)
          await this.checkUserCampaign()
          if (this.userJoined) {
            this.reserveTask()
          }
        }
        this.loading = false
        this.waitingOnTransaction = false
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
        const userReservation = reservations.find(r => r.account_id === this.$auth.user.vAccountRows[0].id && parseInt(new Date(new Date(r.submitted_on) + 'UTC').getTime() / 1000) + parseInt(this.$blockchain.sdk.force.config.releaseTaskDelaySec.toFixed(0)) > parseInt((Date.now() / 1000).toFixed(0)))
        if (userReservation) {
          this.userReservation = userReservation
        }
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
    },
    getProgressBatch (batch) {
      switch (batch?.status) {
        case 'Completed':
          return 'is-success'
        case 'Active':
          return 'is-info'
        case 'Paused':
          return 'is-warning'
        default:
          break
      }
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
.tabs {
  li {
    font-weight: 500;
    a {
      padding-left: 35px;
      padding-right: 35px;
    }
    &.is-active {
      a {
        border-bottom-width: 2px;
        border-bottom-color: #1977F3;
        color: #151A1F;
        font-weight: 600;
      }
    }
  }
}
.information-block {
  border: 1px solid #E8EEFF;
  border-radius: 8px;
  .block {
    margin-bottom: 10px
  }

  .information-header {
    background: #F7FBFF;
  }
}
</style>
