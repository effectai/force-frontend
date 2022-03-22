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
        <!-- <li v-for="(status, index) in $blockchain.relayerStatus" :key="index.head_block_num">{{ index }}: {{ status }}</li> -->
        <li :key="accountNameRelayer"> account_name: {{ accountNameRelayer }} </li>
        <!-- <li> ram_quota: {{ $blockchain.relayerStatus.ram_quota }} </li> -->
        <!-- <li> net_weight: {{ $blockchain.relayerStatus.net_weight }} </li> -->
        <!-- <li> cpu_weight: {{ $blockchain.relayerStatus.cpu_weight }} </li> -->

        <li>
          <div class="has-text-centered">
            RAM: <strong>{{ percentageRam }}%</strong>
            <br>
            {{ relayerRamUsage }} / {{ relayerRamQuota }}
          </div>
          <progress class="progress is-link" name="progress" :value="relayerRamUsage" :max="relayerRamQuota"></progress>
        </li>

        <li>
        <div class="has-text-centered">
          NET: <strong>{{ percentageNet }}%</strong></div>
        <progress class="progress is-link" :value="relayerNetUsage" :max="relayerNetQuota"></progress>
        </li>

        <li>
        <div class="has-text-centered">CPU: <strong>{{ percentageCpu }}%</strong> | {{ relayerCpuQuota }} / {{ relayerCpuQuota }} </div>
        <progress class="progress is-link" :value="relayerCpuQuota" :max="relayerCpuQuota"></progress>
        </li>
      </ul>

    </div>
  </section>
</template>

<script>
export default {
  name: 'statusPage',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {

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
    }
  }

}
</script>

<style>

</style>
