<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <error-modal />
    <chain-status v-if="$auth && $auth.loggedIn" />
    <div class="burnerWalletBanner is-size-6">
      ⚠️ <nuxt-link to="/security">
        This is a pre-release that's still undergoing security audits - use at your own risk »
      </nuxt-link>
    </div>
    <div v-if="migrationNeeded" class="burnerWalletBanner is-size-6">
      📣 <nuxt-link to="/migrate">
        Announcement: Migration from the old Force is now open »
      </nuxt-link>
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
    }
  },
  created () {
    this.checkMigrationNeeded()
  },
  methods: {
    async checkMigrationNeeded () {
      // Check if user has already migrated their qualifications from their old account to this account.
      // 117 Users are assigned this quali if they have migrated their account.
      this.loading = true
      const migrateQuali = 117
      const qualis = await this.$blockchain.getAssignedQualifications(this.$auth.user.vAccountRows[0].id)
      console.log(qualis)
      const bool = qualis.filter(q => migrateQuali === q.id)
      console.log(bool)
      this.migrationNeeded = bool
      this.loading = false
    }
  }
}
</script>
<style lang="scss">

.burnerWalletBanner {
  background: $yellow;
  text-align: center;
  @media screen and (max-width: $tablet), print {
    padding: 0.5rem;
  }
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
