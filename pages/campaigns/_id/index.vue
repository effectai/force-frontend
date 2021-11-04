<template>
  <section class="section is-max-widescreen">
    <!-- Instructions modal -->
    <instructions-modal v-if="campaign && campaign.info" :show="joinCampaignPopup" :campaign="campaign" :info="campaign.info" @clicked="campaignModalChange" />
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
                      <progress class="progress is-small mt-2" :value="batch.tasks_done" :max="batch.num_tasks" />
                    </div>
                    <div class="column has-text-right is-12-mobile">
                      <button class="button is-wide is-secondary has-text-weight-semibold is-fullwidth-mobile" :class="{'is-loading': !campaign || typeof campaign.info === 'undefined', 'is-accent': campaign && campaign.info === null, 'is-outlined': campaign && campaign.info === null}">
                        <span class="">{{ campaign && campaign.info === null ? 'Qualify' : 'View' }}</span>
                      </button>
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
              <nuxt-link :to="'/profile/' + campaign.owner[1]">
                {{ campaign.owner[1] }}
              </nuxt-link>
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
              <a target="_blank" :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.FORCE_CONTRACT}?loadContract=true&tab=Tables&table=campaign&account=${$blockchain.sdk.force.config.FORCE_CONTRACT}&scope=${$blockchain.sdk.force.config.FORCE_CONTRACT}&limit=1&lower_bound=${id}&upper_bound=${id}`">View Campaign on Explorer</a>
            </div>
            <div class="block">
              <button class="button is-primary" :class="{'is-loading': loading === true}" :disabled="userJoined" @click.prevent="joinCampaignPopup = true">
                Join<span v-if="userJoined">ed</span>&nbsp;Campaign
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
import InstructionsModal from '@/components/InstructionsModal'

export default {
  components: {
    InstructionsModal
  },
  middleware: ['auth'],
  data () {
    return {
      id: parseInt(this.$route.params.id),
      campaign: undefined,
      randomNumber: undefined,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      accountId: this.$auth.user.vAccountRows[0].id,
      body: 'description',
      userJoined: null,
      loading: false,
      joinCampaignPopup: false
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
      batchesLoading: state => state.campaign.batches.loading
    }),
    campaignBatches () {
      return this.batchByCampaignId(this.id)
    }
  },
  mounted () {
    setTimeout(() => {
      this.randomNumber = this.generateRandomNumber(300)
    }, 3000)
  },
  created () {
    this.checkUserCampaign()
    this.getCampaign()
    this.getBatches()
  },
  methods: {
    campaignModalChange (val) {
      this.joinCampaignPopup = val
    },
    async joinCampaign () {
      try {
      // function that makes the user join this campaign.
        const data = await this.$blockchain.joinCampaign(this.accountId, this.id)
        console.log('DATA', data)
        this.$store.dispatch('transaction/addTransaction', data)
        if (data) {
          this.loading = true
          setTimeout(this.checkUserCampaign, 1500)
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
        const data = await this.$blockchain.getCampaignJoins(this.accountId, this.id)
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
    },
    generateRandomNumber (maxNum) {
      return Math.ceil(Math.random() * maxNum)
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
