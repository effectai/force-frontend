<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-weight-bold" :class="{'has-text-danger': !approved}">
              <span v-if="approved">Active</span><span v-else>Unmoderated</span> <span v-if="categoryFilter" class="is-capitalized">{{ categoryFilter }}</span> Tasks
            </h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a class="button is-small is-light" :class="{'is-danger': approved, 'is-success': !approved}" @click="approved = !approved">
              View <template v-if="approved">unmoderated</template><template v-else>approved</template> tasks
            </a>
          </div>
          <div class="level-item">
            <nuxt-link class="button is-primary is-small" to="/campaigns/templates">
              <span class="icon">+</span>
              <span>Create Task</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <category-filters :filter="categoryFilter" @categoryFilter="onCategoryFilter" />
      <campaign-list :campaigns="filteredCampaigns" :grid-toggle="true" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import CategoryFilters from '@/components/CategoryFilters'
import approvedCampaigns from '@/approvedCampaigns.json'
import CampaignList from '@/components/CampaignList'

export default {
  components: {
    CampaignList,
    CategoryFilters
  },
  data () {
    return {
      approvedCampaigns,
      approved: true,
      categoryFilter: this.$route.query.category
    }
  },
  computed: {
    ...mapGetters({
      batchesByCampaignId: 'campaign/batchesByCampaignId',
      campaignsByCategory: 'campaign/campaignsByCategory',
      reservationsByAccountId: 'campaign/reservationsByAccountId'
    }),
    reservations () {
      if (!this.$auth || !this.$auth.user || !this.$auth.user.vAccountRows) { return }
      let userReservations = this.reservationsByAccountId(this.$auth.user.vAccountRows[0].id)
      if (userReservations) {
        userReservations = userReservations.filter(r => parseInt(new Date(new Date(r.submitted_on) + 'UTC').getTime() / 1000) + parseInt(this.$blockchain.sdk.force.config.release_task_delay_sec.toFixed(0)) > parseInt((Date.now() / 1000).toFixed(0)))
      }
      return userReservations
    },
    filteredCampaigns () {
      const campaigns = this.campaignsByCategory(this.categoryFilter)
      let filteredCampaigns
      if (campaigns) {
        filteredCampaigns = campaigns.map((c) => { return { ...c } })
        if (this.approved) {
          filteredCampaigns = filteredCampaigns.filter(c => this.approvedCampaigns.includes(c.id))
        } else {
          filteredCampaigns = filteredCampaigns.filter(c => !this.approvedCampaigns.includes(c.id))
        }
        for (const i in filteredCampaigns) {
          const batches = this.batchesByCampaignId(filteredCampaigns[i].id)
          // get the reservations of the user for this campaign
          const reservationsOfUser = _.intersectionBy(batches, this.reservations, 'batch_id')
          filteredCampaigns[i].userHasReservation = (reservationsOfUser.length)
          filteredCampaigns[i].batches = batches
          if (batches) {
            filteredCampaigns[i].num_tasks = batches.reduce(function (a, b) {
              return a + b.num_tasks
            }, 0)
            filteredCampaigns[i].tasks_done = batches.reduce(function (a, b) {
              return a + b.tasks_done
            }, 0)
          }
        }
        // filter active campaigns
        filteredCampaigns = filteredCampaigns.filter(c => c.num_tasks - c.tasks_done > 0 || c.userHasReservation)
        // show the campaigns where the user has a resevation first
        filteredCampaigns = _.orderBy(filteredCampaigns, ['userHasReservation', 'id'], ['desc', 'asc'])
      }

      return filteredCampaigns
    }
  },
  watch: {
    '$route.query.category' (category) {
      this.onCategoryFilter(category)
    }
  },
  created () {
    if (!this.$auth || !this.$auth.loggedIn) {
      this.$router.push('/welcome')
    }
  },
  methods: {
    onCategoryFilter (category) {
      if (!category) {
        this.$router.replace('/')
      } else {
        this.$router.replace('/?category=' + category)
      }
      this.categoryFilter = category
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
