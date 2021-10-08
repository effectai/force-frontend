<template>
  <section class="section">
    <div class="container">
      <h4 class="box-title subtitle">
        New Campaign
      </h4>
      <form @submit.prevent="createCampaign">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="campaignIpfs.title" required class="input" type="text" placeholder="My Campaign Title">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea v-model="campaignIpfs.description" class="textarea" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Instructions</label>
          <div class="control">
            <textarea v-model="campaignIpfs.instructions" class="textarea" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Reward per task (EFX)</label>
          <div class="control">
            <input v-model="campaignIpfs.reward" required class="input" type="number" placeholder="Reward per task (EFX)">
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="select">
            <select v-model="campaignIpfs.category" required>
              <option>---</option>
              <!-- TODO: add correct categories -->
              <option value="translation">
                translation
              </option>
              <option value="image_classification">
                image classification
              </option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input v-model="campaignIpfs.image" class="input" type="text" placeholder="Image URL">
          </div>
        </div>
        <div class="field">
          <label class="label">Template</label>
          <div class="control">
            <textarea v-model="campaignIpfs.template" class="textarea" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Example Task</label>
          <div class="control">
            <textarea v-model="campaignIpfs.example_task" class="textarea" required placeholder="{}" />
          </div>
        </div>
        <div class="field is-grouped is-grouped-right mt-4">
          <div class="control">
            <nuxt-link class="button is-light" to="/campaigns">
              Cancel
            </nuxt-link>
          </div>
          <div class="control">
            <button type="submit" class="button is-primary is-wide" :class="{'is-loading': loading}">
              Save Campaign
            </button>
          </div>
        </div>
        <div v-if="submitted" class="notification is-light" :class="{'is-danger': err === true, 'is-success': err === false}">
          {{ message }}
          <span v-if="transactionUrl">
            <a target="_blank" :href="transactionUrl">{{ transactionUrl }}</a>
          </span>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },

  filters: {
    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) {
        return '0 Bytes'
      }
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.checkClose()) {
      next()
    }
  },
  middleware: ['auth'],
  data () {
    // save this in the store instead?
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
        title: '',
        description: '',
        instructions: '',
        template: '',
        image: '',
        category: '',
        example_task: '{}',
        version: 1,
        reward: null
      }
    }
    return {
      advanced: false,
      success: false,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      loading: false,
      preview: false,
      campaignIpfs,
      campaign,
      cachedFormData: null,
      uploadingFile: false,
      selectedFile: null,
      submitted: false,
      message: null,
      err: false
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
        window.localStorage.setItem('cached_campaign', JSON.stringify(campaign))
      }
    },
    campaignIpfs: {
      deep: true,
      handler (campaignIpfs) {
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
      if (this.$auth.user.blockchain === 'bsc') {
        alert('Not supported yet')
        return
      }
      this.loading = true
      try {
        const campaignIpfs = { ...this.campaignIpfs }
        campaignIpfs.example_task = JSON.parse(campaignIpfs.example_task)
        const hash = await this.$blockchain.uploadCampaign(campaignIpfs)
        const result = await this.$blockchain.createCampaign(hash, this.campaignIpfs.reward)
        this.transactionUrl = process.env.NUXT_ENV_EOS_EXPLORER_URL + '/transaction/' + result.transaction_id
        this.message = 'Campaign created successfully! Check your transaction here: '

        // reset campaign
        this.campaignIpfs = {
          title: '',
          description: '',
          instructions: '',
          template: '',
          image: '',
          category: '',
          example_task: '{}',
          version: 1,
          reward: null
        }
      } catch (error) {
        this.message = error
        this.err = true
      }
      this.loading = false
      this.submitted = true
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
