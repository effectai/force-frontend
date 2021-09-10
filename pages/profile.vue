<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title">
          Welcome
        </h4>
        {{ $auth.user.blockchain }}
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
    console.log('user', this.$auth.user)
  },
  methods: {
    async logout () {
      await this.$eos.logout()
      await this.$bsc.logout()
      await this.$auth.logout()
    }
  }
}
</script>

<style>
</style>
