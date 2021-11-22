<template>
  <section class="section is-max-widescreen">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              All Campaigns
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/campaigns/${campaignId}`">
              Campaign {{ campaignId }}
            </nuxt-link>
          </li>
          <li class="is-active">
            <a aria-current="page">
              New Batch
            </a>
          </li>
        </ul>
      </nav>
      <div v-if="campaignLoading">
        Campaign loading..
      </div>
      <div v-else-if="!campaign">
        Could not retrieve campaign
      </div>
      <div v-else>
        <div class="title">
          Tasks
        </div>
        <div>
          <div v-for="(task,index) in tasks" :key="index">
            #{{ index }}: {{ task }} <span class="has-text-danger-dark is-size-5 has-text-weight-bold" @click="tasks.splice(index, 1)">x</span>
          </div>
          <div v-if="!tasks.length">
            No tasks..
          </div>
        </div>
        <form @submit.prevent="createTask">
          <div class="field">
            <div v-for="placeholder in placeholders" :key="placeholder" class="task-placeholder-value">
              <label class="label">{{ placeholder }}</label>
              <div class="control">
                <input v-model="task[placeholder]" type="text" class="input">
              </div>
              <div class="control">
                <button type="submit" class="button">
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </form>
        <form @submit.prevent="uploadBatch">
          <!-- <div class="field">
            <label class="label">Repetitions</label>
            <div class="control">
              <input v-model="repetitions" class="input" type="number" min="0" required>
            </div>
          </div> -->
          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-link" :disabled="!tasks.length">
                Submit
              </button>
            </div>
            <div class="control">
              <button class="button is-link is-light">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

function getMatches (string, regex, index) {
  index || (index = 1) // default to the first capturing group
  const matches = []
  let match
  while ((match = regex.exec(string))) {
    matches.push(match[index])
  }
  return matches
}

export default {
  middleware: ['auth'],
  data () {
    return {
      campaignId: parseInt(this.$route.params.id),
      repetitions: 1,
      task: {},
      tasks: [],
      placeholders: null,
      campaign: null
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading
    }),
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId'
    })
  },
  created () {
    this.getCampaign()
  },
  methods: {
    createTask () {
      this.tasks.push(this.task)
      this.task = this.getEmptyTask(this.placeholders)
    },
    getEmptyTask (placeholders) {
      const emptyTask = {}
      placeholders.forEach((placeholder) => {
        emptyTask[placeholder] = ''
      })
      return emptyTask
    },
    getPlaceholders (template) {
      const placeholders = getMatches(
        template,
        /\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g
      )
      const unique = [...new Set(placeholders)]
      this.placeholders = unique
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.campaignId)
      this.campaign = this.campaigns.find(c => c.id === this.campaignId)
      this.getPlaceholders(this.campaign.info.template)
      this.task = this.getEmptyTask(this.placeholders)
    },
    async uploadBatch () {
      try {
        const content = {
          tasks: this.tasks
        }
        const batchId = await this.getNewBatchId()
        const result = await this.$blockchain.createBatch(this.campaignId, batchId, content, this.repetitions)
        this.$store.dispatch('transaction/addTransaction', result)
        this.$router.push('/campaigns/' + this.campaignId)
      } catch (e) {
        this.$blockchain.handleError(e)
      }
    },
    async getNewBatchId () {
      await this.$store.dispatch('campaign/getBatches')

      if (this.batchByCampaignId(this.campaignId) !== null) {
        return this.batchByCampaignId(this.campaignId).length
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
