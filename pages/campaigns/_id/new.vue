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
          </li>eosjs 
        </ul>
      </nav>
      <form>
        <div class="field">
          <label class="label">Repetitions</label>
          <div class="control">
            <input class="input" type="text">
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      campaignId: parseInt(this.$route.params.id)
    }
  },
  created () {
    this.countBatches()
  },
  methods: {
    async countBatches () {
      const data = await this.$blockchain.countBatches(this.campaignId)
      if (data) {
        console.log(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
