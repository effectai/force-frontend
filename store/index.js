import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['transaction']
})

export const plugins = [vuexLocal.plugin]
