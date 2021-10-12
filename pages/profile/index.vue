<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title is-spaced">
          Your Effect Account
        </h4>
        <balance />
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            {{ $auth.user.blockchain === 'bsc' ? 'BSC Address' : 'EOS Account Name' }}:
          </div>
          <div class="subtitle">
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
              class="blockchain-address"
            >{{ $auth.user.accountName }}</a><span v-if="$auth.user.permission">@{{ $auth.user.permission }}</span>
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
        <hr>
        <h4 class="title is-4 is-spaced">
          Transactions
        </h4>
        <table v-if="transactions" class="table" style="width: 100%">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in transactions"
              :key="transaction.transaction_id"
            >
              <td><a
                :href="`${$blockchain.eos.explorer}/transaction/${transaction.transaction_id}`"
                target="_blank"
              >{{ transaction.transaction_id }}</a></td>
              <td>{{ transaction.processed.action_traces[0].act.name }}</td>
              <td>{{ new Date(transaction.processed.block_time).toLocaleString() }}</td>
              <td>{{ transaction.processed.receipt.status }}</td>
              <th><a
                :href="`${$blockchain.eos.explorer}/transaction/${transaction.transaction_id}`"
                target="_blank"
              >View on explorer</a>
              </th>
            </tr>
          </tbody>
        </table>
        <span v-else>No transactions found</span>
        <hr>
        <a class="button is-danger" @click="logout">Logout</a>
        <br><br>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Balance from '@/components/Balance'
export default {
  components: { Balance },
  middleware: ['auth'],
  computed: {
    ...mapState({
      transactions: state => state.transaction.transactions
    })
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
