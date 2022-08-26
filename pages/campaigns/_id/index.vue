<template>
  <section class="section is-max-widescreen">
    <!-- Instructions modal -->
    <instructions-modal
      v-if="campaign && campaign.info"
      :show="joinCampaignPopup"
      :inclusive-qualifications="inclusiveQualifications"
      :exclusive-qualifications="exclusiveQualifications"
      :campaign="campaign"
      :info="campaign.info"
      @clicked="campaignModalChange"
    />
    <!-- Batch modal -->
    <batch-modal v-if="campaign && campaignBatches" :show="$auth.user.accountName === campaign.owner[1] && showBatchesPopup && !cancelledBatchesPopup" @cancelled="cancelBatchModal" />
    <div v-if="loadingReservation" class="loader-wrapper is-active">
      <img src="~assets/img/loading.svg">
      <br><span class="loading-text">Making reservation</span>
    </div>
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
          <div v-if="campaign.info">
            <nuxt-link
              v-if="campaign.info && campaign.info.category"
              :to="'/?category=' + campaign.info.category"
              class="tag is-light is-medium mb-5"
              :class="['is-'+campaign.info.category]"
            >
              {{ campaign.info.category }}
            </nuxt-link>
            <span v-else class="tag is-info is-light is-medium">...</span>
          </div>
          <div class="is-flex is-align-items-center mb-4">
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
              <li :class="{'is-active': body === 'instruction'}">
                <a @click.prevent="body = 'instruction'">Instructions</a>
              </li>
              <li :class="{'is-active': body === 'preview'}">
                <a @click.prevent="body = 'preview'">Preview</a>
              </li>
              <li v-if="campaign && campaign.owner[1] === $auth.user.accountName" :class="{'is-active': body === 'description'}">
                <a @click.prevent="body = 'description'">Batches</a>
              </li>
            </ul>
          </div>

          <div v-if="body === 'description'" class="block">
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
                        <p v-if="batch.num_tasks - batch.real_tasks_done === 0" class="has-text-grey is-size-7">
                          {{ batch.real_tasks_done }} Task<span v-if="batch.real_tasks_done > 1">s</span> <small>(<b class="has-text-info">Done</b>)</small>
                        </p>
                        <p v-else-if="batch.status === 'Active' && batch.num_tasks - batch.real_tasks_done > 0" class="has-text-grey is-size-7">
                          Tasks <small>(<b>{{ batch.num_tasks - batch.real_tasks_done }} / {{ batch.num_tasks }}</b> left)</small>
                        </p>
                        <p v-else-if="batch.status === 'Paused'" class="has-text-grey is-size-7">
                          {{ batch.real_tasks_done }} Task <span v-if="batch.real_tasks_done > 1">s</span><small><b>completed</b></small>
                        </p>
                        <progress
                          class="progress is-small mt-2"
                          :class="getProgressBatch(batch)"
                          :value="batch.real_tasks_done"
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
            <p v-if="campaign.info">
              <b>Description</b><br>
              {{ campaign.info.description }}
            </p>
            <p v-else>
              ...
            </p>
            <b v-if="campaign && campaign.info"><br>Instructions</b><br>
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

            <div class="p-5">
              <div class="columns ">
                <div class="column is-half">
                  <div class="block">
                    Reward
                    <br>
                    <b><span>{{ campaign.reward.quantity }}</span></b>
                  </div>
                  <div class="block">
                    Time <strong>/</strong> Task<br>
                    <b>
                      <span v-if="campaign.info && campaign.info.estimated_time">{{ campaign.info.estimated_time }} Seconds</span>
                      <span v-else>...</span>
                    </b>
                  </div>
                </div>

                <div class="column is-half">
                  <div class="block">
                    Tasks
                    <br>
                    <span v-if="activeBatchesByCampaignId(campaign.id) === null" class="loading-text">
                      Loading
                    </span>
                    <span v-else>
                      <b>{{ activeBatchesByCampaignId(campaign.id).reduce(function(a,b){
                        return a + b.num_tasks
                      },0) - activeBatchesByCampaignId(campaign.id).reduce(function(a,b){
                        return a + b.real_tasks_done
                      },0) }}/{{ activeBatchesByCampaignId(campaign.id).reduce(function(a,b){
                        return a + b.num_tasks
                      },0) }} left</b>
                    </span>
                  </div>
                  <div class="block">
                    EFX <strong>/</strong> Hour
                    <br>
                    <div v-if="campaign.info && campaign.info.estimated_time">
                      <b>
                        <span>{{ estimatedEarnings.efxPerHour }} EFX</span>
                        <span>(${{ parseFloat(estimatedEarnings.dollarPerHour).toFixed(2) }})</span>
                      </b>
                    </div>
                    <div v-else>
                      <b>
                        <span>...</span>
                      </b>
                    </div>
                  </div>
                </div>
              </div>

              <div class="block is-vcentered">
                <div class="is-size-4 has-text-centered">
                  Qualifications
                </div>
                <div v-if="allQualificationsLoaded">
                  <div>Required <i>(Having these qualifications is required)</i></div>
                  <div v-if="inclusiveQualifications.length > 0" class="tags">
                    <span
                      v-for="quali in inclusiveQualifications"
                      :key="quali.id"
                      class="tag"
                      :class="quali.userHasQuali ? 'is-light is-success' : 'is-danger is-light'"
                      :data-tooltip="quali.userHasQuali ? 'Found: Ok' : 'Not Found: Required'"
                    >
                      <span v-if="quali.userHasQuali">✅</span>
                      <span v-else>❌</span>
                      &nbsp;
                      <nuxt-link :to="`/qualifications/${quali.id}`">{{ quali.info.name }}</nuxt-link>
                    </span>
                  </div>
                  <div v-else>
                    None
                  </div>
                  <br>
                  <div>Exclude <i>(Having these qualifications will exclude you from this task)</i></div>
                  <div v-if="exclQualis.length > 0" class="tags">
                    <span
                      v-for="quali in exclQualis"
                      :key="quali.id"
                      class="tag"
                      :class="quali.userHasQuali ? 'is-light is-danger' : 'is-success is-light'"
                      :data-tooltip="quali.userHasQuali ? 'Found: Excluded' : 'Not found: Ok'"
                    >
                      <span v-if="quali.userHasQuali">❌</span>
                      <span v-else>✅</span>
                      &nbsp;
                      <nuxt-link :to="`/qualifications/${quali.id}`">{{ quali.info.name }}</nuxt-link>
                    </span>
                  </div>
                  <div v-else>
                    None
                  </div>
                </div>
                <div v-else class="loading-text has-text-centered">
                  Loading
                </div>
                <br>
              </div>

              <div class="block is-vcentered ">
                <div v-if="$auth.user.accountName === campaign.owner[1]">
                  <nuxt-link :to="`/campaigns/${id}/edit`" class="button is-fullwidth is-primary is-light has-margin-bottom-mobile">
                    Edit Task
                  </nuxt-link>
                  <br>
                </div>
                <button v-if="loading || campaignBatches === null || !allQualificationsLoaded" class="button is-fullwidth is-primary is-loading">
                  Loading
                </button>
                <button
                  v-else-if="userJoined === false"
                  class="button is-fullwidth is-primary"
                  :disabled="!canUserQualify"
                  @click.prevent="joinCampaignPopup = true"
                >
                  Qualify
                </button>
                <button
                  v-else-if="activeCampaignBatches.reduce((a,b) => a + b.num_tasks, 0) - activeCampaignBatches.reduce((a,b) => a + b.real_tasks_done, 0) > 0 && !userReservation"
                  class="button is-fullwidth is-primary"
                  :disabled="!canUserQualify"
                  @click.prevent="reserveTask"
                >
                  Start Task
                </button>
                <button v-else-if="userReservation" class="button is-fullwidth is-accent has-text-weight-semibold" @click.prevent="reserveTask">
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
                <p v-if="!canUserQualify" class="mt-1 is-size-7 has-text-centered">
                  You are not qualified to participate in this task
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SuccessModal -->
    <success-modal v-if="completed && successMessage" :message="successMessage" :title="successTitle" />
  </section>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'
import SuccessModal from '@/components/SuccessModal'
import InstructionsModal from '@/components/InstructionsModal'
import BatchModal from '@/components/BatchModal'

export default {
  components: {
    TemplateMedia,
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
      body: 'instruction',
      userJoined: false,
      loading: false,
      joinCampaignPopup: false,
      userReservation: null,
      cancelledBatchesPopup: false,
      loadingReservation: false,
      showBatchesPopup: false,
      waitingOnTransaction: false,
      categories: ['translate', 'captions', 'socials', 'dao'],
      successMessage: null,
      campaignQualis: []
    }
  },
  computed: {
    ...mapGetters({
      batchesByCampaignId: 'campaign/batchesByCampaignId',
      activeBatchesByCampaignId: 'campaign/activeBatchesByCampaignId',
      qualificationById: 'qualification/qualificationById'
    }),
    exclQualis () {
      return this.exclusiveQualifications.filter(q => !q.ishidden)
    },
    ...mapState({
      joinedCampaigns: state => state.campaign.joinedCampaigns,
      campaigns: state => state.campaign.campaigns,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded,
      batchesLoading: state => state.campaign.loadingBatch && !state.campaign.allBatchesLoaded,
      allQualificationsLoaded: state => state.qualification.allQualificationsLoaded,
      assignedQualifications: state => state.qualification.assignedQualifications,
      allAssignedQualificationsLoaded: state => state.qualification.allAssignedQualificationsLoaded
    }),
    campaignBatches () {
      return this.batchesByCampaignId(this.id)
    },
    activeCampaignBatches () {
      return this.activeBatchesByCampaignId(this.id)
    },
    campaign () {
      if (this.campaigns) {
        return this.campaigns.find(c => c.id === this.id)
      }
      return undefined
    },
    estimatedEarnings () {
      const hourInSec = 3600
      if (this.campaign && this.campaign.info.estimated_time && this.campaign.info.reward) {
        const efxPerHour = hourInSec / this.campaign.info.estimated_time * this.campaign.info.reward
        const dollarPerHour = efxPerHour * this.$blockchain.efxPrice
        return { efxPerHour, dollarPerHour }
      } else {
        return { efxPerHour: 0, dollarPerHour: 0 }
      }
    },
    inclusiveQualifications () {
      if (this.allAssignedQualificationsLoaded && this.campaign) {
        if (this.campaign.qualis) {
          return this.campaign.qualis
            .filter(q => q.value === 0) // only inclusive qualifications
            .map((q) => {
              const quali = this.qualificationById(q.key)
              quali.userHasQuali = this.assignedQualifications.some(aq => aq.id === quali.id)
              return quali
            })
        } else {
          return []
        }
      } else {
        return []
      }
    },
    exclusiveQualifications () {
      if (this.allAssignedQualificationsLoaded && this.campaign) {
        if (this.campaign.qualis) {
          return this.campaign.qualis
            .filter(q => q.value === 1) // only exclusive qualifications
            .map((q) => {
              const quali = this.qualificationById(q.key)
              quali.userHasQuali = this.assignedQualifications.some(aq => aq.id === quali.id)
              return quali
            })
        } else {
          return []
        }
      } else {
        return []
      }
    },
    canUserQualify () {
      if (this.campaign?.qualis && this.campaign.qualis.length > 0) {
        for (const quali of this.campaign.qualis) {
          if (!this.assignedQualifications || (quali.value === 0 && !this.assignedQualifications.find(uq => uq.id === quali.key)) || (quali.value === 1 && this.assignedQualifications.find(uq => uq.id === quali.key))) {
            // user doesnt have qualification that is required or user has qualification that is not allowed
            return false
          }
        }
      }
      return true
    }
  },

  watch: {
    '$route.query.completed' (completed) {
      this.completed = parseInt(completed)
      this.showCompletedPopup()
    }
  },
  mounted () { // Used to load data before template render
    this.showCompletedPopup()
    this.bootup()
  },
  created () { // Used after template has been rendered
  },
  methods: {
    ...mapActions({
      getAssignedQualifications: 'qualification/getAssignedQualifications'
    }),
    async bootup () {
      await this.getAssignedQualifications()
      await this.checkUserCampaign()
      await this.getCampaign()
      await this.getBatches()
    },
    showCompletedPopup () {
      if (this.completed) {
        this.successTitle = 'No more tasks available for you in this campaign'
        this.successMessage = 'This could either mean that all the available tasks are already reserved, or you already completed the still available tasks.'
      }
    },
    async reserveTask () {
      this.$store.commit('view/ADD_JOINED_CAMPAIGN', this.campaign.id)
      this.loadingReservation = true
      const availableBatches = []
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
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    campaignModalChange (val) {
      this.joinCampaignPopup = val
    },
    cancelBatchModal () {
      this.cancelledBatchesPopup = true
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
        this.userJoined = this.$store.state.view.joinedCampaigns.includes(this.id)
      } catch (e) {
        await this.$blockchain.handleError(e)
      }
      this.loading = false
    },
    submitTask (values) {
      console.log('Task submitted!', values)
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.id)
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
</style>
