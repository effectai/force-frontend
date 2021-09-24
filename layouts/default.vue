<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <error-modal />
    <nav-bar />
    <div id="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import BscWallet from '@/components/BscWallet'
import EosWallet from '@/components/EosWallet'
import NavBar from '@/components/NavBar'
import ErrorModal from '@/components/ErrorModal'
export default {
  components: {
    ErrorModal,
    BscWallet,
    EosWallet,
    NavBar
  },
  data () {
    return {
      refreshInterval: null
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  },
  created () {
    if (!this.refreshInterval) {
      this.refreshInterval = setInterval(() => {
        console.log('refreshing user..')
        if (this.$auth.loggedIn) {
          this.$auth.fetchUser()
        }
      }, parseInt(process.env.NUXT_ENV_BLOCKCHAIN_UPDATE_RATE, 10))
    }
  },
  beforeDestroy () {
    clearInterval(this.refreshInterval)
  }
}
</script>
<style>
</style>
