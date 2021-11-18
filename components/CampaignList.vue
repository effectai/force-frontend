<template>
  <div>
    <client-only>
      <category-filters @clicked="onFilter" />
    </client-only>
    <nuxt-link
      v-for="campaign in filteredCampaigns"
      :key="campaign.id"
      :to="'/campaigns/'+campaign.id"
      class="box p-4"
      :class="{'is-disabled': campaign.info === null}"
    >
      <div class="columns is-vcentered is-multiline is-mobile">
        <div class="column is-narrow is-mobile-1">
          <p class="image has-radius" style="width: 52px; height: 52px">
            <img v-if="campaign.info && campaign.info.image" :src="campaign.info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaign.info.image.Hash : campaign.info.image">
          </p>
        </div>
        <div class="column is-4-desktop is-5-widescreen is-12-touch">
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            <div>
              <small class="blockchain-address">#{{ campaign.id }}</small>
              <span
                v-if="campaign.info && campaign.info.category"
                class="tag is-light"
                :class="{'is-dao': campaign.info.category === 'dao', 'is-dao': campaign.info.category === 'dao', 'is-socials': campaign.info.category === 'socials', 'is-translate': campaign.info.category === 'translate', 'is-captions': campaign.info.category === 'captions'}"
              >{{ campaign.info.category }}</span>
            </div>

            <span v-if="campaign.info">
              <span v-if="campaign.info.title">{{ campaign.info.title }}</span>
              <i v-else>- Untitled -</i>
            </span>
            <span v-else-if="campaign.info !== null">Loading..</span>
            <span v-else class="has-text-danger-dark">Could not load campaign info</span>
          </h2>
          <div class="has-text-grey is-size-7">
            <div v-if="campaign.info">
              <div v-if="campaign.info.description" class="is-ellipsis">
                {{ campaign.info.description }}
              </div>
              <i v-else>- no description -</i>
            </div>
            <div v-else-if="campaign.info !== null">
              ........
            </div>
          </div>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Requester
          </p>
          <!--          {{ campaign }}-->
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            {{ campaign.owner[1] }}
          </h2>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Reward
          </p>
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            {{ campaign.reward.quantity }}
          </h2>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Batches
          </p>
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            <span v-if="batchByCampaignId(campaign.id) === null">
              Loading..
            </span>
            <span v-else>{{ batchByCampaignId(campaign.id).length }}</span>
          </h2>
        </div>
        <div class="column has-text-right is-12-mobile">
          <button class="button is-wide is-secondary has-text-weight-semibold is-fullwidth-mobile" :class="{'is-loading': typeof campaign.info === 'undefined', 'is-accent': campaign.info === null, 'is-outlined': campaign.info === null}">
            <span class="">{{ campaign.info === null ? 'Qualify' : 'View' }}</span>
          </button>
        </div>
      </div>
    </nuxt-link>
    <div v-if="campaignsLoading">
      Campaigns loading..
    </div>
    <div v-else-if="filteredCampaigns && !filteredCampaigns.length">
      No campaigns
    </div>
    <div v-else-if="!filteredCampaigns">
      Could not retrieve campaigns
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CategoryFilters from './CategoryFilters'

export default {
  name: 'CampaignList',
  components: {
    CategoryFilters
  },
  data () {
    return {
      filter: null,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER
    }
  },
  computed: {
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId',
      campaignsByCategory: 'campaign/campaignsByCategory'
    }),
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignsLoading: state => state.campaign.loading,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded
    }),
    filteredCampaigns () {
      return this.campaignsByCategory(this.filter)
    }
  },
  created () {
    this.getCampaigns()
    this.getBatches()
  },
  methods: {
    onFilter (category) {
      this.filter = category
    },
    async getCampaigns () {
      if (!this.campaigns || !this.allCampaignsLoaded) {
        await this.$store.dispatch('campaign/getCampaigns')
      }
    },
    async getBatches () {
      await this.$store.dispatch('campaign/getBatches')
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
