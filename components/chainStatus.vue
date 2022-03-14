<template>
  <div class="columns is-centered is-multiline">
    <div class="column">
        <span>
          <strong>BSC:</strong>
        </span>
        <span>
          <a
            v-if="$blockchain.bscBlockHeight !== null"
            :href="`https://bscscan.com/block/${$blockchain.bscBlockHeight - 5}`"
            target="_blank"
            rel="noopener noreferrer">
            {{ $blockchain.bscBlockHeight }}
          </a>
          <span v-else>...</span>
        </span>
    </div>
    <div class="column">
        <span>
          <strong>EOS:</strong>
        </span>
        <span>
          <a
            v-if="$blockchain.eosBlockHeight !== null"
            :href="`${$blockchain.eos.explorer}/block/${$blockchain.eosBlockHeight}`"
            target="_blank"
            rel="noopener noreferrer">
            {{ $blockchain.eosBlockHeight }}
          </a>
          <span v-else>...</span>
        </span>
    </div>
  </div>

</template>

<script>

export default {
  name: 'ChainStatus',
  data () {
    return {
      updateChainInterval: null,
      eosBlockHeight: null,
      bscBlockHeight: null
    }
  },
  created () {
    // if (!this.updateChainInterval) {
    //   this.updateChainInterval = setInterval(this.updateChainHeight(), 500)
    // }
  },
  beforeDestroy () {
    clearInterval(this.updateChainInterval)
  },
  computed: {
  },
  methods: {
    async updateChainHeight () {
      const height = await this.$blockchain.getBlockHeight().catch(console.error)
      this.eosBlockHeight = height.eos
      this.bscBlockHeight = height.bsc
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
