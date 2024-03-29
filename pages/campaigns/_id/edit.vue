<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/campaigns">
              All Tasks
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="'/campaigns/' + id" aria-current="page">
              Task {{ id }}
            </nuxt-link>
          </li>
          <li class="is-active">
            <nuxt-link to="#">
              Edit
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div v-if="campaignLoading" class="loading-text">
        Task loading
      </div>
      <div v-else-if="!campaign">
        Could not retrieve campaign
      </div>
      <p class="is-pulled-right">
        <span class="has-text-info"><b>*</b></span>
        <i> is required</i>
      </p>
      <h1 class="title mt-5">
        Edit Task
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
      <form v-if="campaign" @submit.prevent="editCampaign">
        <div v-show="formGroup === 'basic-info'" class="block basic-info-group">
          <div class="field">
            <label class="label">
              Title
              <span class="has-text-info">*</span>
            </label>
            <div class="control">
              <input v-model="campaignIpfs.title" required class="input" type="text" placeholder="My Campaign Title">
            </div>
          </div>
          <div class="field">
            <label class="label">
              Description
              <span class="has-text-info">*</span>
            </label>
            <div class="control">
              <textarea v-model="campaignIpfs.description" class="textarea" required />
            </div>
          </div>
          <div class="field">
            <label class="label">Image</label>
            <div class="control">
              <input v-model="campaignIpfs.image" class="input" type="text" placeholder="Image URL">
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

          <div v-if="campaignIpfs.category === 'qualifier'" class="field">
            <label for="" class="label">
              Qualification
            </label>
            <multiselect
              v-model="campaignIpfs.qualification"
              :options="myQualifications"
              label="label"
              :loading="!allQualificationsLoaded"
              placeholder="Select a qualification for this qualifier task"
            />
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
                <input
                  v-model="campaignIpfs.reward"
                  required
                  class="input"
                  type="number"
                  placeholder="Reward per task"
                  step="0.0001"
                >
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
                <div v-if="campaign && campaignIpfs" class="control">
                  <vue-simplemde ref="markdownEditor" v-model="campaignIpfs.instructions" required :configs="{promptURLs: true, spellChecker: false}" />
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
            @submit="showSubmission"
            :isLiveTask="false"
          />
          <div class="mt-5">
            <h2 class="subtitle">
              Submission Answer
            </h2>
            <pre v-if="answer">{{ answer }}</pre>
            <p v-else>
              Make sure your template has a submit button so that users can submit their answers
            </p>
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
        <div class="field is-grouped is-grouped-right has-margin-top-mobile">
          <div class="control">
            <nuxt-link class="button is-light" to="/campaigns">
              Cancel
            </nuxt-link>
          </div>
          <div class="control">
            <button type="submit" class="button is-primary is-wide" :class="{'is-loading': loading}">
              Save
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
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'
import VueSimplemde from 'vue-simplemde'
import { Template } from '@effectai/effect-js'
import Multiselect from 'vue-multiselect'
import InstructionsModal from '@/components/InstructionsModal'
import TemplateMedia from '@/components/Template'
import SuccessModal from '@/components/SuccessModal'

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
    VueSimplemde,
    TemplateMedia,
    InstructionsModal,
    SuccessModal,
    Multiselect
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
      id: parseInt(this.$route.params.id),
      advanced: false,
      success: false,
      ipfsExplorer: this.$blockchain.sdk.config.ipfsNode,
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
        version: 1.1,
        webhook: null,
        reward: null,
        estimated_time: null
      },
      campaign: null,
      formGroup: 'basic-info',
      cachedFormData: null,
      uploadingFile: false,
      selectedFile: null,
      submitted: false,
      errors: [],
      successMessage: null,
      successTitle: null,
      campaignLoading: null,
      answer: null,
      inclusiveQualis: [],
      exclusiveQualis: [],
      options: [],
      efxQualifierAccount: 127
    }
  },
  computed: {
    ...mapState({
      allQualificationsLoaded: state => state.qualification.allQualificationsLoaded,
      qualifications: state => state.qualification.qualifications,
      advanced: state => state.view.advanced
    }),
    ...mapGetters({
      qualificationById: 'qualification/qualificationById'
    }),
    // Compares live campaign info to stored campaign info
    hasChanged () {
      return this.campaign && !_.isEqual(this.campaignIpfs, this.campaign.info)
    },
    estimatedEarnings () {
      const hourInSec = 3600
      if (this.campaignIpfs && this.campaignIpfs.estimated_time && this.campaignIpfs.reward) {
        const efxPerHour = (hourInSec / this.campaignIpfs.estimated_time) * this.campaignIpfs.reward
        const dollarPerHour = efxPerHour * this.$blockchain.efxPrice
        return { efxPerHour, dollarPerHour }
      } else {
        return { efxPerHour: 0, dollarPerHour: 0 }
      }
    },
    myQualifications () {
      if (!this.allQualificationsLoaded) {
        return []
      }
      return (this.advanced
        ? this.qualifications
        : this.qualifications.filter((qualification) => {
          return qualification.account_id === this.$auth.user.vAccountRows[0].id || qualification.account_id === this.efxQualifierAccount
        }))
        .map(q => ({ ...q, label: `ID: ${q.id} - ${q.info?.name}` }))
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
        this.campaignIpfs = campaignIpfs
      }
    }
  },

  created () {
    this.getQualifications()
    this.getCampaign()
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.checkClose)
  },

  methods: {
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
        reader.onerror = err => this.errors.push(err)
        reader.readAsText(file)
      }
    },
    exportCampaign () {
      const blob = new Blob([JSON.stringify(this.campaignIpfs)], { type: 'application/json' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `effect-${this.campaign.info.title}.json`
      link.click()
      URL.revokeObjectURL(link.href)
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    async getCampaign () {
      this.campaignLoading = true
      try {
        const campaign = await this.$blockchain.getCampaign(+this.id)
        if (this.checkCampaignOwner(campaign)) {
          this.campaign = campaign
          for (const quali of this.campaign.qualis) {
            const q = this.qualificationById(quali.key)
            if (quali.value === 1) {
              if (this.exclusiveQualis.filter(qf => qf.code === quali.key).length === 0) {
                this.addExclusiveQuali(q.info?.name, quali.key)
              }
            } else if (this.inclusiveQualis.filter(qf => qf.code === quali.key).length === 0) {
              this.addInclusiveQuali(q.info?.name, quali.key)
            }
          }
          this.campaignIpfs = { ...this.campaign.info }
          window.addEventListener('beforeunload', this.checkClose)
        } else {
          this.$router.push('/campaigns/' + this.id)
        }
      } catch (error) {
        this.errors.push(error)
      }
      this.campaignLoading = false
    },
    checkCampaignOwner (campaign) {
      if (!_.isEqual(this.$auth.user.accountName, campaign.owner[1])) {
        return false
      }
      return true
    },
    async editCampaign () {
      this.loading = true
      try {
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
        const hash = await this.$blockchain.uploadCampaign(this.campaignIpfs)
        const result = await this.$blockchain.editCampaign(this.id, hash, this.campaignIpfs.reward, qualis)

        // Wait for transaction and reload campaigns
        this.successTitle = 'Campaign submitted successfully!'
        this.successMessage = 'Waiting for transaction to complete before continuing'
        await this.$blockchain.waitForTransaction(result)
        await this.$store.dispatch('campaign/getCampaign', this.id)

        this.$store.dispatch('transaction/addTransaction', result)
        this.success = true
        this.loading = false
        this.submitted = true
        this.$router.push('/campaigns/' + this.id)
      } catch (error) {
        this.loading = false
        this.errors.push(error)
      }
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
@media screen and (max-width: $tablet) {
  .import-export.is-grouped-right {
    display: block !important;
  }
}
</style>
