<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title">Welcome</h4>
        <div class="subtitle">{{$auth.user.email}}</div>
        {{$auth.user}}
        <br>
        <a class="button is-danger" @click="$auth.logout()">Logout</a>
        <br><br>
      </div>
      <div>
        <div v-if="campaignsLoading">
          Campaigns loading..
        </div>
        <div v-else-if="campaigns && campaigns.length" v-for="campaign in campaigns" :key="campaign.id">
          {{campaign}}
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
  }
}
</script>

<style>
</style>
