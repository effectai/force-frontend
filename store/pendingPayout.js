import Vue from 'vue'

export default {
  namespaced: true,
  modules: {},
  mutations: {
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_PENDING_PAYOUT (state, payouts) {
      console.log('SET_PENDING_PAYOUT, state', state)
      console.log('SET_PENDING_PAYOUT, payouts', payouts)

      if (state.pendingPayouts === null) {
        state.pendingPayouts = {}
      }
      Vue.set(state, 'pendingPayouts', payouts)
    }
  },
  getters: {
    getPendingPayouts (state) {
      return state.pendingPayouts
    }
  },
  actions: {
    async loadPendingPayouts (context) {
      context.commit('SET_LOADING', true)
      console.log('loadPendingPayouts, context', context)
      const data = await this.$blockchain.getPendingPayouts().catch(console.error)
      console.log('loadPendingPayouts, data', data)
      // const rows = [...data.rows]

      console.log('Live from pendingpayout.js vuex store.', data)
      context.commit({ type: 'SET_PENDING_PAYOUT', payouts: data })
      // context.commit('SET_PENDING_PAYOUT', data.rows)
      context.commit('SET_LOADING', false)
    }
  },
  state: () => {
    return {
      loading: false,
      pendingPayouts: null
    }
  }
}
