<template>
  <section class="section">
    <div class="container">
      <div v-if="bscWallet">
        <b>Selected account</b>
        <a
          :href="$bsc.explorer + '/address/'+ bscWallet[0]"
          target="_blank"
          class="blockchain-address"
        >{{ bscWallet[0] }}</a>
        <div class="has-text-centered">
          <a class="button is-secondary is-wide" :disabled="!bscWallet" @click="login">
            Login
          </a>
        </div>
        <div class="has-text-centered mt-2">
          <a class="is-size-6  has-text-danger-dark" @click="$bsc.logout">switch wallet</a>
        </div>
      </div>
      <div v-else-if="eosWallet">
        <b>Selected account</b>
        <a
          :href="$eos.explorer + '/address/'+ eosWallet.auth.accountName"
          target="_blank"
          class="blockchain-address"
        >{{ eosWallet.auth.accountName }}</a>
        <div class="has-text-centered">
          <a class="button is-secondary is-wide" :disabled="!eosWallet" @click="login">
            Login
          </a>
        </div>
        <div class="has-text-centered mt-2">
          <a class="is-size-6  has-text-danger-dark" @click="$eos.logout">switch wallet</a>
        </div>
      </div>
      <div v-else>
        <button class="button is-primary" @click="$bsc.loginModal = true">
          Connect BSC Wallet
        </button>

        <button class="button is-primary" @click="$eos.loginModal = true">
          Connect EOS Wallet
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'login',
  middleware: ['auth'],
  auth: 'guest',
  data () {
    return {
      error: null
    }
  },
  computed: {
    bscWallet () {
      return (this.$bsc) ? this.$bsc.wallet : null
    },
    eosWallet () {
      return (this.$eos) ? this.$eos.wallet : null
    }
  },
  methods: {
    async login () {
      try {
        let address
        let blockchainPlugin
        if (this.bscWallet) {
          address = this.bscWallet[0]
          blockchainPlugin = this.$bsc
        } else if (this.eosWallet) {
          address = this.eosWallet.auth.accountName
          blockchainPlugin = this.$eos
        }
        const response1 = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND_URL}/user/login/${address}`)
        const nonce = response1.data
        const signature = await blockchainPlugin.sign(nonce)
        const response = await this.$auth.loginWith('local', {
          data:
            {
              address,
              nonce,
              signature
            }
        })
        console.log('Logged in!', response)
        // Needed because there is a redirect bug when going to a protected route from the login page
        const path = this.$auth.$storage.getUniversal('redirect') || '/'
        this.$auth.$storage.setUniversal('redirect', null)
        this.$router.push(path)
      } catch (error) {
        console.error('ERR', error)
        if (error.response && error.response.data) {
          if (error.response.data.error) {
            this.error = error.response.data.error
          } else {
            this.error = error.response.data
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = error
        }
      }
    }
  }
}
</script>
