<template>
  <section class="section">
    <div class="container">
      <h2 class="title">
        Template Preview Tool
      </h2>
      <div class="block task-group">
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
            Make sure your template has a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit" target="_blank">submit</a> button so that users can submit their answers
          </p>
        </div>
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
      loading: false,
      campaignIpfs: {
        title: '',
        description: '',
        instructions: '',
        // eslint-disable-next-line no-template-curly-in-string
        template: '<h2>Placeholder example: ${placeholder} </h2>\n<input type="text" required placeholder="\'name\' attribute is required on input fields" name="test" /><input type="submit" />',
        image: '',
        category: '',
        example_task: {},
        version: 1,
        reward: null
      },
      campaign: {
        content_hash: null
      },
      answer: null
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
    }
  },
  created () {
    this.retrieveTemplate(this.$route.query)
  },
  methods: {
    async retrieveTemplate (params) {
      if (params.templateUrl) {
        this.campaignIpfs.template = 'Retrieving template..'
        const response = await this.$axios.get(params.templateUrl)
        this.campaignIpfs.template = response.data
      } else if (params.template) {
        this.campaignIpfs.template = decodeURI(params.template)
      }
      if (params.placeholders) {
        this.campaignIpfs.example_task = JSON.parse(params.placeholders)
      }
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    showSubmission (values) {
      this.answer = values
    }
  }
}
</script>
