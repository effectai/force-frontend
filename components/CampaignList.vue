<template>
  <div>
    <client-only>
      <category-filters v-if="!owner" @clicked="onFilter" />
    </client-only>
    <template v-for="campaign in filteredCampaigns">
      <nuxt-link
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
            <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
              <nuxt-link :to="'/profile/' + campaign.owner[1]">
                <span :class="{'is-size-7': campaign.owner[0] === 'address'}">{{ campaign.owner[1] }}</span>
              </nuxt-link>
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
              Tasks
            </p>
            <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
              <span v-if="batchByCampaignId(campaign.id) === null">
                Loading..
              </span>
              <span v-else>
                {{ batchByCampaignId(campaign.id).reduce(function(a,b){
                  return a + b.num_tasks
                },0) - batchByCampaignId(campaign.id).reduce(function(a,b){
                  return a + b.tasks_done
                },0) }}/{{ batchByCampaignId(campaign.id).reduce(function(a,b){
                  return a + b.num_tasks
                },0) }} left
                <br>
                <small class="is-size-7">({{ batchByCampaignId(campaign.id).length }} batch<template v-if="batchByCampaignId(campaign.id).length !== 1">es</template>)</small>
              </span>
            </h2>
          </div>
          <div class="column has-text-right is-12-mobile">
            <button class="button is-wide is-secondary has-text-weight-semibold is-fullwidth-mobile" :disabled="!campaign || campaign.info === null" :class="{'is-loading': typeof campaign.info === 'undefined', 'is-accent': campaign.info === null, 'is-outlined': campaign.info === null}">
              <span class="">View</span>
            </button>
          </div>
        </div>
      </nuxt-link>
    </template>
    <div v-if="campaignsLoading" class="subtitle">
      Campaigns loading..
    </div>
    <div v-else-if="filteredCampaigns && !filteredCampaigns.length" class="subtitle">
      No <span v-if="active">active</span> campaigns
    </div>
    <div v-else-if="!filteredCampaigns" class="subtitle has-text-danger">
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
  props: ['active', 'owner'],
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
      let campaigns = this.campaignsByCategory(this.filter)
      for (const i in campaigns) {
        const batches = this.batchByCampaignId(campaigns[i].id)
        if (batches) {
          campaigns[i].num_tasks = batches.reduce(function (a, b) {
            return a + b.num_tasks
          }, 0)
          campaigns[i].tasks_done = batches.reduce(function (a, b) {
            return a + b.tasks_done
          }, 0)
        }
      }
      if (campaigns && this.active) {
        campaigns = campaigns.filter(c => c.num_tasks - c.tasks_done > 0)
      }
      if (campaigns && this.owner) {
        campaigns = campaigns.filter(c => c.owner[1] === this.owner)
      }

      return campaigns
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
