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
  head () {
    return {
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  }
}
</script>
<style>
</style>
