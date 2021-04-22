<template>
  <div>
    <nav class="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item navbar-item navbar-title" to="/">
            <img @click="mobileMenu = false" src="@/assets/img/logo.svg" class="logo">
          </nuxt-link>
          <div class="navbar-item is-hidden-desktop" style="margin-left: auto" @click="mobileMenu = false">
            <div @click="showNotifications = true" class="mt-1 is-flex notification-icon" style="position: relative">
              <span title="Badge top right" class="badge is-danger">8</span>
              <img src="~assets/img/icons/notification.svg" style="height: 26px" />
            </div>
          </div>
          <a
            role="button"
            class="navbar-burger burger ml-0"
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
            <div class="navbar-item is-hidden-mobile" @click="mobileMenu = false">
              <div @click="showNotifications = true" class="mt-1 is-flex notification-icon" style="position: relative">
                  <span title="Badge top right" class="badge is-danger">8</span>
                  <img src="~assets/img/icons/notification.svg" style="height: 26px" />
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
    <div class="drawer-backdrop" v-if="showNotifications" @click="showNotifications = false"></div>
    <aside class="drawer is-marginless" :class="{'is-active': showNotifications}">
      <header class="drawer-header">
        <p class="subtitle mb-0">
          Notifications
        </p>
        <span class="delete" @click="showNotifications = false" />
      </header>
      <notifications v-if="showNotifications" />
    </aside>
  </div>
</template>

<script>
import Notifications from '@/components/Notifications'
export default {
  components: {
    Notifications
  },

  data () {
    return {
      mobileMenu: false,
      showNotifications: false
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped>
@keyframes bellshake {
  0% { transform: rotate(0); }
  15% { transform: rotate(5deg); }
  30% { transform: rotate(-5deg); }
  45% { transform: rotate(4deg); }
  60% { transform: rotate(-4deg); }
  75% { transform: rotate(2deg); }
  85% { transform: rotate(-2deg); }
  92% { transform: rotate(1deg); }
  100% { transform: rotate(0); }
}
.notification-icon {
  cursor: pointer;
  &:hover, &:focus {
    animation: bellshake .5s cubic-bezier(.36,.07,.19,.97) both;
    transform-origin: top center;
  }
}
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
