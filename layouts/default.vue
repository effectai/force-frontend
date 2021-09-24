<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <nav-bar />
    <div id="content">
        <div class="container">
          <div v-if="$blockchain.error" class="notification is-danger mt-2">
            <button class="delete" @click="$blockchain.error = null" />
            {{ $blockchain.error }}
          </div>
        </div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import BscWallet from '@/components/BscWallet'
import EosWallet from '@/components/EosWallet'
import NavBar from '~/components/NavBar'
export default {
  components: {
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
