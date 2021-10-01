<template>
  <section class="section">
    <div class="container">
      <h4 class="box-title subtitle">New Campaign</h4>
      <form @submit.prevent="createCampaign">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="campaignIpfs.title" required class="input" type="text" placeholder="My Campaign Title">
          </div>
        </div>
        <div class="field is-grouped is-grouped-right mt-4">
          <div class="control">
            <nuxt-link class="button is-light" to="/">Cancel</nuxt-link>
          </div>
          <div class="control">
            <button type="submit" class="button is-primary is-wide" :class="{'is-loading': loading}">Save Campaign</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },
  beforeRouteLeave (to, from, next) {
    if (this.checkClose()) {
      next()
    }
  },
  middleware: ['auth'],
  data () {
    let campaign = window.localStorage.getItem('cached_campaign')
    let campaignIpfs = window.localStorage.getItem('cached_campaignIpfs')
    if (campaign) {
      campaign = JSON.parse(campaign)
    } else {
      campaign = {
        content_hash: null
      }
    }
    if (campaignIpfs) {
      campaignIpfs = JSON.parse(campaignIpfs)
    } else {
      campaignIpfs = {
        title: ''
      }
    }
    return {
      advanced: false,
      success: false,
      ipfsExplorer: process.env.ipfsExplorer,
      loading: false,
      preview: false,
      campaignIpfs,
      campaign,
      cachedFormData: null
    }
  },

  computed: {
    // Compares cached user data to live data
    hasChanged () {
      return this.cachedFormData !== this.formDataForComparison()
    }
  },

  watch: {
    campaign: {
      deep: true,
      handler (campaign) {
        console.log('caching campaign..')
        window.localStorage.setItem('cached_campaign', JSON.stringify(campaign))
      }
    },
    campaignIpfs: {
      deep: true,
      handler (campaignIpfs) {
        console.log('caching campaignIpfs..')
        window.localStorage.setItem('cached_campaignIpfs', JSON.stringify(campaignIpfs))
      }
    }
  },

  created () {
    // eslint-disable-next-line
    window.addEventListener('beforeunload', this.checkClose)
    this.cachedFormData = this.formDataForComparison()
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.checkClose)
  },

  methods: {
    async createCampaign () {
      this.loading = true
      const hash = await this.$blockchain.uploadCampaign(this.campaignIpfs)
      if (hash) {
        this.$blockchain.createCampaign()
      }
      this.loading = false
    },
    // Helper method that generates JSON for string comparison
    formDataForComparison () {
      return JSON.stringify({ campaign: this.campaign, campaignIpfs: this.campaignIpfs })
    },
    checkClose (event) {
      if (this.hasChanged && !this.loading && !this.success) {
        const warningMessage = 'You have unsaved changes. Are you sure you wish to leave?'
        if (!confirm(warningMessage)) {
          event.preventDefault()
          event.returnValue = warningMessage
          return false
        }
        return true
      }
      return true
    }
  }
}
</script>
