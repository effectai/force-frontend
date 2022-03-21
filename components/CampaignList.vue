<template>
  <div>
    <div class="is-flex is-justify-content-space-between">
      <div />
      <div v-if="gridToggle" class="is-hidden-touch">
        <div class="switch-button mb-1">
          <input v-model="list" class="switch-button-checkbox" type="checkbox">
          <label class="switch-button-label" for=""><span class="switch-button-label-span"><img height="28px" src="@/assets/img/icons/border-all.svg"></span></label>
        </div>
      </div>
    </div>
    <hr class="mt-1">
    <div class="columns is-multiline" :class="{'grid': grid}">
      <div
        v-for="campaign in paginatedCampaigns"
        :key="campaign.id"
        class="column is-one-third-tablet"
        :class="{'is-one-fifth-desktop': grid, 'is-12-desktop': !grid}"
      >
        <nuxt-link :to="'/campaigns/'+campaign.id" class="box p-4" :class="{'is-disabled': campaign.info === null, 'has-reservation': campaign.userHasReservation}">
          <div class="columns is-vcentered is-multiline">
            <div
              class="column is-12-touch"
              :class="{'is-1-desktop': !grid, 'is-12-desktop': grid}"
            >
              <p class="image has-radius is-vcentered has-background-image">
                <img v-if="campaign.info && campaign.info.image" :src="campaign.info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaign.info.image.Hash : campaign.info.image">
                <img v-else-if="campaign.info && campaign.info.category && categories.includes(campaign.info.category)" class :src="require(`~/assets/img/dapps/effect-${campaign.info.category}-icon.png`)">
                <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)" alt="campaign title">
              </p>
            </div>
            <div class="column" :class="{'is-12': grid, 'is-4-desktop is-4-widescreen is-12-touch': !grid}">
              <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                <div>
                  <nuxt-link
                    v-if="campaign.info && campaign.info.category"
                    :to="'/?category=' + campaign.info.category"
                    class="tag is-light mb-2 has-border is-capitalized"
                    :class="{'is-dao': campaign.info.category === 'dao', 'is-dao': campaign.info.category === 'dao', 'is-socials': campaign.info.category === 'socials', 'is-translate': campaign.info.category === 'translate', 'is-captions': campaign.info.category === 'captions'}"
                  >
                    {{ campaign.info.category }}
                  </nuxt-link>
                  <span v-else-if="campaign.info !== null" class="tag is-light mb-2">
                    <span class="loading-text">Loading</span>
                  </span>
                </div>

                <span v-if="campaign.info">
                  <span v-if="campaign.info.title">{{ campaign.info.title }}</span>
                  <i v-else>- Untitled -</i>
                </span>
                <span v-else-if="campaign.info !== null" class="loading-text">Loading</span>
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
            <div class="column is-12" :class="{'is-2-desktop': !grid}">
              <p class="has-text-grey is-size-7">
                Requester:
              </p>
              <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                <nuxt-link :to="'/profile/' + campaign.owner[1]">
                  <span class="is-ellipsis">{{ campaign.owner[1] }}</span>
                </nuxt-link>
              </h2>
            </div>
            <div class="column">
              <p class="has-text-grey is-size-7">
                Reward:
              </p>
              <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                {{ campaign.reward.quantity }}
              </h2>
            </div>
            <div v-if="campaign.num_tasks || campaign.tasks_done" class="column">
              <p class="has-text-grey is-size-7">
                Tasks:
              </p>
              <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                <span>
                  {{ campaign.num_tasks - campaign.tasks_done }}/{{ campaign.num_tasks }} left
                </span>
              </h2>
            </div>
            <div class="column has-text-right" :class="{'is-12': grid}">
              <button class="button is-primary has-text-weight-semibold is-fullwidth" :disabled="!campaign || campaign.info === null" :class="{'is-loading': typeof campaign.info === 'undefined', 'is-accent': campaign.info === null || campaign.userHasReservation, 'is-outlined': campaign.info === null,'is-wide': !grid}">
                <span v-if="campaign.userHasReservation">Go to Task</span>
                <span v-else>View</span>
              </button>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <pagination
      v-if="campaigns"
      class="mt-2"
      :items="campaigns.length"
      :page="page"
      :per-page="perPage"
      @setPage="setPage"
    />
    <div v-if="campaignsLoading" class="subtitle loading-text">
      Campaigns loading
    </div>
    <div v-else-if="!allBatchesLoaded" class="loading-text">
      Batches loading
    </div>
    <div v-else-if="campaigns && !campaigns.length" class="subtitle">
      No tasks
    </div>
    <div v-else-if="!campaigns" class="subtitle has-text-danger">
      Could not retrieve campaigns
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from './Pagination.vue'

export default {
  name: 'CampaignList',
  components: {
    Pagination
  },
  props: ['gridToggle', 'campaigns'],
  data () {
    return {
      page: this.$route.query.page || 1,
      perPage: 30,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      categories: ['translate', 'captions', 'socials', 'dao']
    }
  },
  computed: {
    ...mapGetters({
      batchesByCampaignId: 'campaign/batchesByCampaignId'
    }),
    ...mapState({
      campaignsLoading: state => state.campaign.loading,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded,
      allBatchesLoaded: state => state.campaign.allBatchesLoaded,
      allSubmissionsLoaded: state => state.campaign.allSubmissionsLoaded
    }),
    list: {
      get () {
        return this.$store.state.view.grid && this.gridToggle
      },
      set (value) {
        this.$store.commit('view/SET_GRID_LIST', value)
      }
    },
    grid () {
      return !this.list && this.gridToggle
    },
    paginatedCampaigns () {
      const start = (this.page - 1) * this.perPage
      if (this.campaigns) {
        const pageCampaigns = this.campaigns.slice(start, start + this.perPage)
        return pageCampaigns
      }
      return []
    }
  },
  created () {
    this.getForceInfo()
  },
  methods: {
    setPage (newPage) {
      this.page = newPage
    },
    getForceInfo () {
      if (!this.campaigns || !this.allCampaignsLoaded) {
        // on the requester campaign list process all campaigns
        this.$store.dispatch('campaign/getCampaigns')
      }
      if (!this.allBatchesLoaded) {
        this.$store.dispatch('campaign/getBatches')
      }
      if (!this.allSubmissionsLoaded) {
        this.$store.dispatch('campaign/getSubmissions')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins";

.title-section {
  height: 100%;
}

.column {
  // display: inline-flex;
  // display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.box {
  &.is-disabled {
    .column:not(:last-child) {
      opacity: 0.5;
    }
    background-color: rgba(#DEE0E6, 0.5);
  }
  // not sure about this stylingx`
  &.has-reservation {
    box-shadow: 0px 0px 14px 5px rgba(17,72,235,0.3);
  }
  .image {
    img {
      border: 1px solid #D2D9EB;
    }
  }
}
.card {
  .card-image {
    height: 75px !important;
    figure, p, img {
      height: 75px !important;
    }
    img {
      width: 100%;
      object-fit: contain;
      border-radius: 6px !important;
    }
  }
}

.switch-button {
  background: #D7DCEE;
  border-radius: 6px;
  overflow: hidden;
  width: 80px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  color: #155FFF;
  position: relative;
  padding: 4px 40px 4px 4px;
  position: relative;

  &:before {
    content: url('@/assets/img/icons/list-ul.svg');
    position: absolute;
    top: 9px;
    bottom: 0;
    right: 1px;
    width: 40px;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }

  &-checkbox {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;

    &:checked + .switch-button-label:before {
      transform: translateX(36px);
      transition: transform 300ms linear;
    }

    & + .switch-button-label {
      position: relative;
      padding: 1px 0;
      display: block;
      user-select: none;
      pointer-events: none;

      &:before {
        content: "";
        padding: 1px 0;
        background: #F6F7FF;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 6px;
        transform: translateX(0);
        transition: transform 300ms;
      }

      .switch-button-label-span {
        position: relative;
        top: 5px
      }
    }
  }
}

.image {
  max-height: 90px;
}

@media screen and (min-width: 1024px) {
  .column.is-1-desktop {
      flex: none;
      width: 8.33333337%;
      max-width: 76px;
  }
}

.grid {
  text-align: center;
}
@include touch {
  .columns {
    text-align: center;
  }
}

// .is-one-fifth-desktop {
//   button {
//     width: 100%;
//   }
//   .column {
//     text-align: center;
//     width: 100% !important;
//   }
//   .image {
//     width: 100% !important;
//     height: 90px !important;
//   }
//   .columns {
//     flex-direction: column;
//   }
// }
</style>
