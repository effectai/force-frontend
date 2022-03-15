<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 v-if="approved" class="title has-text-weight-bold is-full-mobile">
              Active Tasks
            </h1>
            <h1 v-else class="title has-text-weight-bold is-full-mobile has-text-danger">
              Unmoderated Tasks
            </h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a v-if="approved" class="button is-danger is-small is-light" @click="approved = false">
              View unmoderated tasks
            </a>
            <a v-else class="button is-success is-small is-light" @click="approved = true">
              View approved tasks
            </a>
          </div>
          <div class="level-item">
            <nuxt-link v-if="hasCampaigns" class="button is-small is-ghost " to="/campaigns">
              <span>My Tasks</span>
            </nuxt-link>
          </div>
          <div class="level-item">
            <nuxt-link class="button is-primary" to="/campaigns/templates">
              <span class="icon">
                +
              </span>
              <span>Create Task</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <campaign-list :hide-campaigns="!approved ? approvedCampaigns : null" :approved-campaigns="approved ? approvedCampaigns : null" :category-filter="true" :active="true" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import approvedCampaigns from '@/approvedCampaigns.json'

import CampaignList from '@/components/CampaignList'
export default {
  components: {
    CampaignList
  },
  data () {
    return {
      approvedCampaigns,
      approved: true
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns
    }),
    hasCampaigns () {
      let hasCampaigns = false
      if (this.campaigns) {
        this.campaigns.forEach((c) => {
          if (this.$auth && this.$auth.user && c.owner[1] === this.$auth.user.accountName) {
            hasCampaigns = true
          }
        })
      }
      return hasCampaigns
    }
  },
  created () {
    if (!this.$auth || !this.$auth.loggedIn) {
      this.$router.push('/welcome')
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
