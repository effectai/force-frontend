<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title is-spaced">
          Your Effect Account
        </h4>
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            {{ $auth.user.blockchain === 'bsc' ? 'BSC Address' : 'EOS Account Name' }}:
          </div>
          <div class="subtitle">
            <a
              :href="($auth.user.blockchain === 'bsc' ? $blockchain.bsc.explorer : $blockchain.eos.explorer) + '/address/'+ $auth.user.accountName"
              target="_blank"
              class="blockchain-address"
            >{{ $auth.user.accountName }}</a><span v-if="$blockchain.account.permission">@{{ $blockchain.account.permission }}</span>
          </div>
        </div>
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            Effect Account ID:
          </div>
          <div class="subtitle">
            {{ $auth.user.vAccountRows[0].id }}
          </div>
        </div>
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            Wallet Connection:
          </div>
          <div class="subtitle">
            {{ $auth.user.provider }}@{{ $auth.user.blockchain }}
          </div>
        </div>
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            Blockchain:
          </div>
          <div class="subtitle">
            <a
              :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.account.config.ACCOUNT_CONTRACT}?loadContract=true&tab=Tables&table=account&account=${$blockchain.sdk.account.config.ACCOUNT_CONTRACT}&scope=${$blockchain.sdk.account.config.ACCOUNT_CONTRACT}&limit=1&lower_bound=${$auth.user.vAccountRows[0].id}&upper_bound=${$auth.user.vAccountRows[0].id}`"
              target="_blank"
            >View on explorer</a>
          </div>
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
      await this.$auth.logout()
    }
  }
}
</script>

<style>
</style>
