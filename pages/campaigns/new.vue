<template>
  <section class="section">
    <div class="container">
      <div v-if="loading" class="loader-wrapper is-active">
        <img src="~assets/img/loading.svg">
        <br><span class="loading-text">Waiting for the transaction to complete</span>
      </div>
      <p class="is-pulled-right">
        <span class="has-text-info"><b>*</b></span>
        <i> is required</i>
      </p>
      <h1 class="title mt-5">
        New Task
      </h1>
      <div v-if="errors.length">
        <div v-for="error in errors" :key="toString(error)" class="notification is-danger is-light">
          {{ error }}
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="tabs">
            <ul>
              <li :class="{'is-active': formGroup === 'tasks'}">
                <a @click.prevent="formGroup = 'tasks'">Design Tasks <span class="has-text-danger">*</span></a>
              </li>
              <li :class="{'is-active': formGroup === 'basic-info'}">
                <a @click.prevent="formGroup = 'basic-info'">Basic Information <span class="has-text-danger">*</span></a>
              </li>
              <li :class="{'is-active': formGroup === 'instructions'}">
                <a @click.prevent="formGroup = 'instructions'">Instructions <span class="has-text-danger">*</span></a>
              </li>
              <li :class="{'is-active': formGroup === 'advanced'}">
                <a @click.prevent="formGroup = 'advanced'">Advanced</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="field is-grouped is-grouped-right mt-4">
            <div class="control has-margin-bottom-mobile">
              <button class="button is-secondary is-outlined is-small" @click.prevent="$refs.fileInput.click()">
                Import
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
              <button class="button is-secondary is-outlined is-small" @click.prevent="exportCampaign">
                Export
              </button>
            </div>
          </div>
        </div>
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
            <upload-to-ipfs @upload="selectImage" />
            <div class="control">
              <input v-model="campaignIpfs.image" class="input" type="url" placeholder="Image URL">
            </div>
          </div>
          <div class="field">
            <label class="label">
              Category
              <span class="has-text-info">*</span>
            </label>
            <div class="select">
              <select v-model="campaignIpfs.category" required>
                <option>---</option>
                <option value="qualifier">
                  Qualifier
                </option>
                <option value="annotations">
                  Annotations
                </option>
                <option value="socials">
                  Socials
                </option>
              </select>
            </div>
          </div>
          <hr>
          <div class="field">
            <label class="label">
              Worker must have qualifications
            </label>
            <multiselect
              v-if="allQualificationsLoaded"
              v-model="inclusiveQualis"
              tag-placeholder="Add"
              placeholder="Select Qualifications"
              label="name"
              track-by="code"
              :options="qualificationsDropdownData"
              :multiple="true"
              :taggable="true"
              :show-labels="false"
              @tag="addInclusiveQuali"
            />
          </div>
          <div class="field">
            <label class="label">
              Deny workers with qualification
            </label>
            <multiselect
              v-if="allQualificationsLoaded"
              v-model="exclusiveQualis"
              tag-placeholder="Add"
              placeholder="Select Qualifications"
              label="name"
              track-by="code"
              :options="qualificationsDropdownData"
              :multiple="true"
              :taggable="true"
              :show-labels="false"
              @tag="addExclusiveQuali"
            />
          </div>
          <hr>
          <div class="field">
            <label class="label">
              EFX <strong>/</strong> Task
              <span class="has-text-info">*</span>
            </label>
            <div class="field has-addons">
              <div class="control">
                <input v-model="campaignIpfs.reward" class="input" type="number" placeholder="Reward per task" step="0.0001">
              </div>
              <div class="control">
                <a class="button is-primary">
                  EFX
                </a>
              </div>
            </div>
          </div>
          <div class="field">
            <label for="" class="label">
              Time <strong>/</strong> Task
              <span class="has-text-info">*</span>
            </label>
            <div class="field has-addons">
              <div class="control">
                <input
                  v-model="campaignIpfs.estimated_time"
                  class="input"
                  type="number"
                  placeholder="1"
                  step="1"
                  min="1"
                >
              </div>
              <div class="control">
                <a href="" class="button is-primary">Seconds</a>
              </div>
            </div>
          </div>
          <div class="field">
            <label for="" class="label">
              EFX <strong>/</strong> Hour
            </label>
            <div class="field">
              <div v-if="campaignIpfs && campaignIpfs.estimated_time && campaignIpfs.reward">
                <b>
                  <span>{{ parseFloat(estimatedEarnings.efxPerHour).toFixed(4) }} EFX</span>
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
        <div v-show="formGroup === 'instructions'" class="block instructions-group">
          <div class="columns">
            <div class="column is-two-fifths">
              <div class="field">
                <label class="label">
                  Raw Markdown
                  <span class="has-text-info">*</span>
                </label>
                <div v-if="campaignIpfs" class="control">
                  <vue-simplemde ref="markdownEditor" v-model="campaignIpfs.instructions" required :configs="{promptURLs: true, spellChecker: false}" />
                </div>
              </div>
            </div>
            <div class="column is-three-fifths">
              <div class="field">
                <label class="label">Preview</label>
                <div class="control">
                  <instructions-modal v-if="campaignIpfs" :show="true" :functional="false" :info="campaignIpfs" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="formGroup === 'tasks'" class="block task-group">
          <div class="columns is-variable is-2 is-multiline">
            <splitpanes class="default-theme" :horizontal="windowWidth < 767">
              <pane class="column is-6-widescreen is-12">
                <label class="label">Template <span class="has-text-info"><b>*</b></span></label>
                <codemirror
                  id="template"
                  ref="template"
                  v-model="campaignIpfs.template"
                  :options="cmOptions"
                  name="template"
                />
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
              </pane>
              <pane class="column is-6-widescreen is-12">
                <h2 class="subtitle">
                  Task Preview
                </h2>
                <template-media
                  :html="renderTemplate(
                    campaignIpfs.template || 'No template found..',
                    campaignIpfs.example_task || {})"
                  @submit="showSubmission"
                  :isLiveTask="false"
                />
                <div class="mt-5">
                  <h2 class="subtitle">
                    Submission Answer
                  </h2>
                  <pre v-if="answer">{{ answer }}</pre>
                  <p v-else>
                    Make sure your template has a submit button so that users can submit their answers. Test your template by submitting and view your submission here
                  </p>
                </div>
              </pane>
            </splitpanes>
          </div>
        </div>
        <div v-show="formGroup === 'advanced'" class="block basic-info-group">
          <div class="field">
            <label class="label">
              Webhook URL for submissions
            </label>
            <div class="control">
              <input v-model="campaignIpfs.webhook" class="input" type="url" placeholder="webhook url..">
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <nuxt-link class="button is-light" to="/campaigns">
              Cancel
            </nuxt-link>
          </div>
          <div class="control" :class="{'has-tooltip-arrow': !answer}" :data-tooltip="!answer ? 'submit your template in the task\npreview to test your template' : null">
            <button type="submit" :class="{'is-loading': loading}" :disabled="!answer" class="button is-primary is-wide">
              Create Task
            </button>
          </div>
        </div>
      </form>
    </div>
    <!-- SuccessModal -->
    <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import VueSimplemde from 'vue-simplemde'
import { Template } from '@effectai/effect-js'
import Multiselect from 'vue-multiselect'
import { codemirror } from 'vue-codemirror'
import { Splitpanes, Pane } from 'splitpanes'
import InstructionsModal from '@/components/InstructionsModal'
import TemplateMedia from '@/components/Template'
import SuccessModal from '@/components/SuccessModal'
import 'splitpanes/dist/splitpanes.css'
import UploadToIpfs from '@/components/UploadToIpfs'

// require component
// require styles
import 'codemirror/lib/codemirror.css'
// language js
import 'codemirror/mode/htmlmixed/htmlmixed'

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
    codemirror,
    VueSimplemde,
    TemplateMedia,
    InstructionsModal,
    SuccessModal,
    Splitpanes,
    Pane,
    Multiselect,
    UploadToIpfs
  },
  beforeRouteLeave (to, from, next) {
    if (this.checkClose()) {
      next()
    }
  },
  middleware: ['auth'],
  data () {
    return {
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'htmlmixed',
        theme: 'default',
        lineNumbers: true,
        line: true
      },
      success: false,
      loading: false,
      preview: false,
      campaignIpfs: {
        title: '',
        description: '',
        instructions: '',
        // eslint-disable-next-line no-template-curly-in-string
        template: '',
        image: '',
        category: '',
        example_task: {},
        version: 1.1,
        webhook: null,
        reward: null,
        estimated_time: null
      },
      formGroup: 'tasks',
      cachedFormData: null,
      uploadingFile: false,
      selectedFile: null,
      submitted: false,
      errors: [],
      successMessage: null,
      successTitle: null,
      answer: null,
      windowWidth: 0,
      inclusiveQualis: [],
      exclusiveQualis: [],
      options: []
    }
  },
  computed: {
    ...mapState({
      allQualificationsLoaded: state => state.qualification.allQualificationsLoaded
    }),
    // Compares cached user data to live data
    hasChanged () {
      return this.cachedFormData !== this.formDataForComparison()
    },
    estimatedEarnings () {
      const hourInSec = 3600
      if (this.campaignIpfs && this.campaignIpfs.estimated_time && this.campaignIpfs.reward) {
        const efxPerHour = hourInSec / this.campaignIpfs.estimated_time * this.campaignIpfs.reward
        const dollarPerHour = efxPerHour * this.$blockchain.efxPrice
        return { efxPerHour, dollarPerHour }
      } else {
        return { efxPerHour: 0, dollarPerHour: 0 }
      }
    },
    qualificationsDropdownData () {
      const qualifications = []
      const selectableQualifications = this.$store.state.qualification.qualifications.filter(q => (q.account_id === this.$auth.user.vAccountRows[0].id || q.account_id === this.$blockchain.sdk.config.qualifierAccountId))
      for (const qualification of selectableQualifications) {
        if (qualification.info?.name) {
          qualifications.push(
            {
              name: qualification.info?.name,
              code: qualification.id
            }
          )
        }
      }
      return qualifications
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
    campaignIpfs: {
      deep: true,
      handler (campaignIpfs) {
        window.localStorage.setItem('cached_campaignIpfs', JSON.stringify(campaignIpfs))
      }
    }
  },

  created () {
    this.getQualifications()
    this.cacheFormData()
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.checkClose)
  },

  methods: {
    selectImage (file) {
      this.campaignIpfs.image = file
    },
    async getQualifications () {
      if (!this.allQualificationsLoaded) {
        await this.$store.dispatch('qualification/getQualifications')
      }
    },
    addExclusiveQuali (quali, id) {
      const tag = {
        name: quali,
        code: id
      }
      this.exclusiveQualis.push(tag)
    },
    addInclusiveQuali (quali, id) {
      const tag = {
        name: quali,
        code: id
      }
      this.inclusiveQualis.push(tag)
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async retrieveTemplate (params) {
      const decoder = new TextDecoder('utf-8')
      if (params.templateUrl) {
        this.campaignIpfs.template = 'Retrieving campaign template..'
        // const response = await this.$axios.get(params.templateUrl)
        const response = await (await fetch(params.templateUrl, { mode: 'cors' })).json()
        this.campaignIpfs.template = response.template
      } else if (params.template) {
        this.campaignIpfs.template = decodeURI(params.template)
      }
      if (params.placeholders) {
        // const response = await this.$axios.get(params.placeholders.replaceAll('"', ''))
        const response = await fetch(params.placeholders.replaceAll('"', ''))
        const buffer = await response.arrayBuffer()
        const decodedResponse = decoder.decode(buffer)
        console.debug(decodedResponse)
        this.campaignIpfs.example_task = JSON.parse(decodedResponse)
      }
    },
    showSubmission (values) {
      this.answer = values
    },
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
      link.download = this.campaignIpfs.length === 0 ? `effect_${this.campaignIpfs.title}.json` : 'effect_untitled_campaign.json'
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
        this.campaignIpfs.instructions && this.campaignIpfs.template &&
        this.campaignIpfs.estimated_time
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
      if (!this.campaignIpfs.estimated_time) {
        this.errors.push('Estimated time is required.')
      }
      return false
    },
    cacheFormData () {
      // save this in the store instead?
      const campaignIpfs = window.localStorage.getItem('cached_campaignIpfs')
      if (campaignIpfs) {
        this.campaignIpfs = JSON.parse(campaignIpfs)
      }
      this.retrieveTemplate(this.$route.query)
      this.cachedFormData = this.formDataForComparison()
      window.addEventListener('beforeunload', this.checkClose)
    },
    async createCampaign () {
      let createdCampaign
      try {
        if (this.checkForm()) {
          this.loading = true
          const campaignIpfs = { ...this.campaignIpfs }

          const qualis = []
          for (let i = 0; i < this.exclusiveQualis.length; i++) {
            qualis.push({
              key: this.exclusiveQualis[i].code,
              value: 1
            })
          }
          for (let i = 0; i < this.inclusiveQualis.length; i++) {
            qualis.push({
              key: this.inclusiveQualis[i].code,
              value: 0
            })
          }

          const hash = await this.$blockchain.uploadCampaign(campaignIpfs)
          const result = await this.$blockchain.createCampaign(hash, this.campaignIpfs.reward, qualis)

          // Wait for transaction and reload campaigns
          this.successTitle = 'Campaign submitted successfully'
          this.successMessage = 'Waiting for transaction to complete before continuing'
          await this.$blockchain.waitForTransaction(result)
          await this.$store.dispatch('campaign/getCampaigns')
          createdCampaign = await this.$blockchain.getMyLastCampaign()

          this.$store.dispatch('transaction/addTransaction', result)

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
            reward: null,
            estimated_time: null
          }
          this.loading = false
          this.submitted = true
          this.$router.push(`/campaigns/${createdCampaign.id}`)
        }
      } catch (error) {
        console.error(error)
        this.loading = false
        this.errors.push(error)
      }
    },
    // Helper method that generates JSON for string comparison
    formDataForComparison () {
      return JSON.stringify({ campaign: this.campaign, campaignIpfs: this.campaignIpfs })
    },
    checkClose (event) {
      if (this.hasChanged && !this.loading && !this.submitted) {
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
<style>
.CodeMirror {
  height: 100%;
}
</style>
<style lang="scss" scoped>
#template {
  height: 500px;
}
div.instructions-group .textarea {
  overflow-y: scroll
}
.splitpanes.default-theme {
  @media screen and (max-width: $tablet) {
    display: block !important;
  }
  .splitpanes__pane {
    background: transparent !important;
    @media screen and (max-width: $tablet) {
      width: 100% !important;
    }
  }
}
</style>
