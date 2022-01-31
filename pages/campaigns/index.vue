<template>
  <section class="section">
    <div class="container">
      <nuxt-link class="button is-primary is-pulled-right" to="/campaigns/new">
        <span class="icon">
          +
        </span>
        <span>Create Campaign</span>
      </nuxt-link>
      <nuxt-link class="button is-ghost is-pulled-right" to="/">
        <span>Active Campaigns</span>
      </nuxt-link>
      <h2 class="title">
        <span v-if="myCampaigns">My</span><span v-else>All</span> Campaigns
      </h2>
      <label class="checkbox">
        <input v-model="myCampaigns" type="checkbox">
        Show only my campaigns
      </label>
      <campaign-list :owner="myCampaigns ? $auth.user.accountName : null" :filters="false" :sort-campaigns="true" :load-all-campaigns="true" />
    </div>
  </section>
</template>

<script>
import CampaignList from '@/components/CampaignList'
export default {
  components: {
    CampaignList
  },
  middleware: ['auth'],
  data () {
    return {
      myCampaigns: true
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
