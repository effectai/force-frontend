<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <error-modal />
    <div class="burnerWalletBanner">
      “Effect Network is still in beta and undergoing security audits. Use at your own risk!”
    </div>
    <nav-bar />
    <div v-if="provider === 'burner-wallet'" class="burnerWalletBanner">
      Connected with a burner wallet.
      <nuxt-link to="/profile">
        Show private key
      </nuxt-link>
    </div>
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
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  },
  computed: {
    provider () {
      return this.$auth.user && this.$auth.user.provider
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
.burnerWalletBanner {
  background: $yellow;
  font-weight: bold;
  text-align: center;
}

</style>
