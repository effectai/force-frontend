<template>
  <div>
    <div class="buttons is-flex is-justify-content-space-evenly">
      <button class="button is-info is-outlined" @click.prevent="filter = 'translation'">
        Translation
      </button>
      <button class="button is-secondary is-outlined" @click.prevent="filter = 'image_classification'">
        Image classification
      </button>
      <button class="button is-warning is-outlined" @click.prevent="filter = 'text_classification'">
        Text classification
      </button>
      <button class="button is-danger is-outlined" @click.prevent="filter = 'video_classification'">
        Video classification
      </button>
      <button class="button is-primary is-outlined" @click.prevent="filter = null">
        all
      </button>
    </div>
    <template v-for="batch in batches">
      <nuxt-link
        v-show="!filter || (campaignById(batch.campaign_id).info && campaignById(batch.campaign_id).info.category === filter)"
        :key="`${batch.campaign_id}.${batch.id}`"
        :set="campaign = campaignById(batch.campaign_id)"
        :to="`/campaigns/${batch.campaign_id}/${batch.id}`"
        class="box p-4"
        :class="{'is-disabled': false}"
      >
        <div class="columns is-vcentered is-multiline is-mobile">
          <div class="column is-narrow is-mobile-1">
            <p class="image has-radius" style="width: 52px; height: 52px">
              <img v-if="campaign && campaign.info && campaign.info.image" :src="campaign.info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaign.info.image.Hash : campaign.info.image">
            </p>
          </div>
          <div class="column is-4-desktop is-5-widescreen is-12-touch">
            <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
              <div>
                <small class="blockchain-address">#<template v-if="campaign">{{ campaign.id }}.</template>{{ batch.id }}</small>
                <span
                  v-if="campaign && campaign.info && campaign.info.category"
                  class="tag is-light"
                  :class="{'is-secondary': campaign.info.category === 'translation'}"
                >{{ campaign.info.category }}</span>
              </div>

              <span v-if="campaign && campaign.info">
                <span v-if="campaign.info.title">{{ campaign.info.title }}</span>
                <i v-else>- Untitled -</i>
              </span>
              <span v-else-if="!campaign || campaign.info !== null">Loading..</span>
              <span v-else class="has-text-danger-dark">Could not load campaign info</span>
            </h2>
            <div class="has-text-grey is-size-7">
              <div v-if="campaign && campaign.info">
                <div v-if="campaign.info.description" class="is-ellipsis">
                  {{ campaign.info.description }}
                </div>
                <i v-else>- no description -</i>
              </div>
              <div v-else-if="!campaign || campaign.info !== null">
                ........
              </div>
            </div>
          </div>
          <div class="column">
            <p class="has-text-grey is-size-7">
              Requester
            </p>
            <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
              <span v-if="campaign">{{ campaign.owner[1] }}</span>
              <span v-else>.....</span>
            </h2>
          </div>
          <div class="column">
            <p class="has-text-grey is-size-7">
              Reward
            </p>
            <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
              <span v-if="campaign">{{ campaign.reward.quantity }}</span>
              <span v-else>.....</span>
            </h2>
          </div>
          <div class="column">
            <p class="has-text-grey is-size-7">
              Tasks
            </p>
            <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
              {{ batch.num_tasks - batch.tasks_done }}/{{ batch.num_tasks }} left
            </h2>
          </div>
          <div class="column has-text-right is-12-mobile">
            <button class="button is-wide is-secondary has-text-weight-semibold is-fullwidth-mobile" :class="{'is-loading': !campaign || typeof campaign.info === 'undefined', 'is-accent': campaign && campaign.info === null, 'is-outlined': campaign && campaign.info === null}">
              <span class="">{{ campaign && campaign.info === null ? 'Qualify' : 'View' }}</span>
            </button>
          </div>
        </div>
      </nuxt-link>
    </template>
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
      filter: null,
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
      batchesLoading: state => state.campaign.loadingBatch,
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
