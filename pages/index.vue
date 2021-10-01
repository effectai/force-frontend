<template>
  <section class="section">
    <div class="container">
      <h2 class="title">
        Campaigns
      </h2>
      <campaign-list />
    </div>
  </section>
</template>

<script>
import CampaignList from '@/components/CampaignList'
export default {
  components: {
    CampaignList
  },
  middleware: ['auth'],
  created () {
  },
  methods: {
  }
}
</script>

<style>
</style>
