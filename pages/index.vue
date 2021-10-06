<template>
  <section class="section">
    <div class="container">
      <nuxt-link class="button is-ghost is-pulled-right" to="/campaigns">
        <span>All Campaigns</span>
      </nuxt-link>
      <h2 class="title">
        Active Tasks
      </h2>
      <batch-list />
    </div>
  </section>
</template>

<script>
import BatchList from '@/components/BatchList'
export default {
  components: {
    BatchList
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
