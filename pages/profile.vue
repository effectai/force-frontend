<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title">
          Welcome
        </h4>
        <div class="subtitle">
          {{ $auth.user.address }}
        </div>
        {{ $auth.user }}
        <br>
        <a class="button is-danger" @click="logout">Logout</a>
        <br><br>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  middleware: ['auth'],
  computed: {
  },
  created () {
  },
  methods: {
    async logout () {
      this.$bsc.logout()
      await this.$auth.logout()
    }
  }
}
</script>

<style>
</style>
