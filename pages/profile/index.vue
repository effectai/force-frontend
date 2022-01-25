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
            Effect Account Name:
          </div>
          <div class="subtitle">
            {{ $auth.user.accountName }}
          </div>
        </div>
        <div class="block">
          <div class="has-text-weight-bold is-size-6">
            {{ $auth.user.blockchain === 'bsc' ? 'BSC Address' : 'EOS Account Name' }}:
          </div>
          <div class="subtitle">
            <a
              v-if="$auth.user.blockchain === 'bsc'"
              :href="$blockchain.bsc.explorer + '/address/'+ $auth.user.address"
              target="_blank"
              class="blockchain-address"
            >{{ $auth.user.address }}</a>
            <a
              v-else
              :href="$blockchain.eos.explorer + '/address/'+ $auth.user.accountName"
              target="_blank"
              class="blockchain-address"
            >{{ $auth.user.accountName }}</a><span v-if="$auth.user.permission">@{{ $auth.user.permission }}</span>
          </div>
        </div>
        <div v-if="$auth.user.provider ==='burner-wallet'" class="block">
          <div class="has-text-weight-bold is-size-6">
            Private key:
          </div>
          <div class="subtitle">
            <span class="has-text-link">{{ $auth.user.privateKey | hide(showPK) }}</span>
          </div>
          <button class="button is-light" @click="showPK = !showPK">
            <span v-if="showPK">Hide</span>
            <span v-else>Show</span>
          </button>
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
              :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.account.config.account_contract}?loadContract=true&tab=Tables&table=account&account=${$blockchain.sdk.account.config.account_contract}&scope=${$blockchain.sdk.account.config.account_contract}&limit=1&lower_bound=${$auth.user.vAccountRows[0].id}&upper_bound=${$auth.user.vAccountRows[0].id}`"
              target="_blank"
            >View on explorer</a>
          </div>
        </div>
        <hr>
        <h2 class="title is-4">
          My Campaigns
        </h2>
        <campaign-list class="mb-6" :owner="$auth.user.accountName" />
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
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in paginatedTransactions"
              :key="transaction.transaction_id"
            >
              <td>
                <a
                  :href="`${$blockchain.eos.explorer}/transaction/${transaction.transaction_id}`"
                  target="_blank"
                >{{ transaction.transaction_id }}</a>
              </td>
              <td><span v-if="transaction.processed && transaction.processed.action_traces">{{ transaction.processed.action_traces[0].act.name }}</span></td>
              <td><span v-if="transaction.processed">{{ new Date(transaction.processed.block_time).toLocaleString() }}</span></td>
              <td><span v-if="transaction.processed && transaction.processed.receipt">{{ transaction.processed.receipt.status }}</span></td>
              <th>
                <a
                  :href="`${$blockchain.eos.explorer}/transaction/${transaction.transaction_id}`"
                  target="_blank"
                >View on explorer</a>
              </th>
            </tr>
          </tbody>
        </table>
        <span v-else>No transactions found</span>
        <pagination
          v-if="transactions"
          :items="transactions.length"
          :page="page"
          :per-page="perPage"
          @setPage="setPage"
        />
        <hr>
        <a class="button is-danger" @click="logout">Logout</a>
        <br><br>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import Balance from '@/components/Balance'
import CampaignList from '@/components/CampaignList'

export default {
  components: { Balance, CampaignList, Pagination },
  filters: {
    hide (value, show) {
      if (show) {
        return value
      } else {
        value = value.toString()
        return value.split('').map(function (char) { char = '•'; return char }).join('')
      }
    }
  },
  middleware: ['auth'],
  data () {
    return {
      page: 1,
      perPage: 10,
      showPK: false,
      pages: []
    }
  },
  computed: {
    ...mapGetters({
      transactionsByUser: 'transaction/transactionsByUser'
    }),
    transactions () {
      return this.transactionsByUser(this.$auth.user.vAccountRows[0].id)
    },
    paginatedTransactions () {
      const start = (this.page - 1) * this.perPage
      if (this.transactions) {
        return this.transactions.slice(start, start + this.perPage)
      }
      return []
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    },
    setPage (newPage) {
      this.page = newPage
    },
    paginate (transactions) {
      const from = (this.page * this.perPage) - this.perPage
      const to = (this.page * this.perPage)
      return transactions.slice(from, to)
    }
  }
}
</script>

<style>
</style>
