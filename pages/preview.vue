<template>
  <section class="section">
    <div class="container">
      <div class="block task-group">
        <div class="field">
          <label class="label">Template Preview Tool</label>
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
    </div>
  </section>
</template>

<script>
import { Template } from '@effectai/effect-js'
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
    TemplateMedia
  },
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
        template: 'Edit your template here. 🖋',
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
      errors: [],
      successMessage: null,
      successTitle: null
    }
  },
  computed: {

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
  methods: {
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    }
  }
}
</script>

<style lang="scss" scoped>
div.instructions-group .textarea {
  overflow-y: scroll
}
</style>
