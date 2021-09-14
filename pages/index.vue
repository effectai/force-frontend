<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <a class="button is-primary" @click="transaction">test transaction</a>
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
    // this.$store.dispatch('campaign/getCampaigns')
  },
  methods: {
    transaction () {
      if (this.$auth.user.blockchain.bsc) {
        this.$bsc.testTx()
      } else if (this.$auth.user.blockchain.eos) {
        this.$eos.handleTransaction([{
          account: process.env.NUXT_ENV_EOS_TOKEN_CONTRACT,
          name: 'open',
          authorization: [{
            actor: this.$auth.user.blockchain.eos.accountName,
            permission: this.$auth.user.blockchain.eos.permission
          }],
          data: {
            owner: this.$auth.user.blockchain.eos.accountName,
            symbol: '4,' + process.env.NUXT_ENV_EOS_EFX_TOKEN,
            ram_payer: this.$auth.user.blockchain.eos.accountName
          }
        }])
      } else {
        console.log(this.$auth.user)
        alert('Something went wrong!')
      }
    }
  }
}
</script>

<style>
</style>
