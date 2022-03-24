<template>
  <section class="section">
    <div class="container">
      <div class="title">
        Status Page
      </div>

      <hr>
      <div class="subtitle">

        <span>Relayer:</span> <a
          :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.eos_relayer}`"
         target="_blank"
         rel="noopener noreferrer">{{ $blockchain.sdk.force.config.eos_relayer }}</a>
      </div>
      <ul>
        <li>
          <span>Status:</span>
          <strong><span>{{ this.relayerOk ? 'Up' : 'Down' }}</span></strong>
        </li>

        <li>
          <a :href="`${$blockchain.sdk.config.eos_relayer_url}/status`" target="_blank" rel="noopener noreferrer">{{ $blockchain.sdk.config.eos_relayer_url }}</a>
        </li>
        <br>
        <li>
          <div class="has-text-centered">
            RAM: <strong>{{ percentageRam }}%</strong>
            <br>
            {{ relayerRamUsage }} / {{ relayerRamQuota }}
          </div>
          <progress class="progress is-link" name="progress" :value="relayerRamUsage" :max="relayerRamQuota"></progress>
        </li>
        <br>
        <li>
        <div class="has-text-centered">
          NET: <strong>{{ percentageNet }}%</strong>
          <br>
          {{ relayerNetUsage }} / {{ relayerNetQuota }}
        </div>
        <progress class="progress is-link" :value="relayerNetUsage" :max="relayerNetQuota"></progress>
        </li>

        <br>
        <li>
        <div class="has-text-centered">
          CPU: <strong>{{ percentageCpu }}%</strong>
          <br>
          {{ relayerCpuQuota }} / {{ relayerCpuQuota }}
        </div>
        <progress class="progress is-link" :value="relayerCpuQuota" :max="relayerCpuQuota"></progress>
        </li>

        <br>

        <li>
          <button class="button is-primary">
            <a href="https://eospowerup.io/auto" target="_blank" rel="noopener noreferrer">
              Power Up Relayer
            </a>
          </button>
        </li>

        <li v-for="tx in $blockchain.relayerTxs" :key="tx"></li>
      </ul>

    </div>
  </section>
</template>

<script>
export default {
  name: 'statusPage',
  data () {
    return {
      relayerOk: false
    }
  },
  created () {
    this.pingRelayer()
    this.getRelayerTxs()
  },
  methods: {

    async pingRelayer () {
      const response = await fetch(`${this.$blockchain.sdk.config.eos_relayer_url}/info`, {
        mode: 'cors'
      }).catch(console.error)
      this.relayerOk = response.ok
    },

    async getRelayerTxs () {
      const response = await this.$blockchain.getRelayerTxs().catch(console.error)
      console.log(response)
      return response
    }

  },

  computed: {

    relayer () {
      return this.$blockchain ? this.$blockchain.relayerStatus : null
    },

    accountNameRelayer () {
      return this.$blockchain.relayerStatus ? this.$blockchain.relayerStatus.account_name : '...'
    },

    relayerRamUsage () {
      return this.$blockchain.relayerStatus ? this.$blockchain.relayerStatus.ram_usage : 0
    },

    relayerRamQuota () {
      return this.$blockchain.relayerStatus ? this.$blockchain.relayerStatus.ram_quota : 0
    },

    relayerNetUsage () {
      return this.$blockchain.relayerStatus ? this.$blockchain.relayerStatus.net_limit.used : 0
    },

    relayerNetQuota () {
      return this.$blockchain.relayerStatus ? this.$blockchain.relayerStatus.net_limit.max : 0
    },

    relayerCpuUsage () {
      return this.$blockchain.relayerStatus ? this.$blockchain.relayerStatus.cpu_limit.used : 0
    },

    relayerCpuQuota () {
      return this.$blockchain.relayerStatus ? this.$blockchain.relayerStatus.cpu_limit.max : 0
    },

    percentageRam () {
      return this.$blockchain.relayerStatus ? parseInt(this.$blockchain.relayerStatus.ram_usage / this.$blockchain.relayerStatus.ram_quota * 100, 10) : 0
    },

    percentageNet () {
      return this.$blockchain.relayerStatus ? parseInt(this.$blockchain.relayerStatus.net_limit.used / this.$blockchain.relayerStatus.net_limit.max * 100, 10) : 0
    },

    percentageCpu () {
      return this.$blockchain.relayerStatus ? parseInt(this.$blockchain.relayerStatus.cpu_limit.used / this.$blockchain.relayerStatus.cpu_limit.max * 100, 10) : 0
    },

    relayerTxs () {
      return this.$blockchain.relayerTxs ? this.$blockchain.relayerTxs : []
    }
  }

}
</script>

<style>

</style>
