export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_PENDING_PAYOUT (state, pendingPayout) {
      if (state.pendingPayouts === null) { state.pendingPayouts = {} }
      if (pendingPayout && pendingPayout.processed) {
        if (state.pendingPayouts[this.$auth.user.vAccountRows[0].id]) {
          state.pendingPayouts[this.$auth.user.vAccountRows[0].id].push(pendingPayout)
        } else {
          state.pendingPayouts[this.$auth.user.vAccountRows[0].id] = [pendingPayout]
        }
      }
    }
  },
  getters: {
    pendingById (state) {
      return id => state.pendingPayout ? state.pendingPayout.find(c => c.id === id) : null
    },
    transactionsByUser (state) {
      return userId => state.pendingPayout ? state.pendingPayout[userId] : null
    }
  },
  actions: {
    addPendingPayout ({ commit }, pendingPayout) {
      if (pendingPayout) {
        commit('ADD_PENDING_PAYOUT', pendingPayout)
      }
    }
  },
  state: () => {
    return {
      pendingPayouts: {}
    }
  }
}
