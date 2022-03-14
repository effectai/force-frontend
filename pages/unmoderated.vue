<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-weight-bold is-full-mobile has-text-danger">
              Unmoderated Tasks
            </h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <nuxt-link to="/" class="button is-success is-small is-light">
              View approved tasks
            </nuxt-link>
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
      <campaign-list :category-filter="true" :active="true" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import CampaignList from '@/components/CampaignList'
export default {
  components: {
    CampaignList
  },
  middleware: ['auth'],
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns
    }),
    hasCampaigns () {
      let hasCampaigns = false
      if (this.campaigns) {
        this.campaigns.forEach((c) => {
          if (c.owner[1] === this.$auth.user.accountName) {
            hasCampaigns = true
          }
        })
      }
      return hasCampaigns
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
