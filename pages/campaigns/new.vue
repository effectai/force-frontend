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
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea class="textarea" required v-model="campaignIpfs.description"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Instructions</label>
          <div class="control">
            <textarea class="textarea" required v-model="campaignIpfs.instructions"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Template</label>
          <div class="control">
            <textarea class="textarea" required v-model="campaignIpfs.template"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Attachments</label>
          <div class="control">
            <div class="file has-name is-fullwidth">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  id="file"
                  ref="file"
                  @change="getSelectedFile">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
                <span class="file-name">
                  <span v-if="selectedFile">{{selectedFile.name}}</span>
                </span>
                <span>
                  <button :class="{'is-loading': uploadingFile}" :disabled="!selectedFile" @click.prevent="uploadFile" class="button is-primary">Upload File</button>
                </span>
              </label>
            </div>
          </div>
          <table class="table">
            <tbody v-if="campaignIpfs.image">
              <td><a :href="ipfsExplorer + '/ipfs/' + campaignIpfs.image.Hash" target="_blank">{{ campaignIpfs.image.Name }}</a></td>
              <td>{{ campaignIpfs.image.Size | formatBytes }}</td>
              <td class="has-text-right"><button @click.prevent="removeImage" class="button is-danger is-small">Remove</button></td>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3">No files uploaded</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="field is-grouped is-grouped-right mt-4">
          <div class="control">
            <nuxt-link class="button is-light" to="/">Cancel</nuxt-link>
          </div>
          <div class="control">
            <button type="submit" class="button is-primary is-wide" :class="{'is-loading': loading}">Save Campaign</button>
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
        image: null,
        category: '',
        version: 1
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
        const hash = await this.$blockchain.uploadCampaign(this.campaignIpfs)
        const result = await this.$blockchain.createCampaign(hash)
        this.transactionUrl = process.env.NUXT_ENV_EOS_EXPLORER_URL + '/transaction/' + result.transaction_id
        this.message = 'Campaign created successfully! Check your transaction here: '

        // reset campaign
        this.campaignIpfs = {
          title: '',
          description: '',
          instructions: '',
          template: '',
          image: null,
          category: '',
          version: 1
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
    },
    getSelectedFile () {
      this.selectedFile = this.$refs.file.files[0]
    },
    async uploadFile () {
      if (this.selectedFile) {
        this.uploadingFile = true
        const formData = new FormData()
        formData.append('file', this.selectedFile)
        if (this.selectedFile.size > 10000000) {
          alert('Max file size allowed is 10 MB')
          this.selectedFile = null
          this.$refs.file.value = ''
        } else {
          try {
            const response = await fetch(`${process.env.NUXT_ENV_IPFS_NODE}/api/v0/add?pin=true`,
              {
                method: 'POST',
                body: formData
              })
            const file = await response.json()
            this.campaignIpfs.image = file
            this.selectedFile = null
            this.$refs.file.value = ''
          } catch (e) {
            console.log(e)
          }
        }
        this.uploadingFile = false
      }
    },
    removeImage () {
      this.campaignIpfs.image = null
    }
  }
}
</script>