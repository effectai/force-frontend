<template>
  <section class="section">
    <div class="container">
      <div>
        <div class="py-2">
          <h2 class="title is-4 mt-6 is-spaced">
            Transactions
          </h2>
          <p>Transaction made by this account on Effect Force.*</p>
          <div v-if="transactions" class="table-container mt-5">
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
          <p class="is-size-7">* This list may vary on different devices, as the transactions are saved locally in the browser.</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination.vue'

export default {
  components: { Pagination },
  filters: {},
  middleware: ['auth'],
  data () {
    return {
      loading: null,
      page: 1,
      perPage: 10,
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
    setPage (newPage) {
      this.page = newPage
    }
  }
}
</script>
