<template>
  <section class="section">
    <div class="container">
      <nuxt-link class="button is-primary is-pulled-right no-float-mobile has-margin-bottom-mobile" to="/campaigns/templates">
        <span class="icon">
          +
        </span>
        <span>Create Campaign</span>
      </nuxt-link>
      <nuxt-link v-if="hasCampaigns" class="button is-ghost is-pulled-right no-float-mobile has-margin-bottom-mobile is-paddingless-mobile" to="/campaigns">
        <span>My Campaigns</span>
      </nuxt-link>
      <h1 class="title has-text-weight-bold is-full-mobile has-text-success mb-0">
        Approved Tasks
      </h1>
      <div class="mb-4">
        <nuxt-link to="/unmoderated" class="has-text-danger">
          Unmoderated tasks
        </nuxt-link>
      </div>
      <campaign-list :approved-campaigns="approvedCampaigns" :category-filter="true" :active="true" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import approvedCampaigns from '@/approvedCampaigns.json'

import CampaignList from '@/components/CampaignList'
export default {
  components: {
    CampaignList
  },
  data () {
    return {
      approvedCampaigns
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns
    }),
    hasCampaigns () {
      let hasCampaigns = false
      if (this.campaigns) {
        this.campaigns.forEach((c) => {
          if (this.$auth && this.$auth.user && c.owner[1] === this.$auth.user.accountName) {
            hasCampaigns = true
          }
        })
      }
      return hasCampaigns
    }
  },
  created () {
    if (!this.$auth || !this.$auth.loggedIn) {
      this.$router.push('/welcome')
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
