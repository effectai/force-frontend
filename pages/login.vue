<template>
  <section class="section">
    <h2 class="subtitle has-text-centered">
      Login to your Effect Account
    </h2>
    <div class="container">
      <div v-if="bscWallet" class="has-text-centered">
        <a
          :href="$bsc.explorer + '/address/'+ bscWallet[0]"
          target="_blank"
          class="blockchain-address"
        >{{ bscWallet[0] }}</a>
      </div>
      <div v-else-if="eosWallet" class="has-text-centered subtitle">
        <a
          :href="$eos.explorer + '/address/'+ eosWallet.auth.accountName"
          target="_blank"
          class="blockchain-address"
        >{{ eosWallet.auth.accountName }}</a>
      </div>
      <div v-else class="columns">
        <div class="column is-half has-text-centered">
          <div class="button" style="height: auto; display:block" @click="$eos.loginModal = true">
            <div class="subtitle has-text-weight-semibold mb-2">
              <small>with </small> EOS
            </div>
            <img src="~assets/img/providers/EOS-logo.svg" height="100">
          </div>
        </div>
        <div class="column is-half">
          <div class="button" style="height: auto; display:block" @click="$bsc.loginModal = true">
            <div class="subtitle has-text-weight-semibold mb-2">
              <small>with </small> BSC
            </div>
            <img src="~assets/img/providers/BSC-logo.svg" height="100">
          </div>
        </div>
      </div>
      <div class="columns is-flex-direction-row-reverse is-vcentered mt-5">
        <div class="column is-4">
          <div class="button is-secondary is-fullwidth" :disabled="!bscWallet && !eosWallet" @click="login">
            Login
          </div>
        </div>
        <div class="column is-8">
          <a v-if="eosWallet || bscWallet" class="is-size-6  has-text-danger-dark" @click="$bsc.logout(); $eos.logout()">switch wallet</a>
          <small v-else>
            No Account?
            <nuxt-link to="/register">
              Create Effect Account
            </nuxt-link>
          </small>
        </div>
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
  mounted () {
    this.$eos.rememberLogin()
    this.$bsc.rememberLogin()
  },
  methods: {
    async login () {
      if (!this.bscWallet && !this.eosWallet) { return }
      try {
        await this.$auth.loginWith('blockchain', {
          account: {
            eos:
            this.eosWallet ? this.eosWallet.auth : null,
            bsc:
              this.bscWallet ? this.bscWallet[0] : null
          }
        })
        // Needed because there is a redirect bug when going to a protected route from the login page
        const path = this.$auth.$storage.getUniversal('redirect') || '/'
        this.$auth.$storage.setUniversal('redirect', null)
        this.$router.push(path)
        // let address
        // let blockchainPlugin
        // if (this.bscWallet) {
        //   address = this.bscWallet[0]
        //   blockchainPlugin = this.$bsc
        // } else if (this.eosWallet) {
        //   address = this.eosWallet.auth.accountName
        //   blockchainPlugin = this.$eos
        // }
        // const response1 = await this.$axios.get(`${process.env.NUXT_ENV_BACKEND_URL}/user/login/${address}`)
        // const nonce = response1.data
        // const signature = await blockchainPlugin.sign(nonce)
        // const response = await this.$auth.loginWith('local', {
        //   data:
        //     {
        //       address,
        //       nonce,
        //       signature
        //     }
        // })
        // console.log('Logged in!', response)
        // // Needed because there is a redirect bug when going to a protected route from the login page
        // const path = this.$auth.$storage.getUniversal('redirect') || '/'
        // this.$auth.$storage.setUniversal('redirect', null)
        // this.$router.push(path)
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
