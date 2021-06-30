<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title">
          Welcome
        </h4>
        <div class="subtitle">
          {{ $auth.user.address }}
        </div>
        {{ $auth.user }}
        <br>
        <a class="button is-danger" @click="logout">Logout</a>
        <br><br>
      </div>
      <div>
        <div v-if="campaignsLoading">
          Campaigns loading..
        </div>
        <div v-for="campaign in campaigns" v-else-if="campaigns && campaigns.length" :key="campaign.id">
          {{ campaign.name }}
        </div>
        <div v-else-if="campaigns && !campaigns.length">
          No campaigns :(
        </div>
        <div v-else>
          Could not retrieve campaigns
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth'],
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignsLoading: state => state.campaign.loading
    })
  },
  created () {
    this.$store.dispatch('campaign/getCampaigns')
  },
  methods: {
    async logout () {
      this.$bsc.logout()
      await this.$auth.logout()
    }
  }
}
</script>

<style>
</style>
