<template>
  <div class="modal" :class="{'is-active': messageContent != null}">
    <div class="modal-background" @click="$emit('close')" />
    <div class="modal-content p-5 has-background-info has-radius has-text-white">
      <h3 class="subtitle has-text-white is-5 has-text-centered">{{ messageTitle }}</h3>
      <p>{{ messageContent }}</p>
      <button class="button modal-close is-large" aria-label="close" @click="$emit('close')"/>
      <br>
      <div class="has-text-centered">
        <button class="button" @click="copyToClipboard(messageContent)">{{ copy_message }}</button>
        <button class="button" @click="$emit('close')">OK</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      messageTitle: this.title,
      messageContent: this.message,
      copy_message: 'Copy to clipboard'
      // toggleState: this.toggle
    }
  },
  methods: {
    async copyToClipboard (content) {
      await navigator.clipboard.writeText(content).catch(console.error)
      this.copy_message = 'Copied!'
    }
  }
}
</script>
