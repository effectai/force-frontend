<template>
  <section class="section">
    <div class="container">
      <nuxt-link class="button is-primary is-pulled-right" to="/campaigns/new">
        <span class="icon">
          +
        </span>
        <span>Create Campaign</span>
      </nuxt-link>
      <nuxt-link v-if="hasCampaigns" class="button is-ghost is-pulled-right" to="/campaigns">
        <span>My Campaigns</span>
      </nuxt-link>
      <h2 class="title mb-6 has-text-weight-bold">
        Active Tasks
      </h2>
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

<style>
</style>
