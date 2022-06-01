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
        <div class="column is-3">
          <div class="panel">
            <p class="panel-heading">
              Templates
            </p>
            <div v-if="loading" class="subtitle loading-text">
              Loading
            </div>
            <div v-else-if="!templates">
              Could not retrieve default templates
            </div>
            <div v-else-if="Object.keys(templates).length === 0">
              No default templates found
            </div>
            <a v-for="template in templates" :key="template.url" class="panel-block" :class="{'is-active': selectedTemplate === template}" @click="selectedTemplate = template">
              <span class="panel-icon">
                ›
              </span>
              {{ template.name }}
            </a>
          </div>
        </div>
        <div class="column is-9">
          <h2 class="panel-heading">
            Preview
          </h2>
          <template-media :html="previewTemplate" />
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <a v-if="cached" class="is-size-6 has-text-danger-dark pt-2 mr-2" @click="clearCache">clear cache</a>
        <div class="control">
          <nuxt-link class="button is-light" to="/campaigns/new">
            <span v-if="cached">Continue from Cache</span><span v-else>Blank Template</span>
          </nuxt-link>
        </div>
        <div class="control">
          <nuxt-link v-if="selectedTemplate" :disabled="loading" :to="`/campaigns/new?templateUrl=${selectedTemplate.url}&placeholders=${JSON.stringify(selectedTemplate.placeholders)}`" class="button is-primary is-wide">
            Use Template
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'

export default {
  components: {
    TemplateMedia
  },
  middleware: ['auth'],
  data () {
    const cached = window.localStorage.getItem('cached_campaignIpfs')
    return {
      cached: !!cached,
      loading: false,
      example_task: null,
      template: null,
      selectedTemplate: null,
      previewTemplate: null,
      templates: null
    }
  },
  computed: {
    ...mapGetters({
      savedTemplates: 'template/getTemplates'
    })
  },
  watch: {
    async selectedTemplate (template) {
      const sTemplate = { ...template }
      this.loading = true
      try {
        // const response = await this.$axios.get(sTemplate.url)
        const response = await (await fetch(sTemplate.url, { mode: 'cors' })).text()
        // console.log(await response.text())
        if (typeof sTemplate.placeholders === 'string') {
          try {
            // const response2 = await this.$axios.get(sTemplate.placeholders)
            const response2 = await fetch(sTemplate.placeholders)
            // console.log(response2)

            const buffer = await response2.arrayBuffer()
            // console.log(buffer)

            const decoder = new TextDecoder('utf-8')
            const decoded = decoder.decode(buffer)
            // console.log(decoded)

            sTemplate.placeholders = JSON.parse(decoded)
          } catch (e) {
            sTemplate.placeholders = {}
            console.error('could not retrieve example task', e)
          }
        }
        this.previewTemplate = this.renderTemplate(response, sTemplate.placeholders)
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  },

  created () {
    this.retrieveTemplates()
  },

  methods: {
    clearCache () {
      window.localStorage.removeItem('cached_campaignIpfs')
      this.cached = false
    },
    async retrieveTemplates () {
      this.loading = true
      try {
        if (!this.savedTemplates || Object.keys(this.savedTemplates).length === 0) {
          await this.$store.dispatch('template/getTemplates')
        }
        this.templates = { ...this.savedTemplates }
        this.selectedTemplate = this.templates[Object.keys(this.templates)[0]]
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
