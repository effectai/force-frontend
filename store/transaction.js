export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_TRANSACTION (state, transaction) {
      if (state.transactions === null) { state.transactions = {} }
      if (state.transactions[this.$auth.user.vAccountRows[0].id]) {
        state.transactions[this.$auth.user.vAccountRows[0].id].push(transaction)
      } else {
        state.transactions[this.$auth.user.vAccountRows[0].id] = [transaction]
      }
    }
  },
  getters: {
    transactionById (state) {
      return id => state.transactions ? state.transactions.find(c => c.id === id) : null
    },
    transactionsByUser (state) {
      return userId => state.transactions ? state.transactions[userId] : null
    }
  },
  actions: {
    addTransaction ({ commit }, transaction) {
      commit('ADD_TRANSACTION', transaction)
    }
  },
  state: {
    transactions: {}
  }
}
