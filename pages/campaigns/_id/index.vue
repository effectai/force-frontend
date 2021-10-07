<template>
  <section class="section is-max-widescreen">
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
                <a @click.prevent="body = 'description'">Description</a>
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
            <template-media
              v-if="campaign.info"
              :html="renderTemplate(
                campaign.info.template || 'No template found..',
                {name: 'World'})"
              @submit="submitTask"
            />
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
            <div class="columns">
              <div class="column">
                <div class="block">
                  <b>Requester</b>
                  <br>
                  <nuxt-link :to="'/profile/' + campaign.owner[1]">
                    {{ campaign.owner[1] }}
                  </nuxt-link>
                </div>
              </div>
              <div v-if="$auth.user.blockchain === 'eos'" class="column is-flex is-justify-content-flex-end">
                <button v-if="!userJoined" class="button is-primary" :class="{'is-loading': loading === true}" @click.prevent="joinCampaign()">
                  Join Campaign
                </button>
                <button v-else class="button is-primary is-light" disabled>
                  Joined campaign
                </button>
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
              <span v-if="batchByCampaignId(id) === null">No badges.</span>
              <span v-else>{{ batchByCampaignId(id).length }}</span>
            </div>
            <div v-if="campaign.info" class="block">
              <b>Category</b>
              <br>
              <span v-if="campaign.info.category" class="tag is-info is-light is-medium">{{ campaign.info.category }}</span>
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
          </div>
          <div class="box">
            <h4 class="box-title is-size-4">
              <b>Batches</b>
            </h4>
            <div>
              <nuxt-link
                v-for="batch in batches"
                :key="batch.id"
                :to="`/campaigns/${batch.campaign_id}/${batch.id}`"
                class="box p-4"
                :class="{'is-disabled': false}"
              >
                <div class="columns is-vcentered is-multiline is-mobile">
                  <div class="column">
                    <p class="has-text-grey is-size-7">
                      Batch
                    </p>
                    <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                      #<template v-if="campaign">{{ campaign.id }}.</template>{{ batch.id }}
                    </h2>
                  </div>
                  <div class="column">
                    <p class="has-text-grey is-size-7">
                      Tasks
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
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import TemplateMedia from '@/components/Template'
import { Template } from '@/../effect-js'

export default {
  components: {
    'template-media': TemplateMedia
  },
  middleware: ['auth'],
  data () {
    return {
      id: parseInt(this.$route.params.id),
      campaign: undefined,
      randomNumber: undefined,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      accountId: this.$auth.user.blockchain === 'eos' ? this.$auth.user.vAccountRows[0].id : null,
      body: 'description',
      userJoined: false,
      loading: false
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
    })
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
    async joinCampaign () {
      // function that makes the user join this campaign.
      if (this.$auth.user.blockchain === 'eos') {
        this.loading = true
        const data = await this.$blockchain.joinCampaign(this.accountId, this.id)
        if (data) {
          this.loading = false
          this.checkUserCampaign()
        }
      }
    },
    async getBatches () {
      await this.$store.dispatch('campaign/getBatches')
    },
    async checkUserCampaign () {
      // checks if the user joined this campaign.
      const data = await this.$blockchain.campaignJoin(this.accountId, this.id)
      this.userJoined = (data.rows.length > 0)
    },
    submitTask (values) {
      console.log('Task submitted!', values)
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
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
