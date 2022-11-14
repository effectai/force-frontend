<template>
  <section class="section columns is-centered">
    <aside class="column is-2 is-fullheight pt-6">
      <ul class="menu-list">
        <li c>
          <a
            href="#"
            class="py-3 is-flex is-align-items-center"
            :class="{'is-active': activeTab === 'account'}"
            @click.prevent="activeTab = 'account'"
          >
            <div><font-awesome-icon class="icon" icon="fa-solid fa-user" /></div>
            Effect Account
          </a>
        </li>
        <li>
          <a
            href="#"
            class="py-3 is-flex is-align-items-center"
            :class="{'is-active': activeTab === 'qualifications'}"
            @click.prevent="activeTab = 'qualifications'"
          >
            <div><font-awesome-icon class="icon" icon="fa-solid fa-trophy" /></div>
            Qualifications
          </a>
        </li>
        <li>
          <a
            href="#"
            class="py-3 is-flex is-align-items-center"
            :class="{'is-active': activeTab === 'payouts'}"
            @click.prevent="activeTab = 'payouts'"
          >
            <div><font-awesome-icon class="icon" icon="fa-solid fa-money-bills" /></div>
            Payouts
          </a>
        </li>
        <li>
          <a
            href="#"
            class="py-3 is-flex is-align-items-center"
            :class="{'is-active': activeTab === 'transactions'}"
            @click.prevent="activeTab = 'transactions'"
          >
            <div><font-awesome-icon class="icon" icon="fa-solid fa-book" /></div>
            Transactions
          </a>
        </li>
      </ul>
    </aside>

    <div class="column is-7 pt-6 has-background-white section">
      <div class="text-center">
        <div v-if="activeTab === 'account'">
          <h2 class="title is-4 is-spaced">
            Account Info
          </h2>
          <div class="columns my-auto">
            <div class="column">
              <div class="block">
                <div class="has-text-weight-bold is-size-6 is-vecentered" style="min-height: 32px;">
                  <span>{{ $auth.user.blockchain === 'bsc' ? '' : 'EOS Account Name' }}</span>
                  <span v-if="$auth.user.blockchain === 'bsc'">
                    <span>&nbsp;BSC Address</span>
                    <button v-if="$auth.user.provider === 'burner-wallet'" class="button is-info is-light is-small" @click="showPK = !showPK">
                      <span>
                        <font-awesome-icon class="is-small icon" icon="fa-solid fa-key" />
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
                  :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.account.config.accountContract}?loadContract=true&tab=Tables&table=account&account=${$blockchain.sdk.account.config.accountContract}&scope=${$blockchain.sdk.account.config.accountContract}&limit=1&lower_bound=${$auth.user.vAccountRows[0].id}&upper_bound=${$auth.user.vAccountRows[0].id}`"
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
            <div class="column">
              <div class="block">
                <div class="has-text-weight-bold is-size-6" style="min-height: 32px;">
                  Manage
                </div>
                <nuxt-link to="/manage">
                  Tasks & Qualifications You Created
                </nuxt-link>
              </div>
            </div>
          </div>
          <hr>
          <h2 class="title is-5 is-spaced">
            Balances
          </h2>
          <balance class="balance-block" />
          <hr>
          <button class="button is-white" exact-active-class="is-active" @click="logout">
            <span class="icon">
              <img src="~assets/img/icons/logout.svg" style="height: 18px">
            </span>
            <span class="is-size-7">Logout</span>
          </button>
        </div>
        <!-- Payouts -->
        <div v-if="activeTab === 'payouts'">
          <div>
            <h2 class="title is-4">
              Pending Payout
            </h2>
            <button v-if="$blockchain.efxAvailable !== null && $blockchain.efxPayout !== 0" :class="{'is-loading': loading === true}" class="button is-fullwidth-mobile is-primary" @click.prevent="payout()">
              <p v-if="!loading">
                Claim <span>{{ $blockchain.efxPayout.toFixed(2) }} EFX!</span>
              </p>
            </button>
            <button v-else-if="$blockchain.efxPayout === 0" disabled="disabled" class="button is-fullwidth-mobile is-primary is-wide">
              <p class="">
                Nothing to claim
              </p>
            </button>
            <button v-else disabled="disabled" class="button is-fullwidth-mobile is-primary">
              <p>... EFX</p>
            </button>
          </div>
          <div class="mt-5 payout-table">
            <div v-if="pendingPayoutsStore" class="table-container">
              <table class="table" style="width: 100%">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Batch</th>
                    <th>Date</th>
                    <th>Countdown</th>
                    <th>Pending</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="pendingPayout in pendingPayoutsStore.payouts.rows"
                    :key="pendingPayout.id"
                  >
                    <td>
                      <nuxt-link v-if="campaignById($blockchain.splitCompositeKey(pendingPayout.batch_id).campaign)" :to="{ path: `/campaigns/${$blockchain.splitCompositeKey(pendingPayout.batch_id).campaign}`}">
                        {{ campaignById($blockchain.splitCompositeKey(pendingPayout.batch_id).campaign).info.title }}
                      </nuxt-link>
                    </td>
                    <td>
                      <nuxt-link :to="{ path: `/campaigns/${$blockchain.splitCompositeKey(pendingPayout.batch_id).campaign}/${pendingPayout.batch_id}`}">
                        {{ $blockchain.splitCompositeKey(pendingPayout.batch_id).batch }}
                      </nuxt-link>
                    </td>
                    <td>{{ new Date(pendingPayout.last_submission_time).toLocaleDateString() }}</td>
                    <td>
                      <!-- Time for the release of  -->
                      <vue-countdown
                        ref="countdown"
                        :auto-start="true"
                        :time="calculatePendingTime(pendingPayout.last_submission_time)"
                        :transform="transform"
                      >
                        <template slot-scope="props">
                          {{ props }}
                        </template>
                      </vue-countdown>
                    </td>
                    <td>{{ parseFloat(pendingPayout.pending.quantity).toFixed(2) }} EFX</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th colspan="3" />
                    <th>Total</th>
                    <th><strong>{{ parseFloat($blockchain.efxPending).toFixed(2) }} EFX</strong></th>
                  </tr>
                  <tr>
                    <th colspan="3" style="border: none" />
                    <th>Claimable</th>
                    <th><strong>{{ parseFloat($blockchain.efxPayout).toFixed(2) }} EFX</strong></th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <span v-else>No Pending Payouts</span>
          </div>
        </div>

        <!-- Qualifications -->
        <div v-if="activeTab === 'qualifications'">
          <h2 class="title is-4 is-spaced">
            Your Earned Qualifications
          </h2>
          <div v-if="assignedQualifications && assignedQualifications.length > 0" class="columns is-mobile is-multiline is-max-widescreen">
            <div
              v-for="q in assignedQualifications"
              :key="q.id"
              class="is-1-desktop column is-one-quarter-mobile quali"
            >
              <nuxt-link v-if="!q.info?.ishidden || q.account_id === $auth.user.vAccountRows[0].id" :to="`/qualifications/${q.id}`" :data-tooltip="q.info?.name">
                <img v-if="q.info.image" :src="q.info.image">
                <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)">
              </nuxt-link>
            </div>
          </div>
          <span v-else>No qualifications found</span>
        </div>

        <!-- Transactions -->
        <div v-if="activeTab === 'transactions'">
          <h2 class="title is-4 is-spaced">
            Transactions
          </h2>
          <p class="mb-5">
            Transaction made by this account on Effect Force.*
          </p>
          <div class="table-container">
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
          <!-- <span v-else>No transactions found</span> -->
          <pagination
            v-if="transactions"
            :items="transactions.length"
            :page="page"
            :per-page="perPage"
            @setPage="setPage"
          />
          <p class="is-size-7">
            * This list may vary on different devices, as the transactions are saved locally in the browser.
          </p>
        </div>
      </div>
      <key-modal v-if="showPK" :message="$auth.user.privateKey" :title="'PrivateKey 🔑'" @close="showPK = !showPK" />
      <!-- SuccessModal -->
      <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import VueCountdown from '@chenfengyuan/vue-countdown/dist/vue-countdown.common'
import Balance from '@/components/Balance'
import KeyModal from '@/components/KeyModal.vue'
import SuccessModal from '@/components/SuccessModal'
import Pagination from '@/components/Pagination.vue'

export default {
  components: { Balance, KeyModal, VueCountdown, SuccessModal, Pagination },
  filters: {},
  middleware: ['auth'],
  data () {
    return {
      loading: null,
      pendingPayouts: [],
      successMessage: null,
      successTitle: null,
      showPK: false,
      activeTab: 'account',
      page: 1,
      perPage: 10,
      pages: []
    }
  },
  computed: {
    ...mapGetters({
      getPendingPayouts: 'pendingPayout/getPendingPayouts',
      campaignById: 'campaign/campaignById',
      activeBatchesByCampaignId: 'campaign/activeBatchesByCampaignId',
      transactionsByUser: 'transaction/transactionsByUser'
    }),
    ...mapState({
      assignedQualifications: state => state.qualification.assignedQualifications
    }),
    myCampaigns () {
      if (!this.campaigns) { return }
      const filteredCampaigns = this.campaigns.filter(c => c.owner[1] === this.$auth.user.accountName).map((c) => { return { ...c } })

      for (const i in filteredCampaigns) {
        const batches = this.activeBatchesByCampaignId(filteredCampaigns[i].id)
        filteredCampaigns[i].batches = batches
        if (batches) {
          filteredCampaigns[i].num_tasks = batches.reduce(function (a, b) {
            return a + b.num_tasks
          }, 0)
          filteredCampaigns[i].tasks_done = batches.reduce(function (a, b) {
            return a + b.real_tasks_done
          }, 0)
        }
      }
      return filteredCampaigns
    },
    pendingPayoutsStore () {
      return this.getPendingPayouts ?? null
    },
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
  mounted () {
    this.$store.dispatch('pendingPayout/loadPendingPayouts')
    // console.debug(this.$auth)
  },
  methods: {
    async logout () {
      await this.$utils.logout()
    },
    calculatePendingTime (submissionTime) {
      // Here we take the submission  time, add 1 hour, substract time since.
      // Retrieve the submission time in UTC and convert to milliseconds
      const subTimeSec = new Date(`${new Date(submissionTime)}UTC`).getTime()
      // Retrieve delay and convert to milliseconds, payoutDelaySec = 3600 seconds
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
        this.transactionUrl = `${this.$blockchain.sdk.config.eosExplorerUrl}/transaction/${result.transaction_id}`
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
.menu-list {
  svg {
    height: 1.2em;
  }
  a {
    border-radius: 7px !important;
    div {
      width: 30px;
      margin-right: 5px;
    }
  }
}

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
  tfoot tr:last-child th {
    border-style: dashed;
  }
}

@media screen and (max-width: $tablet) {
  .is-pulled-right {
    float: none !important;
    margin-bottom: 25px;
  }
  .menu-list {
    border-bottom: 1px solid $light;
  }
  aside {
    padding-top: 0 !important;
    padding-bottom: 0;
  }
}
.quali {
  img {
    height: 80px;
    object-fit: contain;
    margin: 0 auto;
    display: block;
  }
}
</style>
