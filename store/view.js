export default {
  namespaced: true,
  modules: {},
  mutations: {
    SET_GRID_LIST (state, value) {
      if (typeof value === 'undefined') {
        state.grid = !state.grid
      } else {
        state.grid = value
      }
    },
    ADD_JOINED_CAMPAIGN (state, campaignId) {
      if (state.batches) {
        const index = state.joinedCampaigns.findIndex(c => c === campaignId)
        if (index === -1) {
          state.batches.push(campaignId)
        }
      } else {
        state.joinedCampaigns = [campaignId]
      }
    }
  },
  state: () => {
    return {
      grid: true,
      joinedCampaigns: []
    }
  }
}
