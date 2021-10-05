<template>
  <div>
    <nuxt-link
      v-for="batch in batches"
      :key="batch.id"
      :to="'/campaigns/'+batch.campaign_id"
      class="box p-4"
      :class="{'is-disabled': false}"
    >
      <div class="columns is-vcentered is-multiline is-mobile">
        <div class="column is-narrow is-mobile-1">
          <p class="image has-radius" style="width: 52px; height: 52px">
            <img v-if="campaignById(batch.campaign_id) && campaignById(batch.campaign_id).info && campaignById(batch.campaign_id).info.image" :src="campaignById(batch.campaign_id).info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaignById(batch.campaign_id).info.image.Hash : campaignById(batch.campaign_id).info.image">
          </p>
        </div>
        <div class="column is-4-desktop is-5-widescreen is-12-touch">
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            <div>
              <small class="blockchain-address">#<template v-if="campaignById(batch.campaign_id)">{{ campaignById(batch.campaign_id).id }}.</template>{{ batch.id }}</small>
              <span
                v-if="campaignById(batch.campaign_id) && campaignById(batch.campaign_id).info && campaignById(batch.campaign_id).info.category"
                class="tag is-light"
                :class="{'is-secondary': campaignById(batch.campaign_id).info.category === 'translation'}"
              >{{ campaignById(batch.campaign_id).info.category }}</span>
            </div>

            <span v-if="campaignById(batch.campaign_id) && campaignById(batch.campaign_id).info">
              <span v-if="campaignById(batch.campaign_id).info.title">{{ campaignById(batch.campaign_id).info.title }}</span>
              <i v-else>- Untitled -</i>
            </span>
            <span v-else-if="!campaignById(batch.campaign_id) || campaignById(batch.campaign_id).info !== null">Loading..</span>
            <span v-else class="has-text-danger-dark">Could not load campaign info</span>
          </h2>
          <div class="has-text-grey is-size-7">
            <div v-if="campaignById(batch.campaign_id) && campaignById(batch.campaign_id).info">
              <div v-if="campaignById(batch.campaign_id).info.description" class="is-ellipsis">
                {{ campaignById(batch.campaign_id).info.description }}
              </div>
              <i v-else>- no description -</i>
            </div>
            <div v-else-if="!campaignById(batch.campaign_id) || campaignById(batch.campaign_id).info !== null">
              ........
            </div>
          </div>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Requester
          </p>
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            <span v-if="campaignById(batch.campaign_id)">{{ campaignById(batch.campaign_id).owner[1] }}</span>
            <span v-else>.....</span>
          </h2>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Reward
          </p>
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            <span v-if="campaignById(batch.campaign_id)">{{ campaignById(batch.campaign_id).reward.quantity }}</span>
            <span v-else>.....</span>
          </h2>
        </div>
        <div class="column">
          <p class="has-text-grey is-size-7">
            Tasks
          </p>
          <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
            {{ batch.tasks_done }}/300 left
          </h2>
        </div>
        <div class="column has-text-right is-12-mobile">
          <button class="button is-wide is-secondary has-text-weight-semibold is-fullwidth-mobile" :class="{'is-loading': !campaignById(batch.campaign_id) || typeof campaignById(batch.campaign_id).info === 'undefined', 'is-accent': campaignById(batch.campaign_id) && campaignById(batch.campaign_id).info === null, 'is-outlined': campaignById(batch.campaign_id) && campaignById(batch.campaign_id).info === null}">
            <span class="">{{ campaignById(batch.campaign_id) && campaignById(batch.campaign_id).info === null ? 'Qualify' : 'View' }}</span>
          </button>
        </div>
      </div>
    </nuxt-link>
    <div v-if="batchesLoading">
      Batches loading..
    </div>
    <div v-else-if="batches && !batches.length">
      No batches
    </div>
    <div v-else-if="!batches">
      Could not retrieve batches
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'BatchList',
  data () {
    return {
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER
    }
  },
  computed: {
    ...mapGetters({
      campaignById: 'campaign/campaignById'
    }),
    ...mapState({
      batches: state => state.campaign.batches,
      campaigns: state => state.campaign.campaigns,
      campaignsLoading: state => state.campaign.loading,
      batchesLoading: state => state.campaign.loadingBatch,
      allBatchesLoaded: state => state.campaign.allBatchesLoaded,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded
    })
  },
  created () {
    this.getBatches()
    this.getCampaigns()
  },
  methods: {
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
