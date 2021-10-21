<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title is-spaced">
          Effect Account
        </h4>
        <div v-if="loading">
          Loading..
        </div>
        <div v-else-if="account">
          <div class="block">
            <div class="has-text-weight-bold is-size-6">
              {{ account.address[0] === 'address' ? 'BSC Address' : 'Account Name' }}:
            </div>
            <div class="subtitle">
              <div>
                <span
                  v-if="account.address[0] === 'address'"
                  class="blockchain-address"
                >{{ account.address[1] }}</span>
                <a
                  v-else
                  :href="$blockchain.eos.explorer + '/address/'+ account.address[1]"
                  target="_blank"
                >{{ account.address[1] }}</a>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="has-text-weight-bold is-size-6">
              Effect Account ID:
            </div>
            <div class="subtitle">
              {{ account.id }}
            </div>
          </div>
          <div class="block">
            <div class="has-text-weight-bold is-size-6">
              Blockchain:
            </div>
            <div class="subtitle">
              <a
                :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.account.config.account_contract}?loadContract=true&tab=Tables&table=account&account=${$blockchain.sdk.account.config.account_contract}&scope=${$blockchain.sdk.account.config.account_contract}&limit=1&lower_bound=${account.id}&upper_bound=${account.id}`"
                target="_blank"
              >View on explorer</a>
            </div>
          </div>
        </div>
        <div v-else>
          Could not retrieve account
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  middleware: ['auth'],
  data () {
    return {
      name: this.$route.params.name,
      account: null,
      loading: false
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      try {
        this.loading = true
        const accountRows = await this.$blockchain.getVAccountByName(this.name)
        if (accountRows && accountRows.length) {
          this.account = accountRows[0]
        }
      } catch (e) {
        this.$blockchain.handleError(e)
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
