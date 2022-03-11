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
              <button v-if="$auth.loggedIn" class="button balance-btn is-white is-flex is-align-items-center is-justify-content-center" :class="{'is-fullwidth': mobileMenu}" exact-active-class="is-active">
                <span><b>{{ ($blockchain.efxTotal !== null ? $blockchain.efxTotal.toFixed(2) : '...') }}</b><span v-if="$blockchain.efxLoading">..</span> <span class="has-text-weight-light">EFX</span></span>
                <span v-if="$blockchain.efxTotal !== null && $blockchain.efxPrice" class="pl-2"> <span class="has-text-weight-light">$</span><b>{{ ($blockchain.efxTotal * $blockchain.efxPrice).toFixed(2) }}</b></span>
              </button>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item is-hidden-touch" @click="mobileMenu = false">
              <div class="mt-1 is-flex notification-icon" style="position: relative" @click="showNotifications = true">
                <span v-if="newNotifications" title="Badge top right" class="badge is-danger">{{ newNotifications }}</span>
                <img src="~assets/img/icons/notification.svg" style="height: 26px">
              </div>
            </div>
            <div class="navbar-item is-hidden-mobile" @click="mobileMenu = false, showUserModal = !showUserModal">
              <button :key="$auth.user ? $auth.user.vAccountRows[0].id : null" class="button is-white" :class="{'is-fullwidth': mobileMenu}" exact-active-class="is-active">
                <span class="icon">
                  <img src="~assets/img/icons/user.svg" style="height: 24px">
                </span>
              </button>
            </div>
            <div class="navbar-item is-hidden-desktop">
              <nuxt-link :key="$auth.user ? $auth.user.vAccountRows[0].id : null" to="/profile" class="button is-white" :class="{'is-fullwidth': mobileMenu}" exact-active-class="is-active">
                <span class="icon">
                  <img src="~assets/img/icons/user.svg" style="height: 24px">
                </span>
                <span v-if="mobileMenu">Profile</span>
              </nuxt-link>
            </div>
            <div class="navbar-item is-hidden-desktop" @click="logout">
              <button :key="$auth.user ? $auth.user.vAccountRows[0].id : null" class="button is-white" :class="{'is-fullwidth': mobileMenu}" exact-active-class="is-active">
                <span class="icon">
                  <img src="~assets/img/icons/logout.svg" style="height: 24px">
                </span>
                <span v-if="mobileMenu">Logout</span>
              </button>
            </div>
            <!--- User Modal -->
            <div class="modal user-modal is-hidden-touch" :class="{ 'is-active': showUserModal }" tabindex="0" @focusout="showUserModal = false">
              <div class="modal-card">
                <div class="arrow-up" />
                <section class="modal-card-body has-shadow">
                  <ul>
                    <li>
                      <nuxt-link to="/profile">
                        <span class="icon">
                          <img src="~assets/img/icons/user.svg" style="height: 20px">
                        </span>
                        View Profile
                      </nuxt-link>
                    </li>
                    <!-- <li>
                      <span class="icon">
                        <img src="~assets/img/icons/settings.svg" style="height: 22px">
                      </span>
                      Settings
                    </li> -->
                    <li class="logout" @click="logout">
                      <span class="icon">
                        <img src="~assets/img/icons/logout.svg" style="height: 22px">
                      </span>
                      Logout
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!--- Balance Modal -->
    <div class="modal balance-modal" :class="{ 'is-active': showBalanceModal }">
      <div class="modal-background" @click="showBalanceModal = false" />
      <div class="modal-card">
        <div class="arrow-up" />
        <section class="modal-card-body">
          <div class="content">
            <div class="columns is-multiline">
              <div class="box">
                <p class="is-size-7">
                  Total Balance
                </p>
                <span to="/balance" class="is-flex is-align-items-center">
                  <span><b>{{ ($blockchain.efxTotal !== null ? $blockchain.efxTotal.toFixed(2) : '...') }}<span v-if="$blockchain.efxLoading">..</span> EFX</b></span>
                </span>
              </div>
              <div class="box">
                <p class="is-size-7">
                  vAccount Contract Balance
                </p>
                <b>
                  <span v-if="$blockchain.vefxAvailable !== null">{{ $blockchain.vefxAvailable.toFixed(2) }}</span>
                  <span v-else>.....</span><span>  EFX</span>
                </b>
              </div>
              <div class="box">
                <p class="is-size-7">
                  Pending Tasks
                </p>
                <b><span v-if="$blockchain.efxPending !== null">{{ $blockchain.efxPending.toFixed(2) }}</span><span v-else>.....</span><span>  EFX</span></b>
              </div>
              <div class="box">
                <p class="is-size-7">
                  Wallet
                </p>
                <b>
                  <span v-if="$blockchain.efxAvailable !== null">{{ $blockchain.efxAvailable.toFixed(2) }}</span>
                  <span v-else>.....</span><span>  EFX</span>
                </b>
              </div>
            </div>
            <div class="columns">
              <div class="column is-4 is-flex is-justify-content-center">
                <button v-if="$blockchain.efxAvailable !== null && $blockchain.efxPayout != 0" :class="{'is-loading': loading === true}" class="button is-secondary is-pulsing" @click.prevent="payout()">
                  <p v-if="!loading">
                    Cash out <span>{{ $blockchain.efxPayout.toFixed(2) }} EFX!</span>
                  </p>
                </button>
                <button v-else-if="$blockchain.efxPayout == 0" disabled="disabled" class="button is-secondary is-wide">
                  <p class="is-size-7">
                    Nothing to cash out
                  </p>
                </button>
                <button v-else disabled="disabled" class="button is-secondary">
                  <p>... EFX</p>
                </button>
              </div>
              <div class="column is-4">
                <nuxt-link to="/deposit" class="button is-primary is-wide">
                  Deposit
                </nuxt-link>
              </div>
              <div class="column is-4">
                <nuxt-link to="/withdraw" class="button is-wide is-primary is-outlined">
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
    <!-- SuccessModal -->
    <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
  </div>
</template>

<script>
import Notifications from '@/components/Notifications'
import SuccessModal from '@/components/SuccessModal'
export default {
  components: {
    Notifications,
    SuccessModal
  },

  data () {
    return {
      mobileMenu: false,
      newNotifications: null,
      showNotifications: false,
      showBalanceModal: false,
      showUserModal: false,

      pending: 0,
      finalAmount: 0,
      loading: false,
      successMessage: null,
      successTitle: null,
      errors: []
    }
  },

  watch: {
    $route () {
      this.showUserModal = false
    }
  },
  created () {
    if (this.$auth.loggedIn) {
      this.countNewNotifications()
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    },
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
    },
    async payout () {
      this.loading = true
      try {
        const result = await this.$blockchain.payout()
        this.$store.dispatch('transaction/addTransaction', result)
        this.$store.dispatch('pendingPayout/loadPendingPayouts')
        this.transactionUrl = process.env.NUXT_ENV_EOS_EXPLORER_URL + '/transaction/' + result.transaction_id
        this.successTitle = 'Payout Completed'
        this.successMessage = 'All your available pending payouts have been completed and are added to your Effect account'
      } catch (error) {
        this.loading = false
        this.errors.push(error)
      }
      this.loading = false
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
  .balance-btn {
    color: #81889D;
  }
}
.modal-background {
  background: #101D56;
  opacity: .7;
}
.balance-modal {
  backdrop-filter: blur(2px);
  .modal-card {
  .balance-item {
    padding: 0.75rem;
  }
  .button {
    width: 100%;
  }
}
}

.balance-modal .modal-card, .user-modal .modal-card {
  position: absolute;
  top: $navbar-height;
  .arrow-up {
    filter: drop-shadow(0px -3px 3px rgba(129, 136, 157, 0.1));
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #fff;
  }

  .modal-card-body {
    border-radius: 8px;
  }

  .box {
    background: #F7FBFF;
    box-shadow: none;
    padding: 6px 8px;
    margin: 0.7rem;
    margin-bottom: 15px !important;
    p {
      font-size: 14px;
      margin-bottom: 0px;
    }
  }
}
.navbar-end {
  position: relative;
}
.user-modal {
  width: 170px;
  z-index: -1;
  position: absolute;
  overflow: visible;
  li {
    color: #6C7786;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    border-bottom: 1px solid #F1F5FA;
    display: block;
    width: 100%;
    cursor: pointer;
    span {
      margin-right: 10px;
    }
    a, &.logout {
      padding: 16px 20px;
    }
    &:last-child {
      display: flex;
      border-bottom: none;
    }
    &:hover {
      background-color: rgba(129, 136, 157, 0.1);
    }
  }
  .modal-card {
    overflow: visible;
    top: calc(5rem - 25px);
    right: 5px;
    border-radius: 11px;

    a {
      display: flex;
      color: #6C7786;
    }

    .modal-card-body {
      box-shadow: 0px 10px 32px 7px rgb(129 136 157 / 20%);
      padding: 0px 0;
    }
  }
}
</style>
