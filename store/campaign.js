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
        commit('SET_CAMPAIGNS', campaigns)
        if (data.more) {
          dispatch('getCampaigns', data.next_key)
        } else {
          // No more campaigns, we are done
          commit('SET_LOADING', false)
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING', false)
      }
    }
  },
  state: {
    campaigns: null,
    loading: false
  }
}
