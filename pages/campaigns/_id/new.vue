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
      <form @submit.prevent="uploadBatch">
        <div class="field">
          <label class="label">Repetitions</label>
          <div class="control">
            <input v-model="repetitions" class="input" type="number" min="0" required>
          </div>
        </div>
        <div class="field">
          <label class="label">CSV?</label>
          <div class="control">
            <textarea v-model="tasks" class="textarea" required placeholder="{}" />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">
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
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['auth'],
  data () {
    return {
      campaignId: parseInt(this.$route.params.id),
      batchId: null,
      repetitions: null,
      tasks: null
    }
  },
  computed: {
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId'
    })
  },
  created () {
    this.getBatches()
  },
  methods: {
    async uploadBatch () {
      try {
        this.tasks = JSON.parse(this.tasks)
        const content = {
          tasks: this.tasks
        }
        await this.$blockchain.createBatch(this.campaignId, this.batchId, content, this.repetitions)
        this.$router.push('/campaigns/' + this.campaignId)
      } catch (e) {
        this.$blockchain.handleError(e)
      }
    },
    async getBatches () {
      await this.$store.dispatch('campaign/getBatches')

      if (this.batchByCampaignId(this.campaignId) !== null) {
        const batchesLength = this.batchByCampaignId(this.campaignId).length
        this.batchId = batchesLength
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
