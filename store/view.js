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
    }
  },
  state: () => {
    return {
      grid: false
    }
  }
}
