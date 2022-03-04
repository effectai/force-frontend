<template>
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
    <div class="column has-margin-bottom-mobile is-v-centered my-auto">
      <div class="field is-horizontal is-grouped-centered has-text-centered">
            <span class="control">
              <nuxt-link to="/deposit" class="button is-fullwidth-mobile is-responsive is-primary ">
                Deposit
              </nuxt-link>
            </span>
            <span>&nbsp;</span>
            <span class="control">
              <nuxt-link to="/vtransfer" class="button is-fullwidth-mobile is-responsive is-secondary is-outlined">
                vTransfer
              </nuxt-link>
            </span>
            <span>&nbsp;</span>
            <span class="control">
              <nuxt-link to="/withdraw" class="button is-fullwidth-mobile is-responsive is-primary is-outlined">
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
  div.box {
    background: $balance-box-color;
    padding: 5%;
    border-radius: 8px;
    box-shadow: none;
  }
</style>
