<template>
  <div v-if="info" class="modal" :class="{'is-active': showModal}" :style="{position: !functional ? 'relative' : 'fixed', padding: !functional ? '10px' : 'initial', zIndex: !functional ? '1' : '40'}">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ info.title }}
        </p>
        <button class="delete" aria-label="close" :disabled="!functional" @click.prevent="onCancel()" />
      </header>
      <section class="modal-card-body">
        <div v-if="info" class="content" v-html="sanitizeHtmlCustom($md.render(info.instructions))" />
        <p v-else>
          ...
        </p>
        <hr>

        <!-- Qualifications for modal -->
        <div class="block is-vcentered">
          <div class="is-size-4 has-text-centered">
            Qualifications
          </div>
          <div v-if="allQualificationsLoaded">
            <div>Required</div>
            <div v-if="inclQuali.length > 0" class="tags">
              <span v-for="quali in inclQuali" :key="quali.code" class="tag is-light is-success" >
                <nuxt-link :to="`/qualifications/${quali.code}`">{{ quali.name }}</nuxt-link>
              </span>
            </div>
            <div v-else>
              None
            </div>
            <br>
            <div>Exclude:</div>
            <div v-if="exclQuali.length > 0" class="tags">
              <span v-for="quali in exclQuali" :key="quali.code" class="tag is-light is-danger">
                <nuxt-link :to="`/qualifications/${quali.code}`">{{ quali.name }}</nuxt-link>
              </span>
            </div>
            <div v-else>
              None
            </div>
          </div>
          <div v-else class="loading-text has-text-centered">Loading</div>
          <br>
        </div>

        <hr>
        <label class="checkbox">
          <input v-if="readonly" checked type="checkbox" disabled>
          <input v-else v-model="tac" type="checkbox">
          I agree to the <a href="/download/tac.pdf" target="_blank">terms and conditions</a>
        </label>
      </section>
      <footer class="modal-card-foot has-text-centered">
        <button v-if="readonly" class="button is-primary" :disabled="!functional" @click.prevent="onCancel()">
          OK
        </button>
        <template v-else>
          <button class="button is-primary has-tooltip has-tooltip-arrow" :data-tooltip="!tac ? 'agree to the terms and\nconditions to qualify' : 'No additional\nqualifications needed'" :disabled="!tac || !info || !functional" @click.prevent="onClick()">
            Qualify
          </button>
          <button class="button" :disabled="!functional" @click.prevent="onCancel()">
            Cancel
          </button>
        </template>
      </footer>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import sanitizeHtml from 'sanitize-html'

export default {
  name: 'InstructionsModal',
  props: {
    info: {
      type: Object,
      required: true,
      default () { return {} }
    },
    show: {
      type: Boolean,
      required: false,
      default: false
    },
    functional: {
      type: Boolean,
      required: false,
      default: true
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      tac: false,
      id: parseInt(this.$route.params.id),
      campaign: null,
      userQuali: [],
      accountId: this.$auth.user.vAccountRows[0].id
    }
  },
  created () {
    this.campaign = this.campaignById(this.id)
    this.userQuali = this.qualificationByUser(this.accountId)
  },
  computed: {
    ...mapGetters({
      campaignById: 'campaign/campaignById',
      qualificationById: 'qualification/qualificationById',
      qualificationByUser: 'qualification/qualificationByUser'
    }),
    ...mapState({
      allQualificationsLoaded: state => state.qualification.allQualificationsLoaded
    }),
    showModal: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('clicked', val)
      }
    },

    inclQuali () {
      const quals = []
      for (const quali of this.campaign.qualis) {
        const q = this.qualificationById(quali.key)
        if (quali.value === 0) {
          quals.push({ name: q.info.name, code: quali.key })
        }
      }
      return quals
    },

    exclQuali () {
      const quals = []
      for (const quali of this.campaign.qualis) {
        const q = this.qualificationById(quali.key)
        if (quali.value === 1) {
          quals.push({ name: q.info.name, code: quali.key })
        }
      }
      return quals
    }
  },
  methods: {
    onCancel () {
      // check if modal should be functional.
      if (this.functional) {
        this.showModal = false
      }
    },
    onClick () {
      if (this.functional) {
        // TODO: pass this as a method, so we can call custom methods
        this.$parent.reserveTask()
      }
    },
    sanitizeHtmlCustom (htmlSnippet) {
      return sanitizeHtml(htmlSnippet, {
        allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
          'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
          'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'span', 'label'],
        allowedAttributes: {
          a: ['href', 'name', 'target', 'class'],
          img: ['src', 'alt'],
          iframe: ['src'],
          '*': ['style']
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
