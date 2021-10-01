<template>
  <section class="section">
    <h2 class="subtitle has-text-centered">
      <span v-if="$blockchain.waitForSignatureFrom">Account Switched. Re-verify Signature</span>
      <span v-else>Login to your Effect Account</span>
    </h2>
    <div v-if="loading" class="container">
      Loading..
    </div>
    <div v-else class="container">
      <div v-if="$blockchain.account">
        <div class="has-text-centered mb-2" :class="{'subtitle': $blockchain.account.blockchain === 'eos'}">
          <a
            v-if="$blockchain.account.blockchain === 'bsc'"
            :href="$blockchain.bsc.explorer + '/address/'+ $blockchain.waitForSignatureFrom ? $blockchain.waitForSignatureFrom : $blockchain.account.publicKey"
            target="_blank"
            class="blockchain-address"
          >{{ $blockchain.waitForSignatureFrom ? $blockchain.waitForSignatureFrom : $blockchain.account.publicKey }}</a>
          <a
            v-else
            :href="$blockchain.eos.explorer + '/address/'+ $blockchain.account.accountName"
            target="_blank"
            class="blockchain-address"
          >{{ $blockchain.account.accountName }}</a><span v-if="$blockchain.account.permission">@{{ $blockchain.account.permission }}</span>
        </div>
        <div style="min-height: 67px">
          <div v-if="error" class="notification is-danger">
            <button class="delete" @click="error = null" />
            {{ error }}
          </div>
          <div v-if="loadingLogin" class="is-size-7 has-text-centered">
            ..retrieving blockchain Effect Account info..
          </div>
        </div>
      </div>
      <div v-else class="columns">
        <div class="column is-half has-text-centered">
          <div class="button" style="height: auto; display:block" @click="$blockchain.loginModal = 'eos'">
            <div class="subtitle has-text-weight-semibold mb-2">
              <small class="is-size-7">connect with </small><br>EOS
            </div>
            <img src="~assets/img/providers/EOS-logo.svg" height="100">
          </div>
        </div>
        <div class="column is-half">
          <div class="button" style="height: auto; display:block" @click="$blockchain.loginModal = 'bsc'">
            <div class="subtitle has-text-weight-semibold mb-2">
              <small class="is-size-7">connect with </small><br>BSC
            </div>
            <img src="~assets/img/providers/BSC-logo.svg" height="100">
          </div>
        </div>
      </div>
      <div class="columns is-flex-direction-row-reverse is-vcentered mt-1">
        <div class="column is-4">
          <div v-if="$blockchain.waitForSignatureFrom" class="button is-secondary is-fullwidth" :class="{'is-loading': $blockchain.waitForSignature}" @click="$blockchain.switchBscAccountBeforeLogin">
            Sign
          </div>
          <div v-else-if="$blockchain.account" class="button is-secondary is-fullwidth" :class="{'is-loading': loadingLogin || existingAccount === null}" :disabled="!$blockchain.account || loadingLogin || existingAccount === null" @click="login">
            <span v-if="existingAccount">Login</span>
            <span v-else>Register</span>
          </div>
        </div>
        <div class="column is-8">
          <a v-if="$blockchain.account" class="is-size-6  has-text-danger-dark" @click="$blockchain.logout()">switch wallet</a>
          <span v-else>No wallet? <a target="_blank" class="is-size-6" href="https://medium.com/effect-ai">Create a wallet</a></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const retry = require('async-retry')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  layout: 'box',
  middleware: ['auth'],
  auth: 'guest',
  data () {
    return {
      existingAccount: null,
      error: null,
      loadingLogin: false,
      loading: false
    }
  },
  watch: {
    '$blockchain.account' (account) {
      this.existingAccount = null
      if (account) {
        this.accountExists()
      }
    }
  },
  created () {
    this.rememberLogin()
  },
  methods: {
    async rememberLogin () {
      this.loading = true
      try {
        await this.$blockchain.rememberLogin()
      } catch (e) {
        console.error('rememberLogin', e)
      }
      this.loading = false
    },
    async login () {
      this.loadingLogin = true
      if (!this.$blockchain.account) { return }
      try {
        // if account doesnt exists yet add it
        if (this.existingAccount === false) {
          await this.$blockchain.openVAccount()
          await sleep(2000)
        }
        await retry(async () => {
          await this.$auth.loginWith('blockchain', {
            account: this.$blockchain.account,
            $blockchain: this.$blockchain
          })
        }, {
          retries: 5,
          onRetry: (error, number) => {
            console.log('attempt', number, error)
          }
        })
        this.$auth.$storage.setUniversal('rememberAccount', JSON.stringify(this.$blockchain.account))
        // Needed because there is a redirect bug when going to a protected route from the login page
        const path = this.$auth.$storage.getUniversal('redirect') || '/'
        this.$auth.$storage.setUniversal('redirect', null)
        this.$router.push(path)
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
        this.handleError(error)
      }
      this.loadingLogin = false
    },
    handleError (error) {
      console.error(error)
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          this.error = error.response.data.error
        } else if (error.response.data.message) {
          this.error = error.response.data.message
        } else {
          this.error = error.response.data
        }
      } else if (error.message) {
        this.error = error.message
      } else {
        this.error = error
      }
    },
    async accountExists () {
      // check if account exists
      try {
        const vAccountRows = await this.$blockchain.getVAccountByName()
        if (vAccountRows && vAccountRows.length) {
          // account exists
          this.existingAccount = true
        } else {
          this.existingAccount = false
          // account doesnt exist
        }
      } catch (error) {
        this.handleError(error)
        alert('Cannot check if account exist, assuming it does not')
        this.existingAccount = false
      }
    }
  }
}
</script>
