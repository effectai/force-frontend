import Vue from 'vue'
// const API_BASE = process.env.NUXT_ENV_BACKEND_URL

export default {
  namespaced: true,
  modules: {},
  mutations: {
    SET_CAMPAIGNS (state, campaigns) {
      state.campaigns = campaigns
    },
    SET_BATCHES (state, batches) {
      state.batches = batches
    },
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_LOADING_BATCH (state, loading) {
      state.loadingBatch = loading
    },
    SET_ALL_CAMPAIGNS_LOADED (state, allCampaignsLoaded) {
      state.allCampaignsLoaded = allCampaignsLoaded
    },
    SET_ALL_BATCHES_LOADED (state, allBatchesLoaded) {
      state.allBatchesLoaded = allBatchesLoaded
    },
    SET_CAMPAIGN_INFO (state, { id, info }) {
      const index = state.campaigns.findIndex(campaign => campaign.id === id)
      const campaign = state.campaigns[index]
      campaign.info = info
      Vue.set(state.campaigns, index, campaign)
    },
    SET_BATCH_TASKS (state, { id, campaignId, tasks }) {
      const index = state.batches.findIndex(batch => batch.id === id && batch.campaign_id === campaignId)
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
        state.batches.push(batch)
      } else {
        state.batches = [batch]
      }
    }
  },
  getters: {
    campaignById (state) {
      return id => state.campaigns ? state.campaigns.find(c => c.id === id) : null
    }
  },
  actions: {
    async getBatches ({ dispatch, commit, state }, nextKey) {
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
    async getBatch ({ dispatch, commit, state }, { id, campaignId }) {
      commit('SET_LOADING_BATCH', true)
      try {
        const batchFilter = c => c.id === id && c.campaign_id === campaignId
        if (!state.batches || !state.batches.find(batchFilter)) {
          const data = await this.$blockchain.getBatches(this.$blockchain.sdk.force.getCompositeKey(id, campaignId), 1)

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
          const data = await this.$blockchain.getCampaigns(id, 1)

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
      commit('SET_LOADING', true)
      try {
        const data = await this.$blockchain.getCampaigns(nextKey)
        let campaigns = state.campaigns
        if (!nextKey) {
          campaigns = data.rows
        } else {
          campaigns = campaigns.concat(data.rows)
        }
        commit('SET_CAMPAIGNS', campaigns);

        // Process campaigns asynchronously from retrieving campaigns, but synchronously for multi-campaign processing
        (async () => {
          for (const campaign of campaigns) {
            // await new Promise(resolve => setTimeout(resolve, 100))
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
    async processCampaign ({ commit }, campaign) {
      try {
        // field_0 represents the content type where:
        // 0: IPFS
        if (campaign.content.field_0 === 0) {
          // field_1 represents the IPFS hash
          const info = await this.$blockchain.sdk.getIpfsContent(campaign.content.field_1)
          commit('SET_CAMPAIGN_INFO', { id: campaign.id, info })
        }
      } catch (e) {
        commit('SET_CAMPAIGN_INFO', { id: campaign.id, info: null })
      }
    },
    async getBatchTasks ({ commit }, batch) {
      try {
        // field_0 represents the content type where:
        // 0: IPFS
        if (batch.content.field_0 === 0) {
          // field_1 represents the IPFS hash
          const tasks = await this.$blockchain.sdk.getIpfsContent(batch.content.field_1)
          commit('SET_BATCH_TASKS', { id: batch.id, campaignId: batch.campaign_id, tasks: tasks.tasks })
        }
      } catch (e) {
        commit('SET_BATCH_TASKS', { id: batch.id, tasks: null })
      }
    }
  },
  state: {
    batches: null,
    campaigns: null,
    loading: false,
    loadingBatch: false,
    allCampaignsLoaded: false,
    allBatchesLoaded: false
  }
}
