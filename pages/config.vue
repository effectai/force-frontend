<template>
  <section class="section">
    <div class="container">
      <div class="title">
        <span>
          Effect Network Configuration:
        </span>
        <strong>
          <span>
            <a
              class="tag"
              :class="relayerOk ? 'is-success' : 'is-danger'"
              :href="`${$blockchain.sdk.config.eosNodeUrl}`"
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
      <div>
        <table class="table mx-auto">
          <thead>
            <th>Configuration</th>
            <th>Values</th>
          </thead>
          <tbody>
            <tr v-for="(val, prop) in config" :key="val">
              <td>{{ prop }}</td>
              <td>{{ val }}</td>
            </tr>
            <tr>
              <td>advanced</td>
              <td>
                <span class="is-clickable" @click="toggleAdvanced">{{ advanced }}</span>
              </td>
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
      relayerOk: false
    }
  },

  computed: {
    ...mapState({
      advanced: state => state.view.advanced
    })
  },
  created () {
    this.pingEosNetwork()
  },
  methods: {
    toggleAdvanced () {
      this.$store.commit('view/SET_ADVANCED_VIEW', !this.advanced)
    },
    async pingEosNetwork () {
      const response = await fetch(`${this.$blockchain.sdk.config.eosNodeUrl}`, { mode: 'cors' }).catch(console.error)
      console.log(response)
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
