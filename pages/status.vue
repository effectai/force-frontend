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
        <li> account_name: {{ $blockchain.relayerStatus.account_name }} </li>
        <!-- <li> ram_quota: {{ $blockchain.relayerStatus.ram_quota }} </li> -->
        <!-- <li> net_weight: {{ $blockchain.relayerStatus.net_weight }} </li> -->
        <!-- <li> cpu_weight: {{ $blockchain.relayerStatus.cpu_weight }} </li> -->

        <li>
        <div class="has-text-centered">RAM: <strong>{{ percentageRam }}%</strong> | {{ $blockchain.relayerStatus.ram_usage }} / {{ $blockchain.relayerStatus.ram_quota }} </div>
        <progress class="progress is-link" name="progress" :value="$blockchain.relayerStatus.ram_usage" :max="$blockchain.relayerStatus.ram_quota"></progress>
        </li>

        <li>
        <div class="has-text-centered">NET: <strong>{{ percentageNet }}%</strong> | {{ $blockchain.relayerStatus.net_limit.used }} / {{ $blockchain.relayerStatus.net_limit.max }} </div>
        <progress class="progress is-link" :value="$blockchain.relayerStatus.net_limit.used" :max="$blockchain.relayerStatus.net_limit.max"></progress>
        </li>

        <li>
        <div class="has-text-centered">CPU: <strong>{{ percentageCpu }}%</strong> | {{ $blockchain.relayerStatus.cpu_limit.used }} / {{ $blockchain.relayerStatus.cpu_limit.max }} </div>
        <progress class="progress is-link" :value="$blockchain.relayerStatus.cpu_limit.used" :max="$blockchain.relayerStatus.cpu_limit.max"></progress>
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
    percentageRam () {
      if (this.$blockchain) {
        return parseInt(this.$blockchain.relayerStatus.ram_usage / this.$blockchain.relayerStatus.ram_quota * 100, 10) ?? 0
      } else {
        return 0
      }
    },

    percentageNet () {
      if (this.$blockchain) {
        return parseInt(this.$blockchain.relayerStatus.net_limit.used / this.$blockchain.relayerStatus.net_limit.max * 100, 10) ?? 0
      } else {
        return 0
      }
    },

    percentageCpu () {
      if (this.$blockchain) {
        return parseInt(this.$blockchain.relayerStatus.cpu_limit.used / this.$blockchain.relayerStatus.cpu_limit.max * 100, 10) ?? 0
      } else {
        return 0
      }
    }
  }

}
</script>

<style>

</style>
