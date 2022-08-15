export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_NOTIFICATION (state, notification) {
      if (state.notifications === null || state.notifications === undefined) { state.notifications = [] }
      if (notification) {
        state.notifications.push(notification)
      }
    },
    CLEAR_NOTIFICATIONS (state) {
      state.notifications = null
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
    },
    clearNotifications ({ commit }) {
      commit('CLEAR_NOTIFICATIONS')
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
 * type: 'TASK_GROUP_ACCEPTED',
 * message: 'You have been accepted to the task group',
 * statusType: 'is-success', // ['is-primary', 'is-link', 'is-info', 'is-warning', 'is-danger'].
 * requesterName: 'John Doe',
 * taskGroupName: 'Task Group Name',
 * qualificationId: 'qualificationId',
 * qualificationType: 'qualificationType',
 * qualificationName: 'qualificationName',
 * qualificationImage: 'qualificationImage',
 * createdAt: new Date()
 */
