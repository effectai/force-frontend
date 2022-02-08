<template>
  <section class="section">
    <div class="container mt-5">
      <div class="text-center">
        <h4 class="title is-spaced">
          <!-- Effect Account (ID: {{ $auth.user.vAccountRows[0].id }}) -->
          Effect Account | {{ $auth.user.provider }}@{{ $auth.user.blockchain }}
        </h4>
        <balance />
        <div class="columns">
          <div class="column">
            <div class="block">
              <div class="has-text-weight-bold is-size-6">
                Account Name:
              </div>
                <a
                  class="is-flex is-clipped"
                  :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.account.config.account_contract}?loadContract=true&tab=Tables&table=account&account=${$blockchain.sdk.account.config.account_contract}&scope=${$blockchain.sdk.account.config.account_contract}&limit=1&lower_bound=${$auth.user.vAccountRows[0].id}&upper_bound=${$auth.user.vAccountRows[0].id}`"
                  target="_blank"
                >{{ $auth.user.accountName }}</a>
            </div>
          </div>
          <div class="column">
            <div class="block">
              <div class="has-text-weight-bold is-size-6 is-vecentered">
                <span>{{ $auth.user.blockchain === 'bsc' ? '' : 'EOS Account Name' }}</span>
                <span v-if="$auth.user.blockchain === 'bsc'">
                  <button class="button is-info is-light is-small" @click="showPK = !showPK">
                    <strong>BSC PrivateKey</strong>
                  </button>
                  <span>&nbsp;BSC Address:</span>
                  </span>
              </div>
              <a
                v-if="$auth.user.blockchain === 'bsc'"
                :href="$blockchain.bsc.explorer + '/address/'+ $auth.user.address"
                target="_blank"
                class="blockchain-address is-flex is-clipped"
              >{{ $auth.user.address }}</a>
              <a
                v-else
                :href="$blockchain.eos.explorer + '/address/'+ $auth.user.accountName"
                target="_blank"
                class="blockchain-address"
              >{{ $auth.user.accountName }}</a><span v-if="$auth.user.permission">@{{ $auth.user.permission }}</span>
            </div>
          </div>
          <div class="column">
          <div class="block">
            <div class="has-text-weight-bold is-size-6">
              ID:
            </div>
              {{ $auth.user.vAccountRows[0].id }}
          </div>
          </div>
          <div class="column">
            <div class="block">

            </div>
          </div>
        </div>
        <!-- <hr>
        <h2 class="title is-4">
          Pending Payout
        </h2> -->
        <!-- <pending-payout class="mb-6" :owner="$auth.user.accountName"/> -->
        <hr>
        <h2 class="title is-4">
          My Campaigns
        </h2>
        <campaign-list class="mb-6" :owner="$auth.user.accountName" />
        <hr>
        <h4 class="title is-4 is-spaced">
          Transactions
        </h4>
        <div v-if="transactions" class="table-container">
          <table class="table" style="width: 100%">
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
                  >{{ transaction.transaction_id.substr(0, 30) }}&hellip;</a>
                </td>
                <td><span v-if="transaction.processed && transaction.processed.action_traces">{{ transaction.processed.action_traces[0].act.name }}</span></td>
                <td><span v-if="transaction.processed">{{ new Date(transaction.processed.block_time).toLocaleString() }}</span></td>
                <td><span v-if="transaction.processed && transaction.processed.receipt">{{ transaction.processed.receipt.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
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
      <key-modal v-if="showPK" @close="showPK = !showPK" :message="$auth.user.privateKey" :title="'PrivateKey 🔑'" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import Balance from '@/components/Balance'
import CampaignList from '@/components/CampaignList'
import KeyModal from '@/components/KeyModal.vue'
// import PendingPayout from '~/components/PendingPayout.vue'

export default {
  components: { Balance, CampaignList, Pagination, KeyModal /* , PendingPayout */ },
  filters: {
    hide (value, show) {
      if (show) {
        return value
      } else {
        return value.toString().split('').map(() => '•').join('')
      }
    }
  },
  middleware: ['auth'],
  data () {
    return {
      page: 1,
      perPage: 10,
      showPK: false,
      pages: [],
      pending: []
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
    }
  }
}
</script>

<style>
</style>
