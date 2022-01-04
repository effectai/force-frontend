<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title is-spaced">
          Your EFX Balance
        </h4>
        <div v-if="errors.length">
          <div v-for="error in errors" :key="toString(error)" class="notification is-danger is-light">
            {{ error }}
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column is-half">
            <div class="box">
              <h2 class="has-text-weight-bold">
                Total Balance
              </h2>
              <span to="/balance" class="is-flex is-align-items-center">
                <span><b>{{ ($blockchain.efxTotal !== null ? $blockchain.efxTotal.toFixed(2) : '...') }}</b><span v-if="$blockchain.efxLoading">..</span> EFX</span>
                <span v-if="$blockchain.efxTotal !== null && $blockchain.efxPrice" class="is-size-7 pl-2">| $<b>{{ ($blockchain.efxTotal * $blockchain.efxPrice).toFixed(2) }}</b></span>
              </span>
            </div>
          </div>
          <div class="column is-half">
            <div class="box">
              <h2 class="has-text-weight-bold">
                Pending Tasks
              </h2>
              <span v-if="$blockchain.efxPending !== null">{{ $blockchain.efxPending.toFixed(2) }}</span>
              <span v-else>.....</span><span>  EFX</span>
            </div>
          </div>
          <div class="column is-half">
            <div class="box">
              <h2 class="has-text-weight-bold">
                vAccount Contract Balance
              </h2>
              <span v-if="$blockchain.vefxAvailable !== null">{{ $blockchain.vefxAvailable.toFixed(2) }}</span>
              <span v-else>.....</span><span>  EFX</span>
            </div>
          </div>
          <div class="column is-half">
            <div class="box">
              <h2 class="has-text-weight-bold">
                Wallet
              </h2>
              <span v-if="$blockchain.efxAvailable !== null">{{ $blockchain.efxAvailable.toFixed(2) }}</span>
              <span v-else>.....</span><span>  EFX</span>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4">
            <nuxt-link to="/deposit" class="button is-accent is-pulled-left">
              Deposit
            </nuxt-link>
          </div>
          <div class="column is-4 is-flex is-justify-content-center">
            <button v-if="$blockchain.efxAvailable !== null && $blockchain.efxPayout != 0" :class="{'is-loading': loading === true}" class="button is-medium is-primary is-pulsing" @click.prevent="payout()">
              <p v-if="!loading">Cash in <span>{{ $blockchain.efxPayout.toFixed(2) }} EFX!</span></p>
            </button>
            <button v-else-if="$blockchain.efxPayout == 0" disabled="disabled" class="button is-medium is-primary">
              <p>Nothing to cash in..</p>
            </button>
            <button v-else disabled="disabled" class="button is-medium is-primary">
              <p>... EFX</p>
            </button>
          </div>
          <div class="column is-4">
            <nuxt-link to="/withdraw" class="button is-secondary is-pulled-right">
              Withdraw
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- SuccessModal -->
      <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
    </div>
  </section>
</template>

<script>
import SuccessModal from '@/components/SuccessModal'
export default {
  components: {
    SuccessModal
  },
  name: 'Balances',
  middleware: ['auth'],
  data () {
    return {
      pending: 0,
      finalAmount: 0,
      loading: false,
      successMessage: null,
      successTitle: null,
      errors: []
    }
  },
  methods: {
    async payout () {
      this.loading = true
      try {
        const result = await this.$blockchain.payout()
        this.$store.dispatch('transaction/addTransaction', result)
        this.transactionUrl = process.env.NUXT_ENV_EOS_EXPLORER_URL + '/transaction/' + result.transaction_id
        this.successTitle = 'Payout Completed'
        this.successMessage = 'All your available pending payouts have been completed and are added to your Effect account'
      } catch (error) {
        this.loading = false
        this.errors.push(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
