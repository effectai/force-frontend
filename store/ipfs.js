export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_IPFS_CONTENT (state, ipfs) {
      if (state.ipfsContent === null) { state.ipfsContent = {} }
      if (!state.ipfsContent[ipfs.hash] || ipfs.info) {
        state.ipfsContent[ipfs.hash] = ipfs.info
      }
    }
  },
  getters: {
    ipfsContentByHash (state) {
      return hash => state.ipfsContent && state.ipfsContent[hash] ? state.ipfsContent[hash] : undefined
    }
  },
  actions: {
    async getIpfsContent ({ commit, getters }, hash) {
      if (typeof getters.ipfsContentByHash(hash) === 'undefined') {
        let info
        try {
          // TODO: properly check for valid IPFS hash
          if (hash && !hash.includes(' ')) {
            info = await this.$blockchain.sdk.force.getIpfsContent(hash)
          }
        } catch (e) {
          console.error('could not retrieve IPFS', e)
        }
        commit('ADD_IPFS_CONTENT', { hash, info })
      }
    }
  },
  state: () => {
    return {
      ipfsContent: {}
    }
  }
}
