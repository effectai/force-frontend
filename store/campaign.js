import Vue from 'vue'

export default {
  namespaced: true,
  modules: {},
  mutations: {
    UPSERT_CAMPAIGNS (state, campaigns) {
      if (!state.campaigns) {
        // We have no campaigns yet
        state.campaigns = campaigns
      } else {
        for (let i = 0; i < campaigns.length; i++) {
          const index = state.campaigns.findIndex(c => c.id === campaigns[i].id)
          if (index !== -1) {
            if (campaigns[i].content.field_1 === state.campaigns[index].content.field_1) {
              campaigns[i].info = state.campaigns[index].info
            }
            // Update existing campaign
            Vue.set(state.campaigns, index, campaigns[i])
          } else {
            // Insert new campaign
            state.campaigns.push(campaigns[i])
          }
        }
      }
    },
    SET_BATCHES (state, batches) {
      state.batches = batches
    },
    SET_SUBMISSIONS (state, submissions) {
      state.submissions = submissions
    },
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_LOADING_BATCH (state, loading) {
      state.loadingBatch = loading
    },
    SET_LOADING_SUBMISSIONS (state, loading) {
      state.loadingSubmissions = loading
    },
    SET_ALL_CAMPAIGNS_LOADED (state, allCampaignsLoaded) {
      state.allCampaignsLoaded = allCampaignsLoaded
    },
    SET_ALL_BATCHES_LOADED (state, allBatchesLoaded) {
      state.allBatchesLoaded = allBatchesLoaded
    },
    SET_ALL_SUBMISSIONS_LOADED (state, allSubmissionsLoaded) {
      state.allSubmissionsLoaded = allSubmissionsLoaded
    },
    SET_CAMPAIGN_INFO (state, { id, info }) {
      const index = state.campaigns.findIndex(campaign => campaign.id === id)
      const campaign = state.campaigns[index]
      if (JSON.stringify(info) !== JSON.stringify(campaign.info)) {
        // Info has changed, update
        campaign.info = info
        Vue.set(state.campaigns, index, campaign)
      }
    },
    SET_BATCH_TASKS (state, { batchId, tasks }) {
      const index = state.batches.findIndex(batch => batch.batch_id === batchId)
      const batch = state.batches[index]
      batch.tasks = tasks
      Vue.set(state.batches, index, batch)
    },
    ADD_CAMPAIGN (state, campaign) {
      if (state.campaigns) {
        state.campaigns.push(campaign)
      } else {
        state.campaigns = [campaign]
      }
    },
    ADD_BATCH (state, batch) {
      if (state.batches) {
        const index = state.batches.findIndex(b => b.batch_id === batch.batch_id)
        if (index === -1) {
          state.batches.push(batch)
        } else {
          Vue.set(state.batches, index, batch)
        }
      } else {
        state.batches = [batch]
      }
    }
  },
  getters: {
    campaignById (state) {
      return id => state.campaigns ? state.campaigns.find(c => c.id === id) : null
    },
    batchByCampaignId (state) {
      return id => state.batches ? state.batches.filter(b => b.campaign_id === id) : null
    },
    campaignsByCategory (state) {
      return category => state.campaigns && category ? state.campaigns.filter(c => c.info ? c.info.category === category : false) : state.campaigns
    },
    submissionsByBatchId (state) {
      return id => state.submissions ? state.submissions.filter(s => s.batch_id === id) : null
    },
    submissionsByAccountId (state) {
      return id => state.submissions ? state.submissions.filter(s => s.account_id === id) : null
    }
  },
  actions: {
    async getBatches ({ dispatch, commit, state }, nextKey) {
      if (!nextKey && state.loadingBatch) {
        console.log('Already retrieving batches somewhere else, aborting..')
        return
      }
      commit('SET_LOADING_BATCH', true)
      try {
        const data = await this.$blockchain.getBatches(nextKey)
        let batches = state.batches
        if (!nextKey) {
          batches = data.rows
        } else {
          batches = batches.concat(data.rows)
        }
        commit('SET_BATCHES', batches)

        if (data.more) {
          await dispatch('getBatches', data.next_key)
        } else {
          // No more campaigns, we are done
          commit('SET_ALL_BATCHES_LOADED', true)
          commit('SET_LOADING_BATCH', false)
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING_BATCH', false)
      }
    },
    async getBatch ({ dispatch, commit, state }, { batchId }) {
      commit('SET_LOADING_BATCH', true)
      const hardRefresh = true
      try {
        const batchFilter = c => c.batch_id === batchId
        if (!state.batches || !state.batches.find(batchFilter) || hardRefresh) {
          const data = await this.$blockchain.getBatches(batchId, 1)

          if (data.rows.length > 0) {
            await commit('ADD_BATCH', data.rows[0])
          } else {
            throw new Error('Cannot find batch with the given id.')
          }
        }
        // If batch exists but doesnt have tasks yet get tasks
        if (state.batches && state.batches.find(batchFilter) && !state.batches.find(batchFilter).tasks) {
          await dispatch('getBatchTasks', state.batches.find(batchFilter))
        }
      } catch (error) {
        this.$blockchain.handleError(error)
      }
      commit('SET_LOADING_BATCH', false)
    },
    async getCampaign ({ dispatch, commit, state }, id) {
      commit('SET_LOADING', true)
      try {
        if (!state.campaigns || !state.campaigns.find(c => c.id === id)) {
          const data = await this.$blockchain.getCampaigns(id, 1, false)

          if (data.rows.length > 0) {
            commit('ADD_CAMPAIGN', data.rows[0])
            await dispatch('processCampaign', data.rows[0])
          } else {
            throw new Error('Cannot find campaign with the given id.')
          }
        }

        // No more campaign, we are done
        commit('SET_LOADING', false)
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING', false)
      }
    },
    async getCampaigns ({ dispatch, commit, state }, nextKey) {
      if (!nextKey && state.loading) {
        console.log('Already retrieving campaigns somewhere else, aborting..')
        return
      }
      commit('SET_LOADING', true)
      try {
        const data = await this.$blockchain.getCampaigns(nextKey, 50, false)
        let campaigns = state.campaigns
        campaigns = data.rows
        commit('UPSERT_CAMPAIGNS', campaigns);

        // Process campaigns asynchronously from retrieving campaigns, but synchronously for multi-campaign processing
        (async () => {
          for (const campaign of campaigns) {
            await dispatch('processCampaign', campaign)
          }
        })()

        if (data.more) {
          await dispatch('getCampaigns', data.next_key)
        } else {
          // No more campaigns, we are done
          commit('SET_ALL_CAMPAIGNS_LOADED', true)
          commit('SET_LOADING', false)
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING', false)
      }
    },
    async processCampaign ({ commit, rootGetters, dispatch }, campaign) {
      try {
        // field_0 represents the content type where:
        // 0: IPFS
        if (campaign.content.field_0 === 0) {
          // field_1 represents the IPFS hash
          // Save IPFS content it in the store if its not there yet
          await dispatch('ipfs/getIpfsContent', campaign.content.field_1, { root: true })
          const info = rootGetters['ipfs/ipfsContentByHash'](campaign.content.field_1)
          commit('SET_CAMPAIGN_INFO', { id: campaign.id, info })
        }
      } catch (e) {
        commit('SET_CAMPAIGN_INFO', { id: campaign.id, info: null })
      }
    },
    async getSubmissions ({ dispatch, commit, state }, nextKey) {
      if (!nextKey && state.loadingSubmissions) {
        console.log('Already retrieving submissions somewhere else, aborting..')
        return
      }
      commit('SET_LOADING_SUBMISSIONS', true)
      try {
        const data = await this.$blockchain.getSubmissions(nextKey, 50, false)
        let submissions = state.submissions
        if (!nextKey) {
          submissions = data.rows
        } else {
          submissions = submissions.concat(data.rows)
        }
        commit('SET_SUBMISSIONS', submissions)

        if (data.more) {
          await dispatch('getSubmissions', data.next_key)
        } else {
          // No more campaigns, we are done
          commit('SET_ALL_SUBMISSIONS_LOADED', true)
          commit('SET_LOADING_SUBMISSIONS', false)
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        commit('SET_LOADING_SUBMISSIONS', false)
      }
    },
    async getBatchTasks ({ commit, rootGetters, dispatch }, batch) {
      try {
        // field_0 represents the content type where:
        // 0: IPFS
        if (batch.content.field_0 === 0) {
          // field_1 represents the IPFS hash
          // Save IPFS content it in the store if its not there yet
          await dispatch('ipfs/getIpfsContent', batch.content.field_1, { root: true })
          const tasks = rootGetters['ipfs/ipfsContentByHash'](batch.content.field_1)
          commit('SET_BATCH_TASKS', { batchId: batch.batch_id, tasks: tasks.tasks })
        }
      } catch (e) {
        commit('SET_BATCH_TASKS', { batchId: batch.batch_id, tasks: null })
      }
    }
  },
  state: () => {
    return {
      batches: null,
      campaigns: null,
      submissions: null,
      loading: false,
      loadingBatch: false,
      loadingSubmissions: false,
      allCampaignsLoaded: false,
      allBatchesLoaded: false,
      allSubmissionsLoaded: false
    }
  }
}
