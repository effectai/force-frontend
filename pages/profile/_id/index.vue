<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title is-spaced">
          Effect Account
        </h4>
        <div v-if="account" class="block">
          <div class="has-text-weight-bold is-size-6">
            {{ account[0].address[0] === 'address' ? 'BSC Address' : 'Account Name' }}:
          </div>
          <div class="subtitle">
            <div>
              <a
                v-if="account[0].address[0] === 'address'"
                :href="$blockchain.bsc.explorer + '/address/'+ account[0].address[1]"
                target="_blank"
                class="blockchain-address"
              >{{ account[0].address[1] }}</a>
              <a
                v-else
                :href="$blockchain.eos.explorer + '/address/'+ account[0].address[1]"
                target="_blank"
              >{{ account[0].address[1] }}</a>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            Effect Account ID:
          </div>
          <div class="subtitle">
            {{ id }}
          </div>
        </div>
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            Blockchain:
          </div>
          <div class="subtitle">
            <a
              :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.account.config.ACCOUNT_CONTRACT}?loadContract=true&tab=Tables&table=account&account=${$blockchain.sdk.account.config.ACCOUNT_CONTRACT}&scope=${$blockchain.sdk.account.config.ACCOUNT_CONTRACT}&limit=1&lower_bound=${id}&upper_bound=${id}`"
              target="_blank"
            >View on explorer</a>
          </div>
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
      id: parseInt(this.$route.params.id),
      account: null
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      this.account = await this.$blockchain.getVAccountById(this.id)
    }
  }
}
</script>

<style>
</style>
