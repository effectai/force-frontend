<template>
  <div class="columns is-centered is-multiline">
    <div class="column">
        <span>
          <strong>BSC:</strong>
        </span>
        <span>
          <a
            v-if="bscBlockHeight !== null"
            :href="`${$blockchain.bsc.explorer}/block/${bscBlockHeight - 5}`"
            target="_blank"
            rel="noopener noreferrer">
            {{ bscBlockHeight }}
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
            v-if="eosBlockHeight !== null"
            :href="`${$blockchain.eos.explorer}/block/${eosBlockHeight}`"
            target="_blank"
            rel="noopener noreferrer">
            {{ eosBlockHeight }}
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
    if (!this.updateChainInterval) {
      this.updateChainInterval = setInterval(() => this.updateChainHeight(), 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.updateChainInterval)
  },
  computed: {
  },
  methods: {
    async updateChainHeight () {
      const height = await this.$blockchain.getBlockHeight().catch(error => console.log('Error chainstatus', error))
      console.log(height)
      this.eosBlockHeight = height.eos
      this.bscBlockHeight = height.bsc
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
