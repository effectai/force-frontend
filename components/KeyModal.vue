<template>
  <div class="modal" :class="{'is-active': messageContent != null}">
    <div class="modal-background" @click="$emit('close')" />
    <div class="modal-content p-5 has-background-info-light has-radius">
      <h3 class="subtitle is-5 has-text-centered">
        {{ messageTitle }}
      </h3>

      <div class="field has-addons has-addons-centered is-centered">
        <div class="control has-icons-right has-icons-left is-expanded">
          <input class="input " :type="password_hidden ? 'password' : 'text'" :value="messageContent" readonly>
          <span class="p-2 icon is-left is-clickable has-tooltip-arrow has-tooltip-fade unselectable" :data-tooltip="visibility_message" @click.prevent="togglePasswordVisibility()" @mouseout="visibility_message = 'Toggle visibility'">
            <font-awesome-icon v-if="password_hidden" class="mx-2 is-small unselectable" icon="fa-solid fa-eye" />
            <font-awesome-icon v-else class="mx-2 is-small unselectable" icon="fa-solid fa-eye-slash" />
          </span>
          <span class="p-2 icon is-right is-clickable has-tooltip-arrow has-tooltip-fade unselectable" :data-tooltip="copy_message" @click.prevent="copyToClipboard(messageContent)" @mouseout="copy_message = 'Copy'">
            <!-- <img src="~assets/img/icons/copy.svg" class=".unselectable" alt="Copy"> -->
            <font-awesome-icon v-if="copy_state" class=" is-small" icon="fa-solid fa-copy" />
            <font-awesome-icon v-else icon="fa-solid fa-square-check" />
          </span>
        </div>
      </div>

      <button class="button modal-close is-large" aria-label="close" @click="$emit('close')" />
      <br>
      <div class="has-text-centered">
        <button class="button" @click="$emit('close')">
          Close
        </button>
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
      copy_state: true,
      input_type: 'password',
      password_hidden: true

    }
  },
  methods: {
    async copyToClipboard (content) {
      await navigator.clipboard.writeText(content).catch(console.error)
      this.copy_message = 'Copied!'
      this.copy_state = false
      setTimeout(() => {
        this.copy_message = 'Copy'
        this.copy_state = true
      }, 5e3)
    },
    togglePasswordVisibility () {
      this.password_hidden = !this.password_hidden
    }
  }
}
</script>
