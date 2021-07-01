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
      <div v-else>
        <button class="button is-primary" @click="$bsc.loginModal = true">
          Connect BSC Wallet
        </button>
      </div>
    </div>
    {{ $route.path }}
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
    }
  },
  methods: {
    async login () {
      try {
        const response1 = await this.$axios.get(`${process.env.NUXT_ENV_AUTH_SERVER}/user/login/${this.bscWallet[0]}`)
        const nonce = response1.data
        const signature = await this.$bsc.sign(nonce)
        const response = await this.$auth.loginWith('local', {
          data:
            {
              address: this.bscWallet[0],
              nonce,
              signature
            }
        })
        console.log('Logged in!', response)
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
