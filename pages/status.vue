<template>
  <section class="section">
    <div class="container">
      <div class="title">
        <span>
          Relayer:
          <a
            :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.eosRelayerAccount}`"
            target="_blank"
            rel="noopener noreferrer"
            >
            {{ $blockchain.sdk.force.config.eosRelayerAccount }}
            </a>
        </span>
        <strong>-</strong>
        <strong>
          <span>
            <a
              class="tag"
              :class="relayerOk ? 'is-success' : 'is-danger'"
              :href="`${$blockchain.sdk.config.eosRelayerUrl}/status`"
              target="_blank"
              rel="noopener
              noreferrer"
            >
              {{ relayerOk ? 'Up' : 'Down' }}
            </a>
          </span>
        </strong>
      </div>

      <hr>

      <div class="block">
        <h1 class="subtitle has-text-centered">EOS Powerup</h1>
        <p class="has-text-centered px-6 mx-6">
          Please consider donating to the relayer contract to keep it running.
          <br><br>
          This will help the network to grow and become more decentralized.
          <br>
          <ul>
            <li>
                Please click <strong>Powerup Relayer</strong>.
            </li>
            <li>
                Fill in the account name: <strong>{{ $blockchain.sdk.force.config.eosRelayerAccount }}</strong>
            </li>
          </ul>

                <br>
                Thank you for your support!

                <br><br>
                <a class="button is-info" href="https://eospowerup.io/free" target="_blank" rel="noopener noreferrer">
                  Powerup Relayer
                </a>
              <br>
        </p>
      </div>

      <hr>

      <div class="block has-text-centered">
        <h1 class="subtitle">Bloks.io</h1>
        <p class="has-text-centered" px-6 mx-6>
            An alternative way to power up the relayer account is by using Bloks.io.
            <br><br>
            <ul mx-auto>
                <li>
                    Please click <strong>Powerup CPU/NET</strong> or <strong>Powerup RAM</strong>.
                </li>
                <li>
                    Fill in the account name: <strong>{{ $blockchain.sdk.force.config.eosRelayerAccount }}</strong>
                </li>
                <li>
                    Add the amount of CPU/NET or RAM you want to power up.
                </li>
                <li>
                    click on the <strong>Power Up</strong> or <strong>Buy RAM</strong> button.
                </li>
            </ul>
            <br>
            Thank you for your support!
        </p>
        <br><br>
        <div class="buttons is-centered">
            <a class="button is-info" href="https://bloks.io/wallet/powerup" target="_blank" rel="noopener noreferrer">
                Powerup CPU/NET
            </a>
            <a class="button is-info"  href="https://bloks.io/wallet/ram" target="_blank" rel="noopener noreferrer">Powerup Ram</a>
        </div>
      </div>

      <hr>

      <div class="block mx-auto mx-6 px-6 is-max-desktop">
        <h1 class="subtitle has-text-centered">Relayer Resources</h1>
        <ul>
          <li class="px-6 mx-6">
            <div class="has-text-centered">
              RAM: <strong>{{ percentageRam }}% Used</strong>
              <br>
              {{ relayerRamUsage }} / {{ relayerRamQuota }}
            </div>
            <progress class="progress is-warning" name="progress" :value="relayerRamUsage" :max="relayerRamQuota" />
          </li>
          <br>
          <li class="px-6 mx-6">
            <div class="has-text-centered">
              NET: <strong>{{ percentageNet }}% Used</strong>
              <br>
              {{ relayerNetUsage }} / {{ relayerNetQuota }}
            </div>
            <progress class="progress is-warning" :value="relayerNetUsage" :max="relayerNetQuota" />
          </li>

          <br>
          <li class="px-6 mx-6">
            <div class="has-text-centered">
              CPU: <strong>{{ percentageCpu }}% Used</strong>
              <br>
              {{ relayerCpuUsage }} / {{ relayerCpuQuota }}
            </div>
            <progress class="progress is-warning" :value="relayerCpuUsage" :max="relayerCpuQuota" />
          </li>
        </ul>
      </div>

      <hr>

      <div class="block">
        <h1 class="subtitle has-text-centered">Relayer Estimates</h1>
        <table class="table has-text-centered mx-auto">
          <thead>
            <th>Action</th>
            <th>Net</th>
            <th>Cpu</th>
            <th>Estimate</th>
          </thead>
          <tbody>
            <tr v-for="(tx, action) in relayerTxCost" :key="action">
              <td>{{ action }}</td>
              <td>{{ tx.net }}</td>
              <td>{{ tx.cpu }}</td>
              <td>{{ txEstimate(tx) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import { defaultConfiguration } from '@effectai/effect-js'
const defaultConfig = defaultConfiguration(process.env.NUXT_ENV_SDK_ENV)
delete defaultConfig.web3

export default {
  name: 'StatusPage',
  middleware: ['auth'],
  data () {
    return {
      config: defaultConfig,
      relayerOk: false,
      relayerTxCost: {
        joincampaign: { net: 47, cpu: 434 },
        mkbatch: { net: 66, cpu: 817 },
        mkcampaign: { net: 33, cpu: 240 },
        reclaimtask: { net: 184, cpu: 358 },
        releasetask: { net: 184, cpu: 184 },
        reservetask: { net: 296, cpu: 253 },
        submittask: { net: 248, cpu: 269 }
        // closebatch: { net: 0, cpu: 0 },
        // editcampaign: { net: 0, cpu: 0 },
        // init: { net: 0, cpu: 0 },
        // payout: { net: 0, cpu: 0 },
        // publishbatch { net: 0, cpu: 0 },
        // rmbatch: { net: 0, cpu: 0 },
        // rmcampaign: { net: 0, cpu: 0 },
      }
    }
  },

  computed: {
    ...mapState({
      advanced: state => state.view.advanced
    }),
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

  },
  created () {
    this.pingRelayer()
  },
  methods: {
    toggleAdvanced () {
      this.$store.commit('view/SET_ADVANCED_VIEW', !this.advanced)
    },
    async pingRelayer () {
      const response = await fetch(`${this.$blockchain.sdk.config.eosRelayerUrl}/info`, { mode: 'cors' }).catch(console.error)
      this.relayerOk = response.ok
    },

    /**
     * Return the estimated amount of times a give action can be taken before resources for the relayer run out.
     * @param tx txObject that represent an Action such as reserveTask.
     */
    txEstimate (tx) {
      const cpuEstimate = (this.relayerCpuQuota - this.relayerCpuUsage) / tx.cpu
      const netEstimate = (this.relayerNetQuota - this.relayerNetUsage) / tx.net
      return Math.min(cpuEstimate, netEstimate).toFixed(0)
    }

  }

}
</script>

<style>

</style>
