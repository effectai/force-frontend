<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="has-text-centered block">
          <img :src="require('@/assets/img/logo.svg')" width="130" class="mb-5">
          <h2 class="site-title is-spaced title">Bridge</h2>
          <h4 class="subtitle">Transfer EFX between EOS and your BSC Wallet.</h4>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="notification is-warning is-horizontal-centered" style="max-width: 550px" v-if="!$ptokens.error && $ptokens.status == 'progress'">
        Do not refresh or close this window! Otherwise you won't be able to track the progress of your swap.
      </div>
      <div class="box is-horizontal-centered px-6 has-text-centered content" style="max-width: 550px">
        <div v-if="$ptokens.status == 'start'" class="loader-wrapper is-active">
          <div class="loader is-loading" />
        </div>
        <div class="columns is-centered mt-4">
          <div class="column is-12">
            <div class="progress-block mb-3" v-if="$ptokens.status || $ptokens.error">
              <div v-if="!$ptokens.error && $ptokens.status !=='finished'" class="mb-3">{{ $ptokens.statusText }}</div>
              <div class="notification is-danger" v-if="$ptokens.error">{{ $ptokens.error }}</div>
              <div class="notification is-success" v-if="$ptokens.status == 'finished'">{{ $ptokens.statusText }}</div>

              <div v-if="!$ptokens.error && $ptokens.status == 'progress'">
                <progress class="progress is-primary mb-4" max="100"></progress>
                <p class="mb-6" style="font-size: 0.9rem">Please be patient, the swap can take <strong>up to 10 minutes</strong></p>
              </div>

              <div class="notification has-text-centered" v-if="$ptokens.status == 'finished'">
                  <span class="mb-1">Amount swapped</span>
                  <h4 class="subtitle is-4 mb-0">{{ $ptokens.efxAmount }} EFX</h4>
              </div>

              <!-- EOS -->
              <div class="notification has-text-centered" v-if="$ptokens.eosTransactionId">
                <img src="~assets/img/EOS-logo.svg" height="50" width="50"/>
                <div class="subtitle is-6 has-text-centered">
                  <p>
                    Transaction:
                    <a :href="$eos.explorer + '/transaction/'+ $ptokens.eosTransactionId" target="_blank" class="blockchain-address">
                      {{ $ptokens.eosTransactionId }}
                    </a>
                  </p>
                  <p>
                    Account:
                    <a :href="$eos.explorer + '/account/'+ eosWallet.auth.accountName" target="_blank" class="blockchain-address">
                      {{ eosWallet.auth.accountName }}
                    </a>
                  </p>
                </div>
              </div>


              <!-- BSC -->
              <div class="notification has-text-centered" v-if="$ptokens.bscTransactionId">
                <img src="~assets/img/BSC-logo.svg" height="50" width="50"/>
                <div class="subtitle is-6 has-text-centered">
                  <p>
                    Transaction:
                    <a :href="$bsc.explorer + '/tx/' + $ptokens.bscTransactionId" target="_blank" class="blockchain-address">
                      {{ $ptokens.bscTransactionId }}
                    </a>
                  </p>
                  <p>
                    Account:
                    <a :href="$bsc.explorer + '/address/'+ bscWallet[0]" target="_blank" class="blockchain-address">
                      {{ bscWallet[0] }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nuxt-link to="/" v-if="$ptokens.status == 'failed' || $ptokens.status =='finished' || !$ptokens.status" class="button is-medium is-accent is-fullwidth mt-5">
          <strong v-if="$ptokens.status == 'failed' || !$ptokens.status">Back to form</strong>
          <strong v-if="$ptokens.status == 'finished'">Swap again</strong>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SwapProgress',
  data () {
    return {
    }
  },
  computed: {
    eosWallet () {
      return (this.$eos) ? this.$eos.wallet : null
    },
    bscWallet () {
      return (this.$bsc) ? this.$bsc.wallet : null
    }
  },
  mounted () {
    // if there's no swap in progress or an error, go back to form
    if(!this.$ptokens.status) {
      this.$router.push('/withdraw')
    }
  },
  methods: {
  },

  created() {
  },
}
</script>

<style lang="scss" scoped>
.site-title {
  font-size: 64px;
}
.progress::-webkit-progress-value {
  transition: width 0.5s ease;
}
.blockchain-address {
  font-family: monospace;
  text-overflow: ellipsis;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}
</style>
