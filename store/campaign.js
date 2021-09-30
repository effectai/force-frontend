import Vue from 'vue'
// const API_BASE = process.env.NUXT_ENV_BACKEND_URL

export default {
  namespaced: true,
  modules: {},
  mutations: {
    SET_CAMPAIGNS (state, campaigns) {
      state.campaigns = campaigns
    },
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_CAMPAIGN_INFO (state, { id, info }) {
      const index = state.campaigns.findIndex(campaign => campaign.id === id)
      const campaign = state.campaigns[index]
      campaign.info = info
      Vue.set(state.campaigns, index, campaign)
    }
  },
  getters: {

  },
  actions: {
    async getCampaigns ({ dispatch, commit, state }, nextKey) {
      commit('SET_LOADING', true)
      try {
        const data = await this.$blockchain.getCampaigns(nextKey)
        let campaigns = state.campaigns
        if (!nextKey) {
          campaigns = data.rows
        } else {
          campaigns = campaigns.concat(data.rows)
        }
        commit('SET_CAMPAIGNS', campaigns);

        // Process campaigns asynchronously from retrieving campaigns, but synchronously for multi-campaign processing
        (async () => {
          for (const campaign of campaigns) {
            // await new Promise(resolve => setTimeout(resolve, 100))
            await dispatch('processCampaign', campaign)
          }
        })()

        if (data.more) {
          await dispatch('getCampaigns', data.next_key)
        } else {
          // No more campaigns, we are done
          commit('SET_LOADING', false)
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING', false)
      }
    },
    async processCampaign ({ commit }, campaign) {
      console.log(campaign.content_hash)
      const info = await this.$blockchain.sdk.getIpfsContent(campaign.content_hash)
      commit('SET_CAMPAIGN_INFO', { id: campaign.id, info })
    }
  },
  state: {
    campaigns: null,
    loading: false
  }
}
