export default {
  namespaced: true,
  modules: {},
  mutations: {
    TOGGLE_GRID_LIST_STATE (state) {
      if (state.gridListToggle == null) {
        state.gridListToggle = true
      } else {
        state.gridListToggle = !state.gridListToggle
      }
    }
  },
  getters: {
    getGridListState (state) {
      return state.gridListToggle
    }
  },
  actions: {
    toggleGridListState ({ commit }) {
      commit('TOGGLE_GRID_LIST_STATE')
    }
  },
  state: () => {
    return {
      gridListToggle: null
    }
  }
}
