<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <error-modal />
    <chain-status v-if="$auth && $auth.loggedIn" />
    <div class="notif-banner is-size-6">
      <div class="container">
        <div class="columns">
          <nuxt-link v-if="migrationNeeded" to="/migrate" class="column notif-quali is-half has-text-centered">
            📣 <b>Migrate your old qualifications »</b>
          </nuxt-link>
          <nuxt-link to="/security" class="column is-half has-text-centered warning">
            ⚠️ This is a beta release, know the risks »
          </nuxt-link>
        </div>
      </div>
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
    <Foot id="footer" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      loading: false,
      migrationNeeded: false // assuming the default state is that the user has not migrated their qualis.
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
    },
    ...mapState({
      assignedQualifications: state => state.qualification.assignedQualifications
    })
  },
  created () {
    if (this.$auth.user) {
      this.checkMigrationNeeded()
    }
  },
  methods: {
    async checkMigrationNeeded () {
      // Check if user has already migrated their qualifications from their old account to this account.
      // 117 Users are assigned this quali if they have migrated their account.
      this.loading = true
      const migrateQuali = 117
      await this.$store.dispatch('qualification/getAssignedQualifications')
      const qualis = [...this.assignedQualifications]

      // if not present will return false.
      const bool = qualis.some(q => migrateQuali === q.id)

      // So if not present, migration is needed.
      this.migrationNeeded = !bool
      this.loading = false
    }
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
