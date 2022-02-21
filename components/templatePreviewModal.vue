<template>
  <div class="modal" :class="{'is-active': messageContent != null}">
    <div class="modal-background" @click="$emit('close')" />
    <div class="modal-content p-5 has-background-info has-radius has-text-white">
      <h2 class="subtitle mt-5">
        Task Preview
      </h2>
      <h3 class="subtitle has-text-white is-5 has-text-centered">{{ messageTitle }}</h3>
      <p>{{ messageContent }}</p>
      <template-media
        :html="renderTemplate(
          campaignIpfs.template || 'No template found..',
          campaignIpfs.example_task || {})"
        @submit="showSubmission"
      />
      <button class="button modal-close is-large" aria-label="close" @click="$emit('close')"/>
      <br>
      <div class="mt-5">
        <h2 class="subtitle">
          Submission Answer
        </h2>
        <pre v-if="answer">{{ answer }}</pre>
      </div>
      <div class="has-text-centered">
        <button class="button" @click="$emit('close')">OK</button>
      </div>
    </div>
  </div>
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
  props: {
    message: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    templateString: {
      type: String,
      default: null
    },
    placeHolders: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      messageTitle: this.title,
      messageContent: this.message,
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
