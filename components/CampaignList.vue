<template>
  <div>
    <client-only>
      <category-filters v-if="categoryFilter" :url-filter="$route.query.category" @clicked="onFilter" />
      <sort-filters v-if="sortCampaigns" @sorted="onSort" @search="onSearch" @category="onFilter" @status="onStatusFilter" />
      <div class="is-flex is-justify-content-space-between">
        <div>
          <span v-if="$route.query.category && !categories.includes($route.query.category)">
            Filtering on category: {{ $route.query.category }}
          </span>
        </div>
        <div v-if="gridToggle != false" class="is-hidden-touch">
          <div class="switch-button mb-1">
            <input v-model="gridListState" class="switch-button-checkbox" type="checkbox" @click="toggleGridList()">
            <label class="switch-button-label" for=""><span class="switch-button-label-span"><img height="28px" src="@/assets/img/icons/border-all.svg"></span></label>
          </div>
        </div>
      </div>
      <hr class="mt-1">
    </client-only>
    <div :class="{'is-flex-tablet' : !gridListState}">
      <nuxt-link
        v-for="campaign in paginatedCampaigns"
        :key="campaign.id"
        :to="'/campaigns/'+campaign.id"
        :class="{'is-disabled': campaign.info === null, 'has-reservation': campaign.userHasReservation, 'column is-one-fifth-desktop is-one-third-tablet is-full-mobile' : !gridListState}"
      >
        <div class="box p-4" :class="{'mt-5': gridListState}">
          <div class="columns is-vcentered is-multiline is-mobile">
            <div class="column is-narrow is-mobile-1">
              <p class="image has-radius is-vcentered has-background-image" style="width: 52px; height: 52px">
                <img v-if="campaign.info && campaign.info.image" :src="campaign.info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaign.info.image.Hash : campaign.info.image">
                <img class v-else-if="campaign.info && campaign.info.category && categories.includes(campaign.info.category)" :src="require(`~/assets/img/dapps/effect-${campaign.info.category}-icon.png`)">
                <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)" alt="campaign title">
              </p>
            </div>
            <div class="column is-4-desktop is-4-widescreen is-12-touch" :class="{'is-12': !gridListState}">
              <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                <div v-if="gridListState">
                  <nuxt-link
                    v-if="campaign.info && campaign.info.category"
                    :to="'/?category=' + campaign.info.category"
                    class="tag is-light mb-2"
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
            <div class="column is-2-desktop is-full-mobile">
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
            <div class="column" v-if="gridListState">
              <p class="has-text-grey is-size-7">
                Tasks:
              </p>
              <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                <span v-if="batchByCampaignId(campaign.id) === null" class="loading-text">
                  Loading
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
                </span>
              </h2>
            </div>
            <div class="column has-text-right is-12-mobile">
              <button class="button is-wide is-primary has-text-weight-semibold is-fullwidth-mobile" :disabled="!campaign || campaign.info === null" :class="{'is-loading': typeof campaign.info === 'undefined', 'is-accent': campaign.info === null || campaign.userHasReservation, 'is-outlined': campaign.info === null}">
                <span v-if="campaign.userHasReservation">Go to Task</span>
                <span v-else>View</span>
              </button>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <pagination
      v-if="filteredCampaigns"
      :items="filteredCampaigns.length"
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
    <div v-else-if="filteredCampaigns && !filteredCampaigns.length" class="subtitle">
      No <span v-if="active">active</span> campaigns
    </div>
    <div v-else-if="!filteredCampaigns" class="subtitle has-text-danger">
      Could not retrieve campaigns
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'
import CategoryFilters from './CategoryFilters'
import SortFilters from './SortAndFilters'
import Pagination from './Pagination.vue'

export default {
  name: 'CampaignList',
  components: {
    CategoryFilters,
    SortFilters,
    Pagination
  },
  props: ['active', 'owner', 'categoryFilter', 'sortCampaigns', 'loadAllCampaigns', 'approvedCampaigns', 'hideCampaigns', 'gridToggle'],
  data () {
    return {
      filter: null,
      sort: null,
      page: 1,
      perPage: 30,
      search: null,
      status: null,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      categories: ['translate', 'captions', 'socials', 'dao']
    }
  },
  computed: {
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId',
      campaignsByCategory: 'campaign/campaignsByCategory',
      reservationsByAccountId: 'campaign/reservationsByAccountId',
      getGridListState: 'view/getGridListState'
    }),
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignsLoading: state => state.campaign.loading,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded,
      allBatchesLoaded: state => state.campaign.allBatchesLoaded,
      allSubmissionsLoaded: state => state.campaign.allSubmissionsLoaded,
      gridListToggle: state => state.gridListToggle
    }),
    gridListState: {
      get () {
        return this.getGridListState
      },
      set (toggleState) {
        return toggleState
      }
    },
    reservations () {
      if (!this.$auth || !this.$auth.user || !this.$auth.user.vAccountRows) { return }
      let userReservations = this.reservationsByAccountId(this.$auth.user.vAccountRows[0].id)
      if (userReservations) {
        userReservations = userReservations.filter(r => parseInt(new Date(new Date(r.submitted_on) + 'UTC').getTime() / 1000) + parseInt(this.$blockchain.sdk.force.config.release_task_delay_sec.toFixed(0)) > parseInt((Date.now() / 1000).toFixed(0)))
      }
      return userReservations
    },
    filteredCampaigns () {
      const campaigns = this.campaignsByCategory(this.$route.query.category ? this.$route.query.category : this.filter)
      let filteredCampaigns
      if (campaigns) {
        filteredCampaigns = campaigns.map((c) => { return { ...c } })
        if (this.approvedCampaigns) {
          filteredCampaigns = filteredCampaigns.filter(c => this.approvedCampaigns.includes(c.id))
        }
        console.log(this.hideCampaigns)
        if (this.hideCampaigns) {
          filteredCampaigns = filteredCampaigns.filter(c => !this.hideCampaigns.includes(c.id))
        }
        for (const i in filteredCampaigns) {
          const batches = this.batchByCampaignId(filteredCampaigns[i].id)
          // get the reservations of the user for this campaign
          const reservationsOfUser = _.intersectionBy(batches, this.reservations, 'batch_id')
          filteredCampaigns[i].userHasReservation = (reservationsOfUser.length)
          if (batches) {
            filteredCampaigns[i].num_tasks = batches.reduce(function (a, b) {
              return a + b.num_tasks
            }, 0)
            filteredCampaigns[i].tasks_done = batches.reduce(function (a, b) {
              return a + b.tasks_done
            }, 0)
          }
        }

        if (this.active) {
          filteredCampaigns = filteredCampaigns.filter(c => c.num_tasks - c.tasks_done > 0 || c.userHasReservation)
          // show the campaigns where the user has a resevation first
          filteredCampaigns = _.orderBy(filteredCampaigns, ['userHasReservation', 'id'], ['desc', 'asc'])
        } else {
          // Show newest campaigns first when we are not filtering active campaigns
          filteredCampaigns.reverse()
        }
        if (this.owner) {
          filteredCampaigns = filteredCampaigns.filter(c => c.owner[1] === this.owner)
        }
        // Search campaigns
        if (this.search !== null) {
          filteredCampaigns = filteredCampaigns.filter((c) => {
            if (c && c.info) {
              return c.info.title.toLowerCase().includes(this.search.toLowerCase()) || c.info.description.toLowerCase().includes(this.search.toLowerCase())
            }
            return false
          })
        }

        // Filter by status
        if (this.status) {
          switch (this.status) {
            case 'active':
              filteredCampaigns = filteredCampaigns.filter(c => c.num_tasks - c.tasks_done > 0)
              break
            case 'ended':
              filteredCampaigns = filteredCampaigns.filter(c => c.num_tasks - c.tasks_done === 0 && c.num_tasks !== 0)
              break
            case 'notstarted':
              filteredCampaigns = filteredCampaigns.filter(c => c.num_tasks - c.tasks_done === c.num_tasks)
              break
          }
        }

        // Sort campaigns
        if (this.sort) {
          filteredCampaigns = _.orderBy(filteredCampaigns, [(campaign) => {
            if (typeof _.get(campaign, `${this.sort.value}`) === 'string') {
              return _.get(campaign, `${this.sort.value}`).toLowerCase()
            } else {
              return _.get(campaign, `${this.sort.value}`)
            }
          }, 'userHasReservation'], [this.sort.order, 'desc'])
        }
      }

      return filteredCampaigns
    },
    paginatedCampaigns () {
      const start = (this.page - 1) * this.perPage
      if (this.filteredCampaigns) {
        const pageCampaigns = this.filteredCampaigns.slice(start, start + this.perPage)
        // this.processCampaigns(pageCampaigns)
        return pageCampaigns
      }
      return []
    }
  },
  watch: {
    filteredCampaigns: {
      deep: true,
      handler () {
        this.filter = this.$route.query.category ? this.$route.query.category : this.filter
      }
    }
  },
  created () {
    this.getForceInfo()
  },
  methods: {
    async processCampaigns (campaigns) {
      for (const campaign of campaigns) {
        if (!this.loadAllCampaigns) {
          // a short sleep helps for some reason to make interface less laggy
          await this.$store.dispatch('campaign/processCampaign', campaign)
        }
      }
    },
    setPage (newPage) {
      this.page = newPage
    },
    onFilter (category) {
      if (this.$route.query.category) {
        this.$router.replace('/')
      }
      this.filter = category
    },
    onStatusFilter (status) {
      this.status = status
    },
    onSort (sort) {
      this.sort = sort
    },
    onSearch (input) {
      this.search = input
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
    },
    toggleGridList () {
      this.$store.dispatch('view/toggleGridListState')
    }
  }

}
</script>

<style lang="scss" scoped>
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
    border: 1px solid #D2D9EB;
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

.is-one-fifth-desktop {
  display: block;
  button {
    width: 100%;
  }
  .column {
    text-align: center;
    width: 100% !important;
  }
  .image {
    width: 100% !important;
    height: 90px !important;
  }
  .columns {
    flex-direction: column;
  }
}
</style>
