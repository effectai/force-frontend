<template>
  <section class="section">
    <div class="container mt-5">
      <div class="text-center">
        <h1 class="title is-spaced has-text-weight-bold is-full-mobile">
          <!-- Effect Account (ID: {{ $auth.user.vAccountRows[0].id }}) -->
          Effect Account | {{ $auth.user.provider }}@{{ $auth.user.blockchain }}
        </h1>
        <balance />
        <div class="columns my-auto">
          <div class="column">
            <div class="block">
              <div class="has-text-weight-bold is-size-6 is-vecentered" style="min-height: 32px;">
                <span>{{ $auth.user.blockchain === 'bsc' ? '' : 'EOS Account Name' }}</span>
                <span v-if="$auth.user.blockchain === 'bsc'">
                  <span>&nbsp;BSC Address</span>
                  <button v-if="$auth.user.provider === 'burner-wallet'" class="button is-info is-light is-small" @click="showPK = !showPK">
                    <span class="is-small icon">
                      <font-awesome-icon :icon="['fas', 'fa-key']" />
                    </span>
                  </button>
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
              <div class="has-text-weight-bold is-size-6" style="min-height: 32px;">
                Account Name
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
              <div class="has-text-weight-bold is-size-6" style="min-height: 32px;">
                ID
              </div>
              {{ $auth.user.vAccountRows[0].id }}
            </div>
          </div>
        </div>
        <hr>
        <div v-if="$blockchain.efxPending !== 0" class="py-4">
          <div>
            <h2 class="title is-4">
              Pending Payout
            </h2>
            <button v-if="$blockchain.efxAvailable !== null && $blockchain.efxPayout !== 0" :class="{'is-loading': loading === true}" class="button is-fullwidth-mobile is-primary" @click.prevent="payout()">
              <p v-if="!loading">
                Cash out <span>{{ $blockchain.efxPayout.toFixed(2) }} EFX!</span>
              </p>
            </button>
            <button v-else-if="$blockchain.efxPayout === 0" disabled="disabled" class="button is-fullwidth-mobile is-primary is-wide">
              <p class="">
                Nothing to cash out
              </p>
            </button>
            <button v-else disabled="disabled" class="button is-fullwidth-mobile is-primary">
              <p>... EFX</p>
            </button>
            <div @click="showPayoutDetails = !showPayoutDetails" class="payout-detail mt-3">
              <span>
                View Details
                <font-awesome-icon class="pl-1" v-if="!showPayoutDetails" icon="fa-solid fa-chevron-down" />
                <font-awesome-icon v-else class="pl-1" icon="fa-solid fa-chevron-up" />
              </span>
            </div>
          </div>
          <div class="is-full-mobile mt-5 payout-table" v-if="showPayoutDetails">
            <div v-if="pendingPayoutsStore" class="table-container">
              <table class="table" style="width: 100%">
                <thead>
                  <tr>
                    <th>Countdown</th>
                    <th>Pending</th>
                    <th>Campaign</th>
                    <th>Batch</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="pendingPayout in pendingPayoutsStore.payouts.rows"
                    :key="pendingPayout.id"
                  >
                    <td>
                      <!-- Time for the release of  -->
                      <vue-countdown
                        ref="countdown"
                        :auto-start="true"
                        :time="calculatePendingTime(pendingPayout.last_submission_time)"
                        :transform="transform">
                        <template slot-scope="props">{{ props }}</template>
                      </vue-countdown>
                    </td>
                    <td>{{ parseFloat(pendingPayout.pending.quantity).toFixed(2) }} EFX</td>
                    <td><nuxt-link :to="{ path: `/campaigns/${$blockchain.splitCompositeKey(pendingPayout.batch_id).campaign}`}">{{ $blockchain.splitCompositeKey(pendingPayout.batch_id).campaign }}</nuxt-link></td>
                    <td><nuxt-link :to="{ path: `/campaigns/${$blockchain.splitCompositeKey(pendingPayout.batch_id).campaign}/${pendingPayout.batch_id}`}">{{ $blockchain.splitCompositeKey(pendingPayout.batch_id).batch }}</nuxt-link></td>
                    <td>{{ new Date(pendingPayout.last_submission_time).toLocaleDateString() }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <td><strong>{{ parseFloat($blockchain.efxPending).toFixed(2) }} EFX</strong></td>
                  </tr>
                  <tr>
                    <th>Claimable</th>
                    <td><strong>{{ parseFloat($blockchain.efxPayout).toFixed(2) }} EFX</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <span v-else>No Pending Payouts</span>
          </div>
        </div>

        <div class="is-flex is-justify-content-space-between mt-6 is-align-items-center">
          <h2 class="title is-4 is-full-mobile">
            My Campaigns
          </h2>
          <nuxt-link class="button is-primary is-pulled-right no-float-mobile has-margin-bottom-mobile" to="/campaigns/templates">
            <span class="icon">
              +
            </span>
            <span>Create Campaign</span>
          </nuxt-link>
        </div>

        <campaign-list class="mb-5" :grid-toggle="false" :owner="$auth.user.accountName" />

        <div style="display:block; overflow:hidden;" class="mb-6">
          <h2 class="title is-4 mt-6 is-spaced">
            Transactions
          </h2>
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
        </div>
        <hr>
        <button class="button is-white" exact-active-class="is-active" @click="logout">
          <span class="icon">
            <img src="~assets/img/icons/logout.svg" style="height: 24px">
          </span>
          <span>Logout</span>
        </button>
        <br><br>
      </div>
      <key-modal v-if="showPK" :message="$auth.user.privateKey" :title="'PrivateKey 🔑'" @close="showPK = !showPK" />
      <!-- SuccessModal -->
      <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import VueCountdown from '@chenfengyuan/vue-countdown/dist/vue-countdown.common'
import Pagination from '@/components/Pagination.vue'
import Balance from '@/components/Balance'
import CampaignList from '@/components/CampaignList'
import KeyModal from '@/components/KeyModal.vue'
import SuccessModal from '@/components/SuccessModal'

export default {
  components: { Balance, CampaignList, Pagination, KeyModal, VueCountdown, SuccessModal },
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
      loading: null,
      page: 1,
      perPage: 10,
      showPK: false,
      pages: [],
      pendingPayouts: [],
      showPayoutDetails: false,
      successMessage: null,
      successTitle: null
    }
  },
  computed: {
    ...mapGetters({
      transactionsByUser: 'transaction/transactionsByUser',
      getPendingPayouts: 'pendingPayout/getPendingPayouts'

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
    },
    pendingPayoutsStore () {
      return this.getPendingPayouts ?? null
    }
  },
  mounted () {
    console.log('mounted')
    this.$store.dispatch('pendingPayout/loadPendingPayouts')
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    },
    setPage (newPage) {
      this.page = newPage
    },
    calculatePendingTime (submissionTime) {
      // Here we take the submission  time, add 1 hour, substract time since.
      // Retrieve the submission time in UTC and convert to milliseconds
      const subTimeSec = new Date(`${new Date(submissionTime)}UTC`).getTime()
      // Retrieve delay and convert to milliseconds, payout_delay_sec = 3600 seconds
      const delaySec = this.$blockchain.getPayoutDelay() * 1e3
      // retrieve time now in milliseconds
      const now = Date.now()
      const endTime = subTimeSec + delaySec - now
      // https://github.com/fengyuanchen/vue-countdown/tree/v1#time
      // The value accepted for the `countdown` componenent, prop `time` can not be less than 0
      return endTime < 0 ? 0 : endTime
    },
    transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        const digits = value < 10 ? `0${value}` : value // Add leading zero
        props[key] = digits
      })
      return props.minutes > 0 && props.seconds ? `${props.minutes}:${props.seconds}` : ' ✔' // there is a space before the checkmark
    },
    async payout () {
      this.loading = true
      try {
        const result = await this.$blockchain.payout()
        this.$store.dispatch('transaction/addTransaction', result)
        this.$store.dispatch('pendingPayout/loadPendingPayouts')
        this.$blockchain.updateUserInfo()
        this.transactionUrl = process.env.NUXT_ENV_EOS_EXPLORER_URL + '/transaction/' + result.transaction_id
        this.successTitle = 'Payout Completed'
        this.successMessage = 'All your available pending payouts have been completed and are added to your Effect account'
      } catch (error) {
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
button.button.is-small.is-info {
  border-radius: 8px;
}
.payout-detail {
  cursor: pointer;
  span {
    color: $link;
    &:hover {
      text-decoration: underline;
    }
  }
}

.payout-table {
  transition: all .5s ease-in-out;
}

@media screen and (max-width: $tablet) {
  .is-pulled-right {
    float: none !important;
    margin-bottom: 25px;
  }
}
</style>
