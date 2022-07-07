
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export default {
  namespaced: true,
  modules: {},
  mutations: {
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    UPSERT_QUALIFICATIONS (state, qualifications) {
      if (!state.qualifications) {
        // We have no qualifications yet
        state.qualifications = qualifications
      } else {
        const updatedQualifications = state.qualifications.map((c) => { return { ...c } })
        for (let i = 0; i < qualifications.length; i++) {
          const index = state.qualifications.findIndex(c => c.id === qualifications[i].id)
          if (index !== -1) {
            if (qualifications[i].content.field_1 === state.qualifications[index].content.field_1) {
              qualifications[i].info = state.qualifications[index].info
            }
            // Update existing Qualification
            updatedQualifications[index] = qualifications[i]
          } else {
            // Insert new Qualification
            updatedQualifications.push(qualifications[i])
          }
        }
        state.qualifications = updatedQualifications
      }
    },
    SET_ALL_QUALIFICATION_LOADED (state, allQualificationsLoaded) {
      state.allQualificationsLoaded = allQualificationsLoaded
    },
    UPSERT_ASSIGNED_QUALIFICATIONS (state, assignedQualifications) {
      if (!state.assignedQualifications) {
        // We have no qualifications yet
        state.assignedQualifications = assignedQualifications
      } else {
        const updatedQualifications = state.assignedQualifications.map((c) => { return { ...c } })
        for (let i = 0; i < assignedQualifications.length; i++) {
          const index = state.assignedQualifications.findIndex(c => c.id === assignedQualifications[i].id)
          if (index !== -1) {
            if (assignedQualifications[i].content.field_1 === state.assignedQualifications[index].content.field_1) {
              assignedQualifications[i].info = state.assignedQualifications[index].info
            }
            // Update existing Qualification
            updatedQualifications[index] = assignedQualifications[i]
          } else {
            // Insert new Qualification
            updatedQualifications.push(assignedQualifications[i])
          }
        }
        state.assignedQualifications = updatedQualifications
      }
    },
    SET_ALL_ASSIGNED_QUALIFICATION_LOADED (state, allAssignedQualificationsLoaded) {
      state.allAssignedQualificationsLoaded = allAssignedQualificationsLoaded
    }
  },
  getters: {
    qualificationById (state) {
      return id => state.qualifications ? state.qualifications.find(c => c.id === id) : null
    },
    qualificationByUser (state) {
      return id => state.qualifications ? state.qualifications.filter(qual => qual.account_id === id) : null
    }
  },
  actions: {
    async getQualification ({ dispatch, commit, state }, id) {
      commit('SET_LOADING', true)
      try {
        let qualification
        if (state.qualifications) {
          qualification = state.qualifications.find(c => c.id === id)
        }
        if (!qualification) {
          const data = await this.$blockchain.getQualification(id, 1, false)

          if (data.rows.length > 0) {
            commit('ADD_QUALIFICATION', data.rows[0])
            await dispatch('processQualification', data.rows[0])
          } else {
            throw new Error('Cannot find qualification with the given id.')
          }
        } else if (!qualification.info) {
          await dispatch('processQualification', qualification)
        }

        // No more qualification, we are done
        commit('SET_LOADING', false)
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING', false)
      }
    },
    async getQualifications ({ dispatch, rootGetters, commit, state }, nextKey) {
      if (!nextKey && state.loading) {
        console.log('Already retrieving qualifications somewhere else, aborting..')
        return
      }
      commit('SET_LOADING', true)
      try {
        const data = await this.$blockchain.getQualifications(nextKey, 200, true)

        if (!state.allQualificationsLoaded) {
          commit('UPSERT_QUALIFICATIONS', data.rows)
        }
        const qualifications = data.rows
        setTimeout(() => {
          commit('UPSERT_QUALIFICATIONS', qualifications)
        }, 0)

        if (data.more) {
          console.log('retrieving more qualifications..')
          await sleep(100)
          await dispatch('getQualifications', data.next_key)
        } else {
          // No more Qualifications, we are done
          commit('SET_ALL_QUALIFICATION_LOADED', true)
          commit('SET_LOADING', false)
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING', false)
      }
    },
    async getAssignedQualifications ({ dispatch, rootGetters, commit, state }, nextKey) {
      if (!nextKey && state.loading) {
        console.log('Already retrieving assigned qualifications somewhere else, aborting..')
        return
      }
      commit('SET_LOADING', true)
      try {
        const data = await this.$blockchain.getAssignedQualifications(nextKey, 200, true)

        if (!state.allAssignedQualificationsLoaded) {
          commit('UPSERT_ASSIGNED_QUALIFICATIONS', data)
        }
        const qualifications = data
        setTimeout(() => {
          commit('UPSERT_ASSIGNED_QUALIFICATIONS', qualifications)
        }, 0)

        if (data.more) {
          console.log('retrieving more assigned qualifications..')
          await sleep(100)
          await dispatch('getAssignedQualifications', data.next_key)
        } else {
          // No more Qualifications, we are done
          commit('SET_ALL_ASSIGNED_QUALIFICATION_LOADED', true)
          commit('SET_LOADING', false)
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING', false)
      }
    },
    async processQualification ({ commit, rootGetters, dispatch }, qualification) {
      try {
        // field_0 represents the content type where:
        // 0: IPFS
        if (qualification.content.field_0 === 0) {
          // field_1 represents the IPFS hash
          // Save IPFS content it in the store if its not there yet
          await dispatch('ipfs/getIpfsContent', qualification.content.field_1, { root: true })
          const info = rootGetters['ipfs/ipfsContentByHash'](qualification.content.field_1)
          commit('SET_QUALIFICATION_INFO', { id: qualification.id, info })
        }
      } catch (e) {
        commit('SET_QUALIFICATION_INFO', { id: qualification.id, info: null })
      }
    }
  },
  state: () => {
    return {
      qualifications: null,
      assignedQualifications: null,
      loading: false,
      allQualificationsLoaded: false,
      allAssignedQualificationsLoaded: false
    }
  }
}
