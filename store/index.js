import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: process.client ? window.localStorage : null,
  modules: ['transaction', 'ipfs', 'template', 'view']
})

export const plugins = [vuexLocal.plugin]
