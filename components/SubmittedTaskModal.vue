<template>
  <div v-if="campaign" class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Task Submitted
        </p>
      </header>
      <section class="modal-card-body">
        Congratulations! You've earned <b>{{ campaign.reward.quantity }}</b> by submitting this task!<br>
        Keep earning EFX by completing more tasks.
      </section>
      <footer class="modal-card-foot is-justify-content-space-between">
        <button class="button" @click.prevent="onCancel()">
          Cancel
        </button>
        <button class="button is-primary is-pulled-right" @click.prevent="onClick()">
          Next Task ->
        </button>
      </footer>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SubmittedTaskModal',
  props: {
    campaign: {
      type: Object,
      required: true,
      default () { return {} }
    },
    show: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
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
      this.showModal = false
      this.$router.push('/campaigns/' + this.campaign.id)
    },
    onClick () {
      this.$parent.reserveTask()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
