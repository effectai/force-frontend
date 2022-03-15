<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <error-modal />
    <chain-status v-if="$auth && $auth.loggedIn" />
    <div class="burnerWalletBanner is-size-6">
      ⚠️ <nuxt-link to="/security">This is a pre-release that's still undergoing security audits - use at your own risk »</nuxt-link>
    </div>
    <nav-bar />
    <!-- <div v-if="provider === 'burner-wallet'" class="burnerWalletBanner">
      Connected with a burner wallet.
      <nuxt-link to="/profile">
        Show private key
      </nuxt-link>
    </div> -->
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
import ChainStatus from '~/components/chainStatus.vue'

export default {
  components: {
    ErrorModal,
    BscWallet,
    EosWallet,
    NavBar,
    ChainStatus
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
  text-align: center;
  @media screen and (max-width: $tablet), print {
    padding: 0.5rem;
  }
}

</style>
