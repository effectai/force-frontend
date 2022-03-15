<template>
  <div class="modal" :class="{'is-active': messageContent != null}">
    <div class="modal-background" @click="$emit('close')" />
    <div class="modal-content p-5 has-background-info-light has-radius">
      <h3 class="subtitle is-5 has-text-centered">{{ messageTitle }}</h3>
      <!-- <input class="input" :type="input_type" name="key" :value="messageContent" readonly> -->

      <div class="field has-addons has-addons-centered is-centered">
        <div class="control is-expanded">
          <input :type="input_type" class="input" :value="messageContent" readonly>
        </div>
        <div class="control">
          <button class="button" @click="toggleInputType">
            <font-awesome-icon v-if="input_type === 'password'" icon="fa-solid fa-eye" />
            <font-awesome-icon v-else icon="fa-solid fa-eye-slash" />
          </button>
        </div>
      </div>

      <button class="button modal-close is-large" aria-label="close" @click="$emit('close')"/>
      <br>
      <div class="has-text-centered">
        <button class="button" @click="copyToClipboard(messageContent)">{{ copy_message }}</button>
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
      copy_message: 'Copy',
      input_type: 'password'
    }
  },
  methods: {
    async copyToClipboard (content) {
      await navigator.clipboard.writeText(content).catch(console.error)
      this.copy_message = 'Copied!'
      setTimeout(() => {
        this.copy_message = 'Copy'
      }, 5e3)
    },
    toggleInputType () {
      if (this.input_type === 'password') {
        this.input_type = 'text'
      } else {
        this.input_type = 'password'
      }
    }
  }
}
</script>
