<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h4 class="title is-spaced">
          Your EFX Balance
        </h4>
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
                vAccount
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
        <div>
          <nuxt-link to="/deposit" class="button is-accent is-pulled-left">
            Deposit
          </nuxt-link>
          <nuxt-link to="/withdraw" class="button is-secondary is-pulled-right">
            Withdraw
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Balances',
  middleware: ['auth'],
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>
