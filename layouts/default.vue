<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <error-modal />
    <div style="position: fixed; bottom:5px; left:5px; z-index:2;">
      <div v-if="!allCampaignsLoaded" class="notification has-border">
        <span :class="{ 'loading-text': campaignsLoading }">Campaigns loading: {{ campaigns ? campaigns.length : 0
        }}</span>
      </div>
      <div v-else-if="campaignsLoading" class="notification has-border">
        <span class="loading-text">Refreshing {{ campaigns.length }} campaigns</span>
      </div>
      <div v-if="!allBatchesLoaded" class="notification has-border">
        <span :class="{ 'loading-text': batchesLoading }">Batches loading: {{ batches ? batches.length : 0 }}</span>
      </div>
      <div v-else-if="batchesLoading" class="notification has-border">
        <span class="loading-text">Refreshing {{ batches.length }} batches</span>
      </div>
      <div v-if="submissionsLoading" class="notification has-border">
        <span class="loading-text">Refreshing {{ submissions ? submissions.length : 0 }} submissions</span>
      </div>
      <div v-if="!allQualificationsLoaded" class="notification has-border">
        <span :class="{ 'loading-text': qualificationsLoading }">
          Qualifications loading: {{ qualifications ? qualifications.length : 0 }}
        </span>
      </div>
      <div v-else-if="qualificationsLoading" class="notification has-border">
        <span class="loading-text">Refreshing {{ qualifications.length }} qualifications</span>
      </div>
      <div v-if="!allAssignedQualificationsLoaded" class="notification has-border">
        <span :class="{ 'loading-text': assignedQualificationsLoading }">
          Assigned Qualifications loading: {{ assignedQualifications ? assignedQualifications.length : 0 }}
        </span>
      </div>
      <div v-else-if="assignedQualificationsLoading" class="notification has-border">
        <span class="loading-text">Refreshing {{ assignedQualifications.length }} assigned qualifications</span>
      </div>
    </div>
    <chain-status v-if="$auth && $auth.loggedIn" />
    <div class="notif-banner is-size-6">
      <div class="container">
        <div class="columns">
          <nuxt-link to="/security" class="column has-text-centered warning">
            ⚠️ This is a beta release, know the risks »
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="resourceIsLow" class="resource-banner is-size-6">
      <div class="container">
        <div class="columns">
          <nuxt-link to="/status" class="column has-text-centered warning is-light">
            🔋 Effect Network Resources low, please donate »
          </nuxt-link>
        </div>
      </div>
    </div>
    <nav-bar />
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
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignsLoading: state => state.campaign.loading,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded,
      batches: state => state.campaign.batches,
      batchesLoading: state => state.campaign.loadingBatch,
      allBatchesLoaded: state => state.campaign.allBatchesLoaded,
      submissions: state => state.campaign.submissions,
      allSubmissionsLoaded: state => state.campaign.allSubmissionsLoaded,
      submissionsLoading: state => state.campaign.loadingSubmissions,
      qualifications: state => state.qualification.qualifications,
      allQualificationsLoaded: state => state.qualification.allQualificationsLoaded,
      qualificationsLoading: state => state.qualification.loading,
      assignedQualifications: state => state.qualification.assignedQualifications,
      allAssignedQualificationsLoaded: state => state.qualification.allAssignedQualificationsLoaded,
      assignedQualificationsLoading: state => state.qualification.loadingAssigned
    }),
    percentageRam () {
      return this.$blockchain.relayerStatus ? parseInt(this.$blockchain.relayerStatus.ram_usage / this.$blockchain.relayerStatus.ram_quota * 100, 10) : 0
    },
    leftOverRam  () {
      return this.$blockchain.relayerStatus ? this.$blockchain.relayerStatus.ram_quota - this.$blockchain.relayerStatus.ram_usage : 0
    },
    percentageNet () {
      return this.$blockchain.relayerStatus ? parseInt(this.$blockchain.relayerStatus.net_limit.used / this.$blockchain.relayerStatus.net_limit.max * 100, 10) : 0
    },
    percentageCpu () {
      return this.$blockchain.relayerStatus ? parseInt(this.$blockchain.relayerStatus.cpu_limit.used / this.$blockchain.relayerStatus.cpu_limit.max * 100, 10) : 0
    },
    resourceIsLow () {
      // return (this.percentageCpu > 90) || (this.percentageNet > 90) || (this.percentageRam > 95)
      return (this.percentageCpu > 90) || (this.percentageNet > 90) || (this.leftOverRam < 10e3)
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.notif-banner {
  background-color: $yellow;
  padding: 0.4rem 0;
}

.resource-banner {
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
