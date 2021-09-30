<template>
  <div>
    <nuxt-link v-for="campaign in campaigns" :key="campaign.id" :to="'/campaigns/'+campaign.id" class="box p-4" :class="{'is-disabled': campaign.id === 1}">
      <div class="columns is-vcentered is-multiline is-mobile">
        <div class="column is-narrow is-mobile-1">
          <p class="image has-radius" style="width: 52px; height: 52px">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </div>
        <div class="column is-4-desktop is-5-widescreen is-12-touch">
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            #{{ campaign.id }}
            <span v-if="campaign.info">{{ campaign.info.title }}</span>
            <span v-else>Loading..</span>
          </h2>
          <p class="has-text-grey is-size-7">
            This will be the place for the short campaign description...
          </p>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Requester
          </p>
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            {{ campaign.author }}
          </h2>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Reward
          </p>
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            {{ campaign.pay[0].field_0.quantity }}
          </h2>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Tasks
          </p>
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            10/300 left
          </h2>
        </div>
        <div class="column has-text-right is-12-mobile">
          <button class="button is-wide is-secondary has-text-weight-semibold is-fullwidth-mobile" :class="{'is-accent': campaign.id === 1, 'is-outlined': campaign.id === 1}">
            <span class="">{{ campaign.id === 1 ? 'Qualify' : 'View' }}</span>
          </button>
        </div>
      </div>
    </nuxt-link>
    <div v-if="campaignsLoading">
      Campaigns loading..
    </div>
    <div v-else-if="campaigns && !campaigns.length">
      No campaigns
    </div>
    <div v-else-if="!campaigns">
      Could not retrieve campaigns
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CampaignList',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignsLoading: state => state.campaign.loading,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded
    })
  },
  created () {
    this.getCampaigns()
  },
  methods: {
    async getCampaigns () {
      if (!this.campaigns || !this.allCampaignsLoaded) {
        await this.$store.dispatch('campaign/getCampaigns')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.box {
  &.is-disabled {
    .column:not(:last-child) {
      opacity: 0.5;
    }
    background-color: rgba(#DEE0E6, 0.5);
  }
}
</style>
