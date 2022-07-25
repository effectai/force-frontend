<template>
  <div class="modal" :class="{'is-active': $blockchain.error}">
    <div class="modal-background" @click="$blockchain.error = null" />
    <div class="modal-content p-5 has-background-danger has-radius has-text-white">
      <h2 class="subtitle has-text-white is-3">
        Error
      </h2>
      <p>{{ $blockchain.error }}</p>
      <div v-if="checkRelayerError($blockchain.error)">
        <p>
          This error can happen when there are not enough resources available to do complete this transaction.
          Could you be so kind as to powerup the Net and Cpu for the Relayer? By going to the following link <a href="https://eospowerup.io/free" target="_blank" rel="noopener noreferrer">EosPowerUp.io</a> and filling in <strong>efxtxrelayer</strong> in EOS Account Name.
          If there isn't enough Ram, could you be so kind as to donate a bit of Ram? By going to <a href="https://www.bloks.io/wallet/ram/buy" target="_blank" rel="noopener noreferrer">bloks.io</a> and filling in <strong>efxtxrelayer</strong> as the Ram Receiver.
          Or alternativly notify us at our <a href="https://discord.gg/effectnetwork" target="_blank" rel="noopener noreferrer">Discord</a>, and we'll get on top of it ASAP.
        </p>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="$blockchain.error = null" />
      <div class="has-text-right">
        <button class="button" @click="$blockchain.error = null">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorModal',
  data () {
    return {
      relayerErrorArr: ['net', 'ram', 'cpu', 'usage', 'too high', 'relayer']
    }
  },
  methods: {
    checkRelayerError (errorString) {
      if (errorString) {
        return errorString.toString().split(' ').includes(ela => this.relayerErrorArr.includes(elb => ela === elb))
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped language="scss">
.modal {
  z-index: 100;
}
</style>
