<template>
  <div>
    <nav class="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item navbar-item navbar-title" @click="onLogo">
            <img src="@/assets/img/logo.svg" class="logo" @click="mobileMenu = false">
          </a>
          <div class="navbar-item is-hidden-desktop" style="margin-left: auto" @click="mobileMenu = false">
            <div class="mt-1 is-flex notification-icon" style="position: relative" @click="showNotifications = true">
              <span v-if="newNotifications" title="Badge top right" class="badge is-danger">{{ newNotifications }}</span>
              <img src="~assets/img/icons/notification.svg" style="height: 26px">
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
            <div class="navbar-item" @click="mobileMenu = false, showBalanceModal = true">
              <nuxt-link v-if="$auth.loggedIn" to="/balance" class="button is-white is-flex is-align-items-center is-justify-content-center" :class="{'is-fullwidth': mobileMenu}" exact-active-class="is-active">
                <span><b>{{ ($blockchain.efxTotal !== null ? $blockchain.efxTotal.toFixed(2) : '...') }}</b><span v-if="$blockchain.efxLoading">..</span> EFX</span>
                <span v-if="$blockchain.efxTotal !== null && $blockchain.efxPrice" class="is-size-7 pl-2">| $<b>{{ ($blockchain.efxTotal * $blockchain.efxPrice).toFixed(2) }}</b></span>
              </nuxt-link>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item is-hidden-touch" @click="mobileMenu = false">
              <div class="mt-1 is-flex notification-icon" style="position: relative" @click="showNotifications = true">
                <span v-if="newNotifications" title="Badge top right" class="badge is-danger">{{ newNotifications }}</span>
                <img src="~assets/img/icons/notification.svg" style="height: 26px">
              </div>
            </div>
            <div class="navbar-item" @click="mobileMenu = false">
              <nuxt-link :key="$auth.user ? $auth.user.vAccountRows[0].id : null" class="button is-white" :class="{'is-fullwidth': mobileMenu}" to="/profile" exact-active-class="is-active">
                <span class="icon">
                  <img src="~assets/img/icons/user.svg" style="height: 24px">
                </span>
                <span v-if="mobileMenu">Profile</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="modal balance-modal" :class="{ 'is-active': showBalanceModal }">
      <div class="modal-background" @click="showBalanceModal = false"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="content">
            <div class="columns is-multiline">
              <div class="column">
                <div class="box">
                  <p>
                    Total Balance
                  </p>
                  <span to="/balance" class="is-flex is-align-items-center">
                    <span><b>{{ ($blockchain.efxTotal !== null ? $blockchain.efxTotal.toFixed(2) : '...') }}<span v-if="$blockchain.efxLoading">..</span> EFX</b></span>
                  </span>
                </div>
              </div>
              <div class="column">
                <div class="box">
                  <p>
                    Pending Tasks
                  </p>
                  <b><span v-if="$blockchain.efxPending !== null">{{ $blockchain.efxPending.toFixed(2) }}</span><span v-else>.....</span><span>  EFX</span></b>
                </div>
              </div>
              <div class="column">
                <div class="box">
                  <p>
                    vAccount Contract Balance
                  </p>
                  <b>
                    <span v-if="$blockchain.vefxAvailable !== null">{{ $blockchain.vefxAvailable.toFixed(2) }}</span>
                    <span v-else>.....</span><span>  EFX</span>
                  </b>
                </div>
              </div>
              <div class="column">
                <div class="box">
                  <p>
                    Wallet
                  </p>
                  <b>
                    <span v-if="$blockchain.efxAvailable !== null">{{ $blockchain.efxAvailable.toFixed(2) }}</span>
                    <span v-else>.....</span><span>  EFX</span>
                  </b>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-4">
                <nuxt-link to="/deposit" class="button is-primary is-pulled-left is-wider">
                  Deposit
                </nuxt-link>
              </div>
              <div class="column is-4 is-flex is-justify-content-center">
                <button v-if="$blockchain.efxAvailable !== null && $blockchain.efxPayout != 0" :class="{'is-loading': loading === true}" class="button is-medium is-primary is-pulsing" @click.prevent="payout()">
                  <p v-if="!loading">Cash in <span>{{ $blockchain.efxPayout.toFixed(2) }} EFX!</span></p>
                </button>
                <button v-else-if="$blockchain.efxPayout == 0" disabled="disabled" class="button is-medium is-primary">
                  <p>Nothing to cash in..</p>
                </button>
                <button v-else disabled="disabled" class="button is-medium is-primary">
                  <p>... EFX</p>
                </button>
              </div>
              <div class="column is-4">
                <nuxt-link to="/withdraw" class="button is-wider is-primary is-outlined is-pulled-right">
                  Withdraw
                </nuxt-link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div v-if="showNotifications" class="drawer-backdrop" @click="showNotifications = false" />
    <aside class="drawer is-marginless" :class="{'is-active': showNotifications}">
      <header class="drawer-header">
        <p class="subtitle mb-0">
          Notifications
        </p>
        <span class="delete" @click="showNotifications = false" />
      </header>
      <notifications v-if="showNotifications" @get-notifications="countNewNotifications" />
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
      newNotifications: null,
      showNotifications: false,
      showBalanceModal: false
    }
  },

  created () {
    if (this.$auth.loggedIn) {
      this.countNewNotifications()
    }
  },

  methods: {
    async countNewNotifications () {
      try {
        const response = await this.$axios.$get(process.env.NUXT_ENV_BACKEND_URL + '/user/notifications/new')
        this.newNotifications = +response.newNotifications
      } catch (error) {
        console.error('Could not get notifications count', error) // eslint-disable-line no-console
      }
    },
    onLogo () {
      if (this.$route.path === '/') {
        location.reload()
      } else {
        this.$router.push('/')
      }
    }
  }
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
.balance-modal .modal-card {
  border-radius: 8px;
  position: absolute;
  top: 65px;
  width: auto !important;

  .box {
    background: #F7FBFF;
    box-shadow: none;
    padding: 6px 8px;
    p {
      font-size: 14px;
      margin-bottom: 0px;
    }
  }
}
</style>
