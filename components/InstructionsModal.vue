<template>
  <div v-if="campaign && info" class="modal" :class="{'is-active': showModal}" :style="{position: !functional ? 'relative' : 'fixed', padding: !functional ? '10px' : 'initial', zIndex: !functional ? '1' : '40'}">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ info.title }}
        </p>
        <button class="delete" aria-label="close" :disabled="!functional" @click.prevent="onCancel()" />
      </header>
      <section class="modal-card-body">
        <div v-if="campaign && info" class="content" v-html="sanitizeHtmlCustom($md.render(info.instructions))" />
        <p v-else>
          ...
        </p>
        <label class="checkbox">
          <input v-if="readonly" checked type="checkbox" disabled>
          <input v-else v-model="tac" type="checkbox">
          I agree to the <a href="/download/tac.pdf" target="_blank">terms and conditions</a>
        </label>
      </section>
      <footer class="modal-card-foot">
        <button v-if="readonly" class="button is-primary" :disabled="!functional" @click.prevent="onCancel()">
          OK
        </button>
        <template v-else>
          <button class="button is-primary has-tooltip has-tooltip-arrow" :data-tooltip="!tac ? 'agree to the terms and\nconditions to qualify' : 'No additional\nqualifications needed'" :disabled="!tac || !campaign || !info || !functional" @click.prevent="onClick()">
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
import sanitizeHtml from 'sanitize-html'

export default {
  name: 'InstructionsModal',
  props: {
    campaign: {
      type: Object,
      required: true,
      default () { return {} }
    },
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
      tac: false
    }
  },
  computed: {
    showModal: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('clicked', val)
      }
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
