<template>
  <section class="section">
    <div class="container">
      <p class="is-pulled-right">
        <span class="has-text-info"><b>*</b></span>
        <i> is required</i>
      </p>
      <h1 class="title mt-5">
        New Campaign
      </h1>
      <div v-if="errors.length">
        <div v-for="error in errors" :key="error" class="notification is-danger is-light">
          {{ error }}
        </div>
      </div>
      <div class="tabs">
        <ul>
          <li :class="{'is-active': formGroup === 'basic-info'}">
            <a @click.prevent="formGroup = 'basic-info'">Basic Information</a>
          </li>
          <li :class="{'is-active': formGroup === 'instructions'}">
            <a @click.prevent="formGroup = 'instructions'">Instructions</a>
          </li>
          <li :class="{'is-active': formGroup === 'tasks'}">
            <a @click.prevent="formGroup = 'tasks'">Design Tasks</a>
          </li>
        </ul>
      </div>
      <form @submit.prevent="createCampaign">
        <div v-show="formGroup === 'basic-info'" class="block basic-info-group">
          <div class="field">
            <label class="label">
              Title
              <span class="has-text-info">*</span>
            </label>
            <div class="control">
              <input v-model="campaignIpfs.title" class="input" type="text" placeholder="My Campaign Title">
            </div>
          </div>
          <div class="field">
            <label class="label">
              Description
              <span class="has-text-info">*</span>
            </label>
            <div class="control">
              <textarea v-model="campaignIpfs.description" class="textarea" />
            </div>
          </div>
          <div class="field">
            <label class="label">Image</label>
            <div class="control">
              <input v-model="campaignIpfs.image" class="input" type="text" placeholder="Image URL">
            </div>
          </div>
          <label class="label">
            Reward per task
            <span class="has-text-info">*</span>
          </label>
          <div class="field has-addons">
            <div class="control">
              <input v-model="campaignIpfs.reward" class="input" type="number" placeholder="Reward per task">
            </div>
            <div class="control">
              <a class="button is-primary">
                EFX
              </a>
            </div>
          </div>
          <div class="control">
            <div class="field">
              <label class="label">
                Category
                <span class="has-text-info">*</span>
              </label>
              <div class="select">
                <select v-model="campaignIpfs.category">
                  <option>---</option>
                  <option value="dao">
                    Effect DAO
                  </option>
                  <option value="translate">
                    Effect Translate
                  </option>
                  <option value="socials">
                    Effect Socials
                  </option>
                  <option value="captions">
                    Effect Captions
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-show="formGroup === 'instructions'" class="block instructions-group">
          <div class="columns">
            <div class="column is-two-fifths">
              <div class="field">
                <label class="label">
                  Raw Text
                  <span class="has-text-info">*</span>
                </label>
                <div v-if="campaign && campaignIpfs" class="control">
                  <quill-editor
                    ref="myQuillEditor"
                    v-model="campaignIpfs.instructions"
                  />
                </div>
              </div>
            </div>
            <div class="column is-three-fifths">
              <div class="field">
                <label class="label">Preview</label>
                <div class="control">
                  <instructions-modal v-if="campaign && campaignIpfs" :show="true" :functional="false" :campaign="campaign" :info="campaignIpfs" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="formGroup === 'tasks'" class="block task-group">
          <div class="field">
            <label class="label">Template</label>
            <div class="control">
              <textarea v-model="campaignIpfs.template" class="textarea" />
            </div>
          </div>
          <div v-if="Object.keys(campaignIpfs.example_task).length" class="field">
            <label class="label">Example Task</label>
          </div>
          <div v-else>
            Add placeholders to your template. For example:
            <pre>${placeholder}</pre>
          </div>
          <div>
            To learn more about templates and placeholders, visit the <a href="https://effectai.github.io/developer-docs/effect_network/template.html" target="_blank">documentation</a>.
          </div>
          <div v-for="(placeholder, key) in campaignIpfs.example_task" :key="key" class="field is-horizontal">
            <div class="field-label is-small">
              <label class="label">{{ key }}</label>
            </div>
            <div class="field-body is-small">
              <div class="field">
                <div class="control">
                  <input v-model="campaignIpfs.example_task[key]" class="input is-small" type="text">
                </div>
              </div>
            </div>
          </div>
          <h2 class="subtitle mt-5">
            Task Preview
          </h2>
          <template-media
            :html="renderTemplate(
              campaignIpfs.template || 'No template found..',
              campaignIpfs.example_task || {})"
          />
        </div>
        <div class="field is-grouped is-grouped-right mt-4">
          <div class="control">
            <button class="button is-secondary" @click.prevent="$refs.fileInput.click()">
              Import Campaign
            </button>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="application/json"
              @change="importCampaign($event)"
            >
          </div>
          <div class="control">
            <button class="button is-secondary" @click.prevent="exportCampaign">
              Export Campaign
            </button>
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
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
        <div v-if="errors.length === 0 && submitted" class="notification is-success is-light">
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
import { quillEditor } from 'vue-quill-editor'
import { Template } from '@effectai/effect-js'
import InstructionsModal from '@/components/InstructionsModal'
import TemplateMedia from '@/components/Template'

function getMatches (string, regex, index) {
  index || (index = 1) // default to the first capturing group
  const matches = []
  let match
  while ((match = regex.exec(string))) {
    matches.push(match[index])
  }
  return matches
}

export default {
  components: {
    quillEditor,
    TemplateMedia,
    InstructionsModal
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
    return {
      advanced: false,
      success: false,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      loading: false,
      preview: false,
      campaignIpfs: {
        title: '',
        description: '',
        instructions: '',
        template: '',
        image: '',
        category: '',
        example_task: {},
        version: 1,
        reward: null
      },
      campaign: {
        content_hash: null
      },
      formGroup: 'basic-info',
      cachedFormData: null,
      uploadingFile: false,
      selectedFile: null,
      submitted: false,
      message: null,
      errors: []
    }
  },
  computed: {
    // Compares cached user data to live data
    hasChanged () {
      return this.cachedFormData !== this.formDataForComparison()
    }
  },
  watch: {
    'campaignIpfs.template' (template) {
      const placeholders = getMatches(
        template,
        /\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g
      )
      const newPlaceholders = {}
      placeholders.forEach((placeholder) => {
        newPlaceholders[placeholder] = this.campaignIpfs.example_task[placeholder] || ''
      })
      this.campaignIpfs.example_task = newPlaceholders
    },
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
    this.cacheFormData()
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.checkClose)
  },

  methods: {
    importCampaign (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      if (file.name.includes('.json')) {
        reader.onload = (res) => {
          this.campaignIpfs = JSON.parse(res.target.result)
        }
        reader.onerror = err => console.error(err)
        reader.readAsText(file)
      }
    },
    exportCampaign () {
      const blob = new Blob([JSON.stringify(this.campaignIpfs)], { type: 'application/json' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'campaign'
      link.click()
      URL.revokeObjectURL(link.href)
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    checkForm () {
      this.errors = []
      if (
        this.campaignIpfs.title && this.campaignIpfs.description &&
        this.campaignIpfs.reward && this.campaignIpfs.category &&
        this.campaignIpfs.instructions && this.campaignIpfs.template
      ) {
        return true
      }
      if (!this.campaignIpfs.title) {
        this.errors.push('Title is required.')
      }
      if (!this.campaignIpfs.description) {
        this.errors.push('Description is required.')
      }
      if (!this.campaignIpfs.reward) {
        this.errors.push('Reward per task is required.')
      }
      if (!this.campaignIpfs.category) {
        this.errors.push('Category is required.')
      }
      if (!this.campaignIpfs.instructions) {
        this.errors.push('Instructions is required.')
      }
      if (!this.campaignIpfs.template) {
        this.errors.push('Template is required.')
      }
    },
    cacheFormData () {
      // save this in the store instead?
      const campaign = window.localStorage.getItem('cached_campaign')
      const campaignIpfs = window.localStorage.getItem('cached_campaignIpfs')
      if (campaign) {
        this.campaign = JSON.parse(campaign)
      }
      if (campaignIpfs) {
        this.campaignIpfs = JSON.parse(campaignIpfs)
      }
      this.cachedFormData = this.formDataForComparison()
      window.addEventListener('beforeunload', this.checkClose)
    },
    async createCampaign () {
      this.loading = true
      try {
        if (this.checkForm()) {
          const campaignIpfs = { ...this.campaignIpfs }
          const hash = await this.$blockchain.uploadCampaign(campaignIpfs)
          const result = await this.$blockchain.createCampaign(hash, this.campaignIpfs.reward)
          console.log('CAMPAIGNRESULT', result)
          this.$store.dispatch('transaction/addTransaction', result)
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
            example_task: {},
            version: 1,
            reward: null
          }
        }
      } catch (error) {
        this.errors.push(error)
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
<style lang="scss" scoped>
div.instructions-group .textarea {
  overflow-y: scroll
}
</style>
