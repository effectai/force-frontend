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
      <h1 class="title mb-6 has-text-weight-bold is-full-mobile">
        Active Tasks
      </h1>
      <campaign-list :category-filter="true" :active="true" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import CampaignList from '@/components/CampaignList'
export default {
  components: {
    CampaignList
  },
  middleware: ['auth'],
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns
    }),
    hasCampaigns () {
      let hasCampaigns = false
      if (this.campaigns) {
        this.campaigns.forEach((c) => {
          if (c.owner[1] === this.$auth.user.accountName) {
            hasCampaigns = true
          }
        })
      }
      return hasCampaigns
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
