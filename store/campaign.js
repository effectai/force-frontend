const qs = require('qs')

const API_BASE = process.env.NUXT_ENV_BACKEND_URL

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
    async getCampaigns ({ commit, state }, filters) {
      commit('SET_LOADING', true)
      try {
        const campaigns = await this.$axios.get(`${API_BASE}/worker/campaigns`, {
          params: {
            ...filters
          },
          paramsSerializer: (params) => {
            return qs.stringify(params)
          }
        })
        commit('SET_CAMPAIGNS', campaigns.data.results)
      } catch (e) {
        console.error(e)
        alert('error')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  state: {
    campaigns: null,
    loading: false
  }
}
