<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title">
          Welcome
        </h4>
        <div v-if="$auth.user.blockchain.bsc" class="subtitle">
          <a
            :href="$bsc.explorer + '/address/'+ $auth.user.blockchain.bsc"
            target="_blank"
            class="blockchain-address"
          >{{ $auth.user.blockchain.bsc }}</a>
        </div>
        <div v-else-if="$auth.user.blockchain.eos" class="subtitle">
          <a
            :href="$eos.explorer + '/address/'+ $auth.user.blockchain.eos.accountName"
            target="_blank"
            class="blockchain-address"
          >{{ $auth.user.blockchain.eos.accountName }}</a>
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
