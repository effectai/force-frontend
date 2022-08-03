export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_NOTIFICATION (state, notification) {
      if (state.notifications === null || state.notifications === undefined) { state.notifications = [] }
      if (notification) {
        state.notifications.push(notification)
      }
    }
  },
  getters: {
    getAllNotifications (state) {
      return state.notifications.map(notification => notification.title)
    }
  },
  actions: {
    addNotification ({ commit }, notification) {
      if (notification) {
        commit('ADD_NOTIFICATION', notification)
      }
    }
  },
  state: () => {
    return {
      notifications: []
    }
  }
}

/**
 * Global method to add notifications.
 * Notificaitons should have this structure:
 * @param {String} title - The title of the notification.
 * @param {String} message - The message of the notification.
 * @param {String} type - The type of the notification Bulma colors:
 * ['primary', 'link', 'info', 'warning', 'danger'].
 */
