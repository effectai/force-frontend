<template>
  <section class="section is-max-widescreen">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              All Campaigns
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/campaigns/${campaignId}`">
              Campaign {{ campaignId }}
            </nuxt-link>
          </li>
          <li class="is-active">
            <nuxt-link v-if="batch" :to="`/campaigns/${campaignId}/${batchId}`" aria-current="page">
              Batch {{ batch.id }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div v-if="campaignLoading || batchLoading">
        Campaign loading..
      </div>
      <div v-else-if="!campaign || !batch">
        Could not retrieve campaign
      </div>
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="title">
            <span v-if="batch">#{{ campaignId }}.{{ batch.id }}: </span>
            <span v-if="campaign && campaign.info">{{ campaign.info.title }}</span>
            <span v-else-if="!campaign || campaign.info !== null">Loading..</span>
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
            <p v-if="campaign && campaign.info">
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
              <nuxt-link v-if="campaign" :to="'/profile/' + campaign.owner[1]">
                {{ campaign.owner[1] }}
              </nuxt-link>
              <span v-else>.....</span>
            </div>
            <div class="block">
              <b>Reward</b>
              <br>
              <span v-if="campaign">{{ campaign.reward.quantity }}</span>
              <span v-else>.....</span>
            </div>
            <div class="block">
              <b>Tasks</b>
              <br>
              <template v-if="batch">
                <span>{{ batch.num_tasks - batch.tasks_done }}</span>
                <span>/ {{ batch.num_tasks }} left</span>
              </template>
              <span v-else>...</span>
              <progress class="progress is-secondary" :value="batch ? batch.tasks_done : undefined" :max="batch ? batch.num_tasks : undefined">
                Left
              </progress>
            </div>
            <div class="block">
              <b>Category</b>
              <br>
              <span v-if="campaign && campaign.info" class="tag is-info is-light is-medium">{{ campaign.info.category }}</span>
              <span v-else class="tag is-info is-light is-medium">...</span>
            </div>
            <div class="block">
              <b>IPFS</b>
              <br>
              <div v-if="batch" class="blockchain-address">
                <a target="_blank" :href="`${ipfsExplorer}/ipfs/${batch.content.field_1}`">{{ batch.content.field_1 }}</a>
              </div>
              <span v-else>.....</span>
            </div>

            <div class="block">
              <b>Blockchain</b>
              <br>
              <a target="_blank" :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.FORCE_CONTRACT}?loadContract=true&tab=Tables&table=batch&account=${$blockchain.sdk.force.config.FORCE_CONTRACT}&scope=${$blockchain.sdk.force.config.FORCE_CONTRACT}&limit=1&lower_bound=${batchId}&upper_bound=${batchId}`">View Batch on Explorer</a>
            </div>
            <div class="block">
              <button v-if="!userJoined" class="button is-primary" :class="{'is-loading': loading === true}" @click.prevent="joinCampaignPopup = true">
                Join Campaign
              </button>
              <button v-else-if="batch" class="button is-primary" @click.prevent="reserveTask = true">
                Make Task Reservation
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Reserve task -->
      <reserve-task v-if="reserveTask" :batch="batch" />

      <!-- Instructions modal -->
      <instructions-modal v-if="campaign && campaign.info" :campaign="campaign" :info="campaign.info" :show="joinCampaignPopup" @clicked="campaignModalChange" />
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import TemplateMedia from '@/components/Template'
import ReserveTask from '@/components/ReserveTask'
import InstructionsModal from '@/components/InstructionsModal'
import { Template } from '@/../effect-js'

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
      campaignId: parseInt(this.$route.params.id),
      batchId: parseInt(this.$route.params.batch),
      campaign: undefined,
      batch: undefined,
      randomNumber: undefined,
      body: 'description',
      accountId: this.$auth.user.blockchain === 'eos' ? this.$auth.user.vAccountRows[0].id : null,
      userJoined: null,
      loading: false,
      joinCampaignPopup: false,
      reserveTask: false
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
  mounted () {
    setTimeout(() => {
      this.randomNumber = this.generateRandomNumber(300)
    }, 3000)
  },
  created () {
    this.checkUserCampaign()
    this.getBatch()
    this.getCampaign()
  },
  methods: {
    campaignModalChange (val) {
      this.joinCampaignPopup = val
    },
    async joinCampaign () {
      try {
        // function that makes the user join this campaign.
        if (this.$auth.user.blockchain === 'eos') {
          const data = await this.$blockchain.joinCampaign(this.accountId, this.campaignId)
          if (data) {
            this.loading = true
            setTimeout(this.checkUserCampaign, 1500)
          }
        }
        this.joinCampaignPopup = false
      } catch (e) {
        this.$blockchain.handleError(e)
      }
    },
    async checkUserCampaign () {
      this.loading = true
      try {
        // checks if the user joined this campaign.
        const data = await this.$blockchain.campaignJoin(this.accountId, this.campaignId)
        this.userJoined = (data.rows.length > 0)
      } catch (e) {
        this.$blockchain.handleError(e)
      }
      this.loading = false
    },
    submitTask (values) {
      console.log('Task submitted!', values)
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    async getBatch () {
      await this.$store.dispatch('campaign/getBatch', { batchId: this.batchId })
      this.batch = this.batches.find(b => b.batch_id === this.batchId)
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.campaignId)
      this.campaign = this.campaigns.find(c => c.id === this.campaignId)
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
