<template>
  <div v-if="campaign && info" class="modal" :class="{'is-active': showModal}" :style="{position: !functional ? 'relative' : 'fixed', padding: !functional ? '10px' : 'initial'}">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ info.title }}
        </p>
        <button class="delete" aria-label="close" :disabled="!functional" @click.prevent="onCancel()" />
      </header>
      <section class="modal-card-body">
        <div v-if="campaign && info" class="content" v-html="$md.render(info.instructions)" />
        <p v-else>
          ...
        </p>
        <label class="checkbox">
          <input v-model="tac" type="checkbox">
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" :disabled="!tac || !campaign || !info || !functional" @click.prevent="onClick()">
          Join Campaign
        </button>
        <button class="button" :disabled="!functional" @click.prevent="onCancel()">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
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
        this.$parent.joinCampaign()
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
