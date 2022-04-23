import Vue from 'vue'

export default {
  namespaced: true,
  modules: {},
  mutations: {
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_QUALIFICATIONS_LIST (state, qualifications) {
      if (state.qualifications === null) {
        state.qualifications = {}
      }
      Vue.set(state, 'qualifications', qualifications)
    }
  },
  getters: {
    getqualifications (state) {
      return state.qualifications
    }
  },
  actions: {
    async loadqualifications (context) {
      context.commit('SET_LOADING', true)
      const data = await this.$blockchain.getAllQualifications.catch(console.error)
      context.commit({ type: 'SET_QUALIFICATIONS_LIST', qualifications: data })
      context.commit('SET_LOADING', false)
    }
  },
  state: () => {
    return {
      loading: false,
      qualifications: null
    }
  }
}
