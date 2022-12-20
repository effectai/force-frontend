<template>
  <div>
    <div class="columns is-mobile is-centered is-multiline">
      <div class="column is-half-mobile">
        <div class="box ">
          Total
          <br>
          <span class="">
            <span><b>{{ ($blockchain.efxTotal !== null ? $blockchain.efxTotal.toFixed(2) : '...') }} EFX</b><span v-if="$blockchain.efxLoading">..</span></span>
            <!-- <span v-if="$blockchain.efxTotal !== null && $blockchain.efxPrice" class="is-size-7 pl-2">| $<b>{{ ($blockchain.efxTotal * $blockchain.efxPrice).toFixed(2) }}</b></span> -->
          </span>
        </div>
      </div>
      <div class="column is-half-mobile">
        <div class="box ">
          vAccount
          <br>
          <b>
            <span v-if="$blockchain.vefxAvailable !== null">{{ $blockchain.vefxAvailable.toFixed(2) }}</span>
            <span v-else>.....</span><span>  EFX</span>
          </b>
        </div>
      </div>
      <div class="column is-half-mobile">
        <div class="box ">
          Wallet
          <br>
          <b>
            <span v-if="$blockchain.efxAvailable !== null">{{ $blockchain.efxAvailable.toFixed(2) }}</span>
            <span v-else>.....</span><span>  EFX</span>
          </b>
        </div>
      </div>
      <div class="column is-half-mobile">
        <div class="box ">
          Pending
          <br>
          <b>
            <span v-if="$blockchain.efxPending !== null">{{ $blockchain.efxPending.toFixed(2) }}</span>
            <span v-else>.....</span><span>  EFX</span>
          </b>
        </div>
      </div>
    </div>
    <div class="column has-margin-bottom-mobile is-v-centered my-auto">
      <div class="field is-horizontal is-grouped-centered has-text-centered">
        <span class="control">
          <nuxt-link to="/deposit" class="button is-fullwidth-mobile is-primary ">
            Deposit
          </nuxt-link>
        </span>
        <span>&nbsp;</span>
        <span class="control">
          <nuxt-link to="/vtransfer" class="button is-fullwidth-mobile is-secondary is-outlined">
            vTransfer
          </nuxt-link>
        </span>
        <span>&nbsp;</span>
        <span class="control">
          <nuxt-link to="/withdraw" class="button is-fullwidth-mobile is-primary is-outlined">
            Withdraw
          </nuxt-link>
        </span>
        <span>&nbsp;</span>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Balances',
  data () {
    return {
      loading: null,
      successMessage: null,
      successTitle: null
    }
  },
  computed: {},
  methods: {
    async payout () {
      this.loading = true
      try {
        const result = await this.$blockchain.payout()
        this.$store.dispatch('transaction/addTransaction', result)
        await this.$store.dispatch('pendingPayout/loadPendingPayouts')
        this.$blockchain.updateUserInfo()
        this.transactionUrl = `${this.$blockchain.sdk.config.eosExplorerUrl}/transaction/${result.transaction_id}`
        this.successTitle = 'Payout Completed'
        this.successMessage = 'All your available pending payouts have been completed and are added to your Effect account'
      } catch (error) {
        this.$blockchain.handleError(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  div.box {
    background: $balance-box-color;
    padding: 5%;
    border-radius: 8px;
    box-shadow: none;
  }
</style>
