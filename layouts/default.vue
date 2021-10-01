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
  }
}
</script>
<style>
</style>
