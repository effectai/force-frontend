<template>
  <div>
    <nav class="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item navbar-item navbar-title" to="/">
            <img src="@/assets/img/logo.svg" class="logo">
          </nuxt-link>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
            @click="mobileMenu = !mobileMenu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navbar" class="navbar-menu is-align-items-center" :class="{'is-active': mobileMenu}">
          <div class="navbar-start is-justify-content-center" style="width: 100%">
            <div class="navbar-item">
              <span><b>XXX</b> EFX <small class="pl-2">($<b>XX,XX</b>)</small></span>
            </div>
          </div>
          <div class="navbar-end">
            <div @click="mobileMenu = false">
              <nuxt-link class="navbar-item" to="/profile" exact-active-class="is-active">
                Profile
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      mobileMenu: false
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 2px solid $lightblue;
  .navbar-brand {
    .logo {
      height: 45px;
      max-height: none;
    }
  }
  .navbar-menu {
  }
}
</style>
