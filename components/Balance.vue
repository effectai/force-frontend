<template>
  <div class="columns is-touch is-tablet is-desktop is-vcentered">
    <div class="column">
      <div class="box">
        Total
        <br>
        <span class="">
          <span><b>{{ ($blockchain.efxTotal !== null ? $blockchain.efxTotal.toFixed(2) : '...') }} EFX</b><span v-if="$blockchain.efxLoading">..</span></span>
          <!-- <span v-if="$blockchain.efxTotal !== null && $blockchain.efxPrice" class="is-size-7 pl-2">| $<b>{{ ($blockchain.efxTotal * $blockchain.efxPrice).toFixed(2) }}</b></span> -->
        </span>
      </div>
    </div>
    <div class="column">
      <div class="box">
        vAccount
        <br>
        <b>
          <span v-if="$blockchain.vefxAvailable !== null">{{ $blockchain.vefxAvailable.toFixed(2) }}</span>
          <span v-else>.....</span><span>  EFX</span>
        </b>
      </div>
    </div>
    <div class="column">
      <div class="box">
        Wallet
        <br>
        <b>
          <span v-if="$blockchain.efxAvailable !== null">{{ $blockchain.efxAvailable.toFixed(2) }}</span>
          <span v-else>.....</span><span>  EFX</span>
        </b>
      </div>
    </div>
    <div class="column">
      <div class="box">
        Pending
        <br>
        <b>
          <span v-if="$blockchain.efxPending !== null">{{ $blockchain.efxPending.toFixed(2) }}</span>
          <span v-else>.....</span><span>  EFX</span>
        </b>
      </div>
    </div>
    <div class="column">
      <div class="field is-horizontal is-grouped-centered has-text-centered">
            <span class="control">
              <nuxt-link to="/deposit" class="button is-primary ">
                Deposit
              </nuxt-link>
            </span>
            <span>&nbsp;</span>
            <span class="control">
              <nuxt-link to="/withdraw" class="button is-primary is-outlined">
                Withdraw
              </nuxt-link>
            </span>
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
