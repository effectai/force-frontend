export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_IPFS_CONTENT (state, ipfs) {
      if (state.ipfsContent === null) { state.ipfsContent = {} }
      if (ipfs.info) {
        if (!state.ipfsContent[ipfs.hash]) {
          state.ipfsContent[ipfs.hash] = ipfs.info
        }
      }
    }
  },
  getters: {
    ipfsContentByHash (state) {
      return hash => state.ipfsContent && state.ipfsContent[hash] ? state.ipfsContent[hash] : null
    }
  },
  actions: {
    async getIpfsContent ({ commit, getters }, hash) {
      // there are a couple campaigns where field_1 has 'TypeError: Failed to fetch' as value instead of an IPFS hash
      if (!getters.ipfsContentByHash(hash) && hash !== 'TypeError: Failed to fetch') {
        const info = await this.$blockchain.sdk.force.getIpfsContent(hash)
        if (info) {
          commit('ADD_IPFS_CONTENT', { hash, info })
        }
      }
    }
  },
  state: () => {
    return {
      ipfsContent: {}
    }
  }
}
