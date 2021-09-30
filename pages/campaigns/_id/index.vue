<template>
  <div class="content">
    <section class="container is-max-widescreen">
      <div class="mb-2">
        <nuxt-link to="/" class="is-size-7">&lt; All Campaigns</nuxt-link>
      </div>
      <pre>{{ campaign }}</pre>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth'],
  data () {
    return {
      id: parseInt(this.$route.params.id),
      campaign: undefined
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading
    })
  },
  created () {
    this.getCampaign(this.id)
  },
  methods: {
    async getCampaign () {
      // if (!this.campaigns) {
      await this.$store.dispatch('campaign/getCampaign', this.id)
      this.campaign = this.campaigns.find(c => c.id === this.id)
      // }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
