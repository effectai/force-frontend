export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_TRANSACTION (state, transaction) {
      if (state.transactions) {
        state.transactions.push(transaction)
      } else {
        state.transactions = [transaction]
      }
    }
  },
  getters: {
    transactionById (state) {
      return id => state.transactions ? state.transactions.find(c => c.id === id) : null
    }
  },
  actions: {
    addTransaction ({ commit }, transaction) {
      commit('ADD_TRANSACTION', transaction)
    }
  },
  state: {
    transactions: null
  }
}
