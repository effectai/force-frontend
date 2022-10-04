<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <error-modal />
    <chain-status v-if="$auth && $auth.loggedIn" />
    <div class="notif-banner is-size-6">
      <div class="container">
        <div class="columns">
          <nuxt-link to="/security" class="column has-text-centered warning">
            ⚠️ This is a beta release, know the risks »
          </nuxt-link>
        </div>
      </div>
    </div>
    <nav-bar />
    <div id="content">
      <Nuxt />
    </div>
    <Foot id="footer" />
  </div>
</template>

<script>
import BscWallet from '@/components/BscWallet'
import EosWallet from '@/components/EosWallet'
import NavBar from '@/components/NavBar'
import Foot from '@/components/Footer.vue'
import ErrorModal from '@/components/ErrorModal'
import ChainStatus from '~/components/chainStatus.vue'

export default {
  components: {
    ErrorModal,
    BscWallet,
    EosWallet,
    NavBar,
    Foot,
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
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.notif-banner {
  background-color: $yellow;
  padding: 0.4rem 0;
}
</style>
<style lang="scss" scoped>
#app {
  display: flex;
  min-height: calc(100vh - 80px);
  flex-direction: column;
}
#content {
    flex-grow: 1;
}
</style>
