<template>
  <section class="section is-max-widescreen">
    <!-- Instructions modal -->
    <instructions-modal v-if="campaign && campaign.info" :show="joinCampaignPopup" :campaign="campaign" :info="campaign.info" @clicked="campaignModalChange" />
    <!-- Reserve task -->
    <reserve-task v-if="showReserveTask" :batch="batch" />

    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/campaigns">
              All Campaigns
            </nuxt-link>
          </li>
          <li class="is-active">
            <nuxt-link :to="'/campaigns/' + id" aria-current="page">
              Campaign {{ id }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div v-if="campaignLoading">
        Campaign loading..
      </div>
      <div v-else-if="!campaign">
        Could not retrieve campaign
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
              <nuxt-link class="button is-primary is-pulled-right" :to="`/campaigns/${id}/new`">
                <span class="icon">
                  +
                </span>
                <span>Create Batch</span>
              </nuxt-link>
              <h4 class="is-size-4">
                <b>Batches</b>
              </h4>
              <div class="block mt-5">
                <div v-if="campaignBatches === null">
                  Loading..
                </div>
                <div v-else-if="!campaignBatches.length">
                  No Batches
                </div>
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
                      <p v-if="batch.num_tasks - batch.tasks_done === 0" class="has-text-grey is-size-7">
                        Tasks <small>(<b class="has-text-success">Done</b>)</small>
                      </p>
                      <p v-else class="has-text-grey is-size-7">
                        Tasks <small>(<b>{{ batch.num_tasks - batch.tasks_done }} / {{ batch.num_tasks }}</b> left)</small>
                      </p>
                      <progress class="progress is-small mt-2" :class="{'is-success': batch ? batch.tasks_done === batch.num_tasks: false }" :value="batch.tasks_done" :max="batch.num_tasks" />
                    </div>
                  </div>
                </nuxt-link>
                <div v-if="batchesLoading">
                  Batches loading..
                </div>
                <div v-else-if="batches && !batches.length">
                  No batches
                </div>
                <div v-else-if="!batches">
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
              <button v-if="!userJoined" class="button is-primary" :class="{'is-loading': loading === true}" :disabled="userJoined" @click.prevent="joinCampaignPopup = true">
                Join Campaign
              </button>
              <button
                v-else-if="campaignBatches && campaignBatches.reduce(function(a,b){
                  return a + b.num_tasks
                },0) - campaignBatches.reduce(function(a,b){
                  return a + b.tasks_done
                },0) > 0"
                class="button is-primary"
                @click.prevent="reserveTask"
              >
                Make Task Reservation
              </button>
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

export default {
  components: {
    TemplateMedia,
    ReserveTask,
    InstructionsModal
  },
  middleware: ['auth'],
  data () {
    return {
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      id: parseInt(this.$route.params.id),
      campaign: undefined,
      accountId: this.$auth.user.vAccountRows[0].id,
      body: 'description',
      userJoined: null,
      loading: false,
      joinCampaignPopup: false,
      showReserveTask: false,
      batch: null
    }
  },
  computed: {
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId'
    }),
    ...mapState({
      batches: state => state.campaign.batches,
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading,
      batchesLoading: state => !state.campaign.batches || state.campaign.batches.loading
    }),
    campaignBatches () {
      return this.batchByCampaignId(this.id)
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
      await this.$store.dispatch('campaign/getBatchTasks', batch)

      if (!batch) {
        alert('Could not find batch with active tasks')
        return
      }
      this.batch = this.campaignBatches.find((b) => {
        return b.batch_id === batch.batch_id
      })
      console.log(this.batch)
      this.showReserveTask = true
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    campaignModalChange (val) {
      this.joinCampaignPopup = val
    },
    async joinCampaign () {
      try {
      // function that makes the user join this campaign.
        const data = await this.$blockchain.joinCampaign(this.id)
        this.$store.dispatch('transaction/addTransaction', data)
        if (data) {
          this.loading = true
          setTimeout(async () => {
            await this.checkUserCampaign
            if (this.userJoined) {
              this.reserveTask()
            }
          }, 1500)
        }
        this.joinCampaignPopup = false
      } catch (e) {
        this.$blockchain.handleError(e)
      }
    },
    async getBatches () {
      await this.$store.dispatch('campaign/getBatches')
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
      this.campaign = this.campaigns.find(c => c.id === this.id)
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
