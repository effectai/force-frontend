<template>
  <section class="section">
    <div class="container">
      <h1 class="title mt-5">
        Default Templates
      </h1>
      <h2 class="subtitle">
        Select a customizable template to start a new campaign
      </h2>
      <div class="columns">
        <div class="column is-2">
          <div class="panel">
            <p class="panel-heading">
              Templates
            </p>
            <a v-for="template in templates" :key="template.url" class="panel-block" :class="{'is-active': selectedTemplate === template}" @click="selectedTemplate = template">
              <span class="panel-icon">
                ›
              </span>
              {{ template.name }}
            </a>
          </div>
        </div>
        <div class="column is-10">
          <h2 class="panel-heading">
            Preview
          </h2>
          <template-media :html="previewTemplate" />
        </div>
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <nuxt-link class="button is-light" to="/campaigns/new">
          Blank Template
        </nuxt-link>
      </div>
      <div class="control">
        <nuxt-link :to="`/campaigns/new?templateUrl=${selectedTemplate.url}&placeholders=${JSON.stringify(selectedTemplate.placeholders)}`" class="button is-primary is-wide">
          Use Template
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'

export default {
  components: {
    TemplateMedia
  },
  middleware: ['auth'],
  data () {
    return {
      loading: false,
      example_task: null,
      template: null,
      selectedTemplate: null,
      previewTemplate: null,
      templates: [
        {
          name: 'Tweet Sentiment',
          url: 'https://raw.githubusercontent.com/effectai/effect-force-templates/master/templates/TweetSentiment/template.html',
          placeholders: { tweet_id: 20 }
        },
        {
          name: 'Image Viewer',
          url: 'https://raw.githubusercontent.com/effectai/effect-force-templates/master/templates/ImageViewer/template.html',
          placeholders: { url: 'https://s3-eu-west-1.amazonaws.com/prototype-mturk-hits/d/0041M9AEPITA0A6YIMIR69NSJ9HZGC.jpeg' }
        },
        {
          name: 'Image Classifier',
          url: 'https://raw.githubusercontent.com/effectai/effect-force-templates/master/templates/Image_Classifier/template.html',
          placeholders: { ipfs: 'QmRKVfKi14UX5UnZm6EffMaa1RiTU64qPeHftzKDXZAhh3' }
        }
      ]
    }
  },

  watch: {
    async selectedTemplate (template) {
      this.loading = true
      try {
        const response = await this.$axios.get(template.url)
        this.previewTemplate = this.renderTemplate(response.data, template.placeholders)
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  },

  created () {
    this.selectedTemplate = this.templates[0]
  },

  methods: {
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
