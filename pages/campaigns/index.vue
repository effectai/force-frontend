<template>
  <section class="section">
    <div class="container">
      <nuxt-link class="button is-primary is-pulled-right" to="/campaigns/templates">
        <span class="icon">
          +
        </span>
        <span>Create Campaign</span>
      </nuxt-link>
      <nuxt-link class="button is-ghost is-pulled-right is-paddingless-mobile" to="/">
        <span>Active Campaigns</span>
      </nuxt-link>
      <h2 class="title has-text-weight-bold is-full-mobile">
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

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .is-pulled-right {
    float: none !important;
    margin-bottom: 25px;
  }
}
</style>
