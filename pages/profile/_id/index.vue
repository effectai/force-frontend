<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 v-if="loggedIn" class="title is-spaced">
          Your Effect Account
        </h4>
        <h4 v-else class="title is-spaced">
          Effect Account
        </h4>
        <balance />
        <div class="block">
          <pre>{{ account }}</pre>
          <div v-if="account" class="has-text-weight-bold is-size-6">
            {{ account[0].address[0] === 'address' ? 'BSC Address' : 'Account Name' }}:
          </div>
          <div class="subtitle">
            <div v-if="loggedIn">
              <a
                v-if="$auth.user.blockchain === 'bsc'"
                :href="$blockchain.bsc.explorer + '/address/'+ $auth.user.publicKey"
                target="_blank"
                class="blockchain-address"
              >{{ $auth.user.publicKey }}</a>
              <a
                v-else
                :href="$blockchain.eos.explorer + '/address/'+ $auth.user.accountName"
                target="_blank"
              >{{ $auth.user.accountName }}</a><span v-if="$auth.user.permission">@{{ $auth.user.permission }}</span>
            </div>
            <!-- <div v-else>
              <a
                v-if="account[0].address[0] === 'address'"
                :href="$blockchain.bsc.explorer + '/address/'+ account[0].address[1]"
                target="_blank"
                class="blockchain-address"
              >{{ $auth.user.publicKey }}</a>
              <a
                v-else
                :href="$blockchain.eos.explorer + '/address/'+ account[0].address[1]"
                target="_blank"
              >{{ $auth.user.accountName }}</a><span v-if="$auth.user.permission">@{{ $auth.user.permission }}</span>
            </div> -->
          </div>
        </div>
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            {{ $auth.user.blockchain === 'bsc' ? 'Account Address' : 'Public Key' }}:
          </div>
          <div class="subtitle">
            <div
              v-if="$auth.user.blockchain === 'bsc'"
              class="blockchain-address"
            >
              {{ $auth.user.accountName }}
            </div>
            <a
              v-else
              :href="$blockchain.eos.explorer + '/address/'+ $auth.user.publicKey"
              target="_blank"
              class="blockchain-address"
            >{{ $auth.user.publicKey }}</a>
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
  data () {
    return {
      id: parseInt(this.$route.params.id),
      account: null
    }
  },
  computed: {
    loggedIn () {
      return this.$auth.user.vAccountRows[0].id === this.id
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    },
    async getProfile () {
      this.account = await this.$blockchain.getVAccountById(this.id)
    }
  }
}
</script>

<style>
</style>
