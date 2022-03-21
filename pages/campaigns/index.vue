<template>
  <section class="section">
    <div class="container">
      <nuxt-link class="button is-primary is-pulled-right" to="/campaigns/templates">
        <span class="icon">
          +
        </span>
        <span>Create Task</span>
      </nuxt-link>
      <nuxt-link class="button is-ghost is-pulled-right is-paddingless-mobile" to="/">
        <span>Active Tasks</span>
      </nuxt-link>
      <h1 class="title has-text-weight-bold">
        <span v-if="myCampaigns">My</span><span v-else>All</span> Tasks
      </h1>
      <label class="checkbox">
        <input v-model="myCampaigns" type="checkbox">
        Show only my tasks
      </label>
      <sort-filters @sorted="onSort" @search="onSearch" @category="onFilter" @status="onStatusFilter" />
      <campaign-list :campaigns="filteredCampaigns" />
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

import CampaignList from '@/components/CampaignList'
import SortFilters from '@/components//SortAndFilters'

export default {
  components: {
    CampaignList,
    SortFilters
  },
  middleware: ['auth'],
  data () {
    return {
      filter: null,
      sort: null,
      myCampaigns: false,
      search: null,
      status: null
    }
  },
  computed: {
    ...mapGetters({
      batchesByCampaignId: 'campaign/batchesByCampaignId',
      campaignsByCategory: 'campaign/campaignsByCategory',
      reservationsByAccountId: 'campaign/reservationsByAccountId',
      getGridListState: 'view/getGridListState'
    }),
    filteredCampaigns () {
      const campaigns = this.campaignsByCategory(this.$route.query.category ? this.$route.query.category : this.filter)
      let filteredCampaigns
      if (campaigns) {
        filteredCampaigns = campaigns.map((c) => { return { ...c } })
        for (const i in filteredCampaigns) {
          const batches = this.batchesByCampaignId(filteredCampaigns[i].id)
          if (batches) {
            filteredCampaigns[i].num_tasks = batches.reduce(function (a, b) {
              return a + b.num_tasks
            }, 0)
            filteredCampaigns[i].tasks_done = batches.reduce(function (a, b) {
              return a + b.tasks_done
            }, 0)
          }
        }

        // Show newest campaigns first when we are not filtering active campaigns
        filteredCampaigns.reverse()
        if (this.myCampaigns) {
          filteredCampaigns = filteredCampaigns.filter(c => c.owner[1] === this.$auth.user.accountName)
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
          }], [this.sort.order, 'desc'])
        }
      }
      return filteredCampaigns
    }
  },
  created () {
  },
  methods: {
    onFilter (category) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: $tablet) {
  .is-pulled-right {
    float: none !important;
    margin-bottom: 25px;
  }
}
</style>
