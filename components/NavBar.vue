<template>
  <div>
    <nav class="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item navbar-item navbar-title" to="/">
            <img @click="mobileMenu = false" src="@/assets/img/logo.svg" class="logo">
          </nuxt-link>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            :class="{'is-active': mobileMenu}"
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
              <span class="is-flex is-align-items-center is-justify-content-center"><span><b>XXX</b> EFX</span> <span class="is-size-7 pl-2">| $<b>XX,XX</b></span></span>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item" @click="mobileMenu = false">
              <div :class="{'is-fullwidth': mobileMenu}" class="mt-1 is-flex" style="position: relative">
                  <span title="Badge top right" class="badge is-danger">8</span>
                  <img src="~assets/img/icons/notification.svg" style="height: 26px" />
                <span v-if="mobileMenu">Notifications</span>
              </div>
            </div>
            <div class="navbar-item" @click="mobileMenu = false">
              <nuxt-link class="button is-text" :class="{'is-fullwidth': mobileMenu}" to="/profile" exact-active-class="is-active">
                <span class="icon">
                  <img src="~assets/img/icons/user.svg" style="height: 24px" />
                </span>
                <span v-if="mobileMenu">Profile</span>
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
    .navbar-burger {
      height: auto;
      width: 3.8rem;
    }
  }
  .navbar-menu {
    box-shadow: none;
  }
}
</style>
