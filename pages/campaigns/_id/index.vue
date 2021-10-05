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
            <p v-if="campaign.info">
              {{ campaign.info.instructions }}
            </p>
            <p v-else>
              ...
            </p>
          </div>
        </div>
        <div class="column is-one-thirds">
          <div class="box">
            <h4 class="box-title is-size-4">
              <b>Information</b>
            </h4>
            <div class="block">
              <b>Requester</b>
              <br>
              <nuxt-link :to="'/profile/0'">
                {{ campaign.owner[1] }}
              </nuxt-link>
            </div>
            <div class="block">
              <b>Reward</b>
              <br>
              <span>{{ campaign.reward.quantity }}</span>
            </div>
            <div class="block">
              <b>Tasks</b>
              <br>
              <span v-if="randomNumber !== undefined">{{ randomNumber }}</span>
              <span v-else>...</span>
              <span>/ 300 left</span>
              <progress class="progress is-secondary" :value="300 - randomNumber" max="300">
                Left
              </progress>
            </div>
            <div class="block">
              <b>Category</b>
              <br>
              <span v-if="campaign.info" class="tag is-info is-light is-medium">{{ campaign.info.category }}</span>
              <span v-else class="tag is-info is-light is-medium">...</span>
            </div>
            <div class="block">
              <b>Blockchain</b>
              <br>
              <a target="_blank" :href="`https://kylin.bloks.io/account/propsonkylin?loadContract=true&tab=Tables&table=proposal&account=propsonkylin&scope=propsonkylin&limit=1&lower_bound=${id}&upper_bound=${id}`">View on Explorer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import TemplateMedia from '@/components/Template'
import { Template } from '../../../../effect-js'

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
      body: 'description'
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading
    })
  },
  mounted () {
    setTimeout(() => {
      this.randomNumber = this.generateRandomNumber(300)
    }, 3000)
  },
  created () {
    this.getCampaign()
  },
  methods: {
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
