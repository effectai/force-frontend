<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title">
          Welcome
        </h4>
        <div class="subtitle">
          <a
            :href="($auth.user.blockchain === 'bsc' ? $blockchain.bsc.explorer : $blockchain.eos.explorer) + '/address/'+ $auth.user.accountName"
            target="_blank"
            class="blockchain-address"
          >{{ $auth.user.accountName }}</a>
          {{ $auth.user }}
        </div>
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
      await this.$blockchain.logout()
      await this.$auth.logout()
    }
  }
}
</script>

<style>
</style>
