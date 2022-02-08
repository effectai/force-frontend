<template>
  <div class="modal" :class="{'is-active': messageContent != null}">
    <div class="modal-background" @click="$emit('close')" />
    <div class="modal-content p-5 has-background-success has-radius has-text-white">
      <h3 class="subtitle has-text-white is-5">{{ messageTitle }}</h3>
      <p>{{ messageContent }}</p>
      <button class="modal-close is-large" aria-label="close" @click="$emit('close')"/>
      br
      <div class="has-text-right">
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
      messageContent: this.message
      // toggleState: this.toggle
    }
  }
}
</script>
