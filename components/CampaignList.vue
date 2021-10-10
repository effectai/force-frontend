<template>
  <div>
    <div class="columns">
      <div class="column">
        <a href="#" class="card is-flat is-hoverable dapp-dao" @mouseover="effect_dapps.dao.hover = true" @mouseleave="effect_dapps.dao.hover = false" @click.prevent="filter = 'translation'">
          <div class="card-image has-text-centered">
            <img class="dapp-logo block mt-2" :src="effect_dapps.dao.hover ? effect_dapps.dao.whiteUrl : effect_dapps.dao.normalUrl" alt="Image">
          </div>
        </a>
      </div>
      <div class="column">
        <a href="#" class="card is-flat is-hoverable dapp-socials" @mouseover="effect_dapps.socials.hover = true" @mouseleave="effect_dapps.socials.hover = false" @click.prevent="filter = 'image_classification'">
          <div class="card-image has-text-centered">
            <img class="dapp-logo block mt-2" :src="effect_dapps.socials.hover ? effect_dapps.socials.whiteUrl : effect_dapps.socials.normalUrl" alt="Image">
          </div>
        </a>
      </div>
      <div class="column">
        <a href="#" class="card is-flat is-hoverable dapp-captions" @mouseover="effect_dapps.captions.hover = true" @mouseleave="effect_dapps.captions.hover = false" @click.prevent="filter = 'text_classification'">
          <div class="card-image has-text-centered">
            <img class="dapp-logo block mt-2" :src="effect_dapps.captions.hover ? effect_dapps.captions.whiteUrl : effect_dapps.captions.normalUrl" alt="Image">
          </div>
        </a>
      </div>
      <div class="column">
        <a href="#" class="card is-flat is-hoverable dapp-translate" @mouseover="effect_dapps.translate.hover = true" @mouseleave="effect_dapps.translate.hover = false" @click.prevent="filter = 'video_classification'">
          <div class="card-image has-text-centered">
            <img class="dapp-logo block mt-2" :src="effect_dapps.translate.hover ? effect_dapps.translate.whiteUrl : effect_dapps.translate.normalUrl" alt="Image">
          </div>
        </a>
      </div>
    </div>
    <!-- <div class="buttons is-flex is-justify-content-space-evenly">
      <button class="button is-info is-outlined">
        Translation
      </button>
      <button class="button is-secondary is-outlined">
        Image classification
      </button>
      <button class="button is-warning is-outlined">
        Text classification
      </button>
      <button class="button is-danger is-outlined">
        Video classification
      </button>
      <button class="button is-primary is-outlined" @click.prevent="filter = null">
        all
      </button>
    </div> -->
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
                :class="{'is-secondary': campaign.info.category === 'translation', 'is-info': campaign.info.category === 'image_classification', 'is-warning': campaign.info.category === 'text_classification', 'is-danger': campaign.info.category === 'video_classification'}"
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
            <span v-if="batchByCampaignId(campaign.idid) === null">
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
    <div v-else-if="campaigns && !campaigns.length">
      No campaigns
    </div>
    <div v-else-if="!campaigns">
      Could not retrieve campaigns
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CampaignList',
  data () {
    return {
      filter: null,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      effect_dapps: {
        dao: {
          hover: false,
          normalUrl: 'https://effect.network/_nuxt/img/effect-dao_h100.62b6528.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-dao_white_h100.8128b59.png'
        },
        socials: {
          hover: false,
          normalUrl: 'https://effect.network/_nuxt/img/effect-socials_h100.4f0f9f8.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-socials_white_h100.aaa70fd.png'
        },
        translate: {
          hover: false,
          normalUrl: 'https://effect.network/_nuxt/img/effect-translate_h100.61861ae.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-translate_white_h100.d698b51.png'
        },
        captions: {
          hover: false,
          normalUrl: 'https://effect.network/_nuxt/img/effect-captions_h100.2b22d0c.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-captions_white_h100.d746459.png'
        }
      }
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
a.card:hover {
  &.dapp-dao div.card-image {
    background: #d7ac00;
  }
  &.dapp-socials div.card-image {
    background:#06c6c6;
  }
  &.dapp-captions div.card-image {
    background: #e06375;
  }
  &.dapp-translate div.card-image {
    background: #00c165;
  }
}
.dapp-logo {
  max-height: 70px
}
</style>
