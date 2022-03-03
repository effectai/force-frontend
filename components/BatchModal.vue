<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Create a batch.
        </p>
        <button class="delete" aria-label="close" @click.prevent="onCancel()" />
      </header>
      <section class="modal-card-body">
        <div class="content">
          It looks like you haven't created any batches yet... Let's create one!
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons is-centered mx-auto">
          <nuxt-link class="button is-primary" :to="`/campaigns/${id}/new`">
            <span class="icon">
              +
            </span>
            <span>Create Batch</span>
          </nuxt-link>
          <button class="button" @click.prevent="onCancel()">
            Cancel
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>

export default {
  name: 'BatchModal',
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      id: parseInt(this.$route.params.id)
    }
  },
  computed: {
    showModal: {
      get () {
        return this.show
      },
      set () {
        this.$emit('cancelled')
      }
    }
  },
  methods: {
    onCancel () {
      this.showModal = false
    }
  }
}
</script>
