export default {
  namespaced: true,
  modules: {},
  mutations: {
    TOGGLE_GRID_LIST_STATE (state) {
      state.gridListToggle = !state.gridListToggle
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
      gridListToggle: true
    }
  }
}
