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
            <div v-if="loading" class="subtitle text-loading">
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
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <nuxt-link class="button is-light" to="/campaigns/new">
          Blank Template
        </nuxt-link>
      </div>
      <div class="control">
        <nuxt-link v-if="selectedTemplate" :disabled="loading" :to="`/campaigns/new?templateUrl=${selectedTemplate.url}&placeholders=${JSON.stringify(selectedTemplate.placeholders)}`" class="button is-primary is-wide">
          Use Template
        </nuxt-link>
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
    return {
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
        const response = await this.$axios.get(sTemplate.url)
        if (typeof sTemplate.placeholders === 'string') {
          try {
            const response2 = await this.$axios.get(sTemplate.placeholders)
            sTemplate.placeholders = response2.data
          } catch (e) {
            sTemplate.placeholders = {}
            console.error('could not retrieve example task', e)
          }
        }
        this.previewTemplate = this.renderTemplate(response.data, sTemplate.placeholders)
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
