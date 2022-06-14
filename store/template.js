export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_TEMPLATE (state, template) {
      if (state.templates === null) { state.templates = {} }
      if (template) {
        state.templates[template.name] = template
      }
    }
  },
  getters: {
    getTemplates (state) {
      return state.templates
    }
  },
  actions: {
    addTemplate ({ commit }, template) {
      if (template) {
        commit('ADD_TEMPLATE', template)
      }
    },
    async getTemplates ({ dispatch, commit, state }) {
      try {
        const response = await fetch('https://api.github.com/repos/effectai/effect-force-templates/git/trees/master', { mode: 'cors' })
        const templatesTree = (await response.json()).tree.find(t => t.path === 'templates')
        if (templatesTree) {
          const response2 = await fetch(templatesTree.url, { mode: 'cors' })
          const templatesTrees = (await response2.json()).tree
          templatesTrees.forEach((template) => {
            dispatch('addTemplate', {
              name: template.path,
              url: `https://raw.githubusercontent.com/effectai/effect-force-templates/master/templates/${template.path}/template.json`,
              placeholders: `https://raw.githubusercontent.com/effectai/effect-force-templates/master/templates/${template.path}/example_task.json`
            })
          })
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING', false)
      }
    }
  },
  state: () => {
    return {
      templates: {}
    }
  }
}
