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
        All Campaigns
      </h2>
      <campaign-list />
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
  created () {
  },
  methods: {
  }
}
</script>

<style>
</style>
