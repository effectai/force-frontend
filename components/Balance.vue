<template>
  <div class="columns">
    <div class="column">
      <h2 class="has-text-weight-bold">
        Total Balance
      </h2>
      <span class="is-flex is-align-items-center">
        <span><b>{{ ($blockchain.efxTotal !== null ? $blockchain.efxTotal.toFixed(2) : '...') }}</b><span v-if="$blockchain.efxLoading">..</span> EFX</span>
        <span v-if="$blockchain.efxTotal !== null && $blockchain.efxPrice" class="is-size-7 pl-2">| $<b>{{ ($blockchain.efxTotal * $blockchain.efxPrice).toFixed(2) }}</b></span>
      </span>
    </div>
    <div class="column">
      <h2 class="has-text-weight-bold">
        vAccount Contract Balance
      </h2>
      <span v-if="$blockchain.vefxAvailable !== null">{{ $blockchain.vefxAvailable.toFixed(2) }}</span>
      <span v-else>.....</span><span>  EFX</span>
    </div>
    <div class="column">
      <h2 class="has-text-weight-bold">
        Wallet
      </h2>
      <span v-if="$blockchain.efxAvailable !== null">{{ $blockchain.efxAvailable.toFixed(2) }}</span>
      <span v-else>.....</span><span>  EFX</span>
    </div>
    <div class="column">
      <h2 class="has-text-weight-bold">
        Pending Tasks
      </h2>
      <span v-if="$blockchain.efxPending !== null">{{ $blockchain.efxPending.toFixed(2) }}</span>
      <span v-else>.....</span><span>  EFX</span>
    </div>
    <div class="column">
      <h2 class="has-text-weight-bold">
        Actions
      </h2>
      <div>
        <nuxt-link to="/deposit" class="button is-accent is-small">
          Deposit
        </nuxt-link>
        <nuxt-link to="/withdraw" class="button is-secondary is-small">
          Withdraw
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Balances',
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>
