<template>
  <div id="app">
    <nav-bar />
    <div id="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'
export default {
  components: {
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
