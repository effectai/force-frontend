<template>
  <div>
    <client-only>
      <category-filters v-if="categoryFilter" @clicked="onFilter" />
      <sort-filters v-if="sortCampaigns" @sorted="onSort" @search="onSearch" @category="onFilter" @status="onStatusFilter" />
      <div class="field is-flex is-justify-content-flex-end">
        <input type="checkbox" class="switch is-pulled-right" name="gridToggle" id="gridToggle" v-model="listGridSwitch">
        <label for="gridToggle">Grid / List</label>
      </div>
      <span v-if="$route.query.category">
        Filtering on category: {{ $route.query.category }}
      </span>
      <hr class="mt-1">
    </client-only>
    <div v-if="listGridSwitch">
      <nuxt-link
        v-for="campaign in paginatedCampaigns"
        :key="campaign.id"
        :to="'/campaigns/'+campaign.id"
        class="box p-4"
        :class="{'is-disabled': campaign.info === null, 'has-reservation': campaign.userHasReservation}"
      >
        <div class="columns is-vcentered is-multiline is-mobile">
          <div class="column is-narrow is-mobile-1">
            <p class="image has-radius" style="width: 52px; height: 52px">
              <img v-if="campaign.info && campaign.info.image" :src="campaign.info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaign.info.image.Hash : campaign.info.image">
              <img v-else-if="campaign.info && campaign.info.category && categories.includes(campaign.info.category)" :src="require(`~/assets/img/dapps/effect-${campaign.info.category}-icon.png`)">
              <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)" alt="campaign title">
            </p>
          </div>
          <div class="column is-4-desktop is-4-widescreen is-12-touch">
            <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
              <div>
                <nuxt-link
                  :to="'/?category=' + campaign.info.category"
                  v-if="campaign.info && campaign.info.category"
                  class="tag is-light mb-2"
                  :class="{'is-dao': campaign.info.category === 'dao', 'is-dao': campaign.info.category === 'dao', 'is-socials': campaign.info.category === 'socials', 'is-translate': campaign.info.category === 'translate', 'is-captions': campaign.info.category === 'captions'}"
                >{{ campaign.info.category }}</nuxt-link>
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
          <div class="column">
            <p class="has-text-grey is-size-7">
              Tasks:
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
      </nuxt-link>
    </div>
    <div v-else>
      <span>
        <div class="columns is-multiline">
          <div
            class="column is-one-fifth-desktop is-one-third-tablet is-full-mobile"
            v-for="campaign in paginatedCampaigns"
            :key="campaign.id"
          >
            <div class="card is-shadowless">
              <nuxt-link
                :to="'/campaigns/'+campaign.id"
                class="box p-0"
                :class="{'is-disabled': campaign.info === null, 'has-reservation': campaign.userHasReservation}"
              >
                <div class="card-image p-2 mb-3">
                  <figure>
                    <p class="image has-radius is-vcentered">
                      <img v-if="campaign.info && campaign.info.image" :src="campaign.info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaign.info.image.Hash : campaign.info.image">
                      <img class="p-2" v-else-if="campaign.info && campaign.info.category && categories.includes(campaign.info.category)" :src="require(`~/assets/img/dapps/effect-${campaign.info.category}-icon.png`)">
                      <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)" alt="campaign title">
                    </p>
                  </figure>
                </div>
                <div class="card-content p-2 has-text-centered">
                  <section class="title-section">
                    <div class="media-content">
                      <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                        <span v-if="campaign.info">
                          <span v-if="campaign.info.title">{{ campaign.info.title }}</span>
                          <i v-else>- Untitled -</i>
                        </span>
                        <span v-else-if="campaign.info !== null">Loading..</span>
                        <span v-else class="has-text-danger-dark">Could not load campaign info</span>
                      </h2>
                      <p class="has-text-grey is-size-7 is-flex is-clipped is-inline">
                        <span v-if="campaign.info">
                          <span v-if="campaign.info.description.length > 0">
                            {{ campaign.info.description.length > 50 ? `${campaign.info.description.slice(0, 30)}...` : campaign.info.description }}
                          </span>
                          <span v-else>
                            <i>- No Description... -</i>
                          </span>
                        </span>
                      </p>
                    </div>
                  </section>
                </div>
                <hr class="mb-2 mt-0">
                <div class="card-content p-2 has-text-centered">
                  <div class="content">
                    <div class="has-text-grey is-size-7">
                      Requester:
                    </div>
                    <div class="subtitle is-6 has-text-weight-semibold mb-2">
                      <nuxt-link :to="'/profile/' + campaign.owner[1]">
                        <span class="is-ellipsis">{{ campaign.owner[1] }}</span>
                      </nuxt-link>
                    </div>
                    <div class="has-text-grey is-size-7">
                      Reward:
                    </div>
                    <div class="subtitle is-6 has-text-weight-semibold mb-0">
                      {{ campaign.reward.quantity }}
                    </div>
                  </div>
                  <button class="button is-primary is-fullwidth">View</button>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </span>
    </div>
    <pagination
      v-if="filteredCampaigns"
      :items="filteredCampaigns.length"
      :page="page"
      :per-page="perPage"
      @setPage="setPage"
    />
    <div v-if="campaignsLoading" class="subtitle">
      Campaigns loading..
    </div>
    <div v-else-if="!allBatchesLoaded">
      Batches loading..
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
  props: ['active', 'owner', 'categoryFilter', 'sortCampaigns', 'loadAllCampaigns'],
  data () {
    return {
      filter: null,
      sort: null,
      page: 1,
      perPage: 30,
      search: null,
      status: null,
      listGridSwitch: true,
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      categories: ['translate', 'captions', 'socials', 'dao']
    }
  },
  computed: {
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId',
      campaignsByCategory: 'campaign/campaignsByCategory',
      reservationsByAccountId: 'campaign/reservationsByAccountId'
    }),
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignsLoading: state => state.campaign.loading,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded,
      allBatchesLoaded: state => state.campaign.allBatchesLoaded,
      allSubmissionsLoaded: state => state.campaign.allSubmissionsLoaded
    }),
    reservations () {
      return this.reservationsByAccountId(this.$auth.user.vAccountRows[0].id)
    },
    filteredCampaigns () {
      const campaigns = this.campaignsByCategory(this.$route.query.category ? this.$route.query.category : this.filter)
      let filteredCampaigns
      if (campaigns) {
        filteredCampaigns = campaigns.map((c) => { return { ...c } })
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
  // not sure about this styling
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
  .card-content {
  }
}
</style>
