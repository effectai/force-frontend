<template>
  <span>
    <div class="modal" :class="{ 'is-active': $blockchain.loginModal === 'bsc' }">
      <div class="modal-background" @click="$blockchain.loginModal = false" />
      <div class="modal-card">
        <div v-if="error" class="notification is-danger">
          <button class="delete" @click="error = null" />
          {{ error }}
        </div>
        <header class="modal-card-head">
          <p class="modal-card-title">
            Select your BSC wallet
          </p>
          <button class="delete" aria-label="close" @click="$blockchain.loginModal = false" />
        </header>
        <section class="modal-card-body">
          <div v-if="loading && false" class="loader-wrapper is-active">
            <div class="loader is-loading" />
          </div>
          <pre>{{ pk }}</pre>
          <div class="columns is-multiline">
            <div class="column is-half">
              <div v-if="isMetaMaskInstalled" class="provider has-radius disabled" @click="selectWallet('metamask')">
                <img src="@/assets/img/providers/metamask.png">
                MetaMask
              </div>
              <a v-else class="provider has-radius" href="https://metamask.io/download.html" target="_blank">
                <img src="@/assets/img/providers/metamask.png">
                Install MetaMask
              </a>
            </div>
            <div class="column is-half">
              <div v-if="$blockchain.bsc.checkBinanceInstalled" class="provider has-radius" @click="selectWallet('bsc')">
                <img src="@/assets/img/providers/bsc.svg">
                Binance Chain
              </div>
              <a
                v-else
                class="provider has-radius"
                href="https://docs.binance.org/smart-chain/wallet/binance.html"
                target="_blank"
              >
                <img src="@/assets/img/providers/bsc.svg">
                Install Binance Chain
              </a>
            </div>
            <div class="column is-half">
              <div v-if="isTrustInstalled" class="provider has-radius is-mobile" @click="selectWallet('trustwallet')">
                <img src="@/assets/img/providers/trust.png">
                TrustWallet
              </div>
              <div v-else class="provider has-radius is-mobile" @click="selectWallet('walletconnect')">
                <img src="@/assets/img/providers/trust.png">
                TrustWallet
              </div>

            </div>
            <div class="column is-half">
              <div class="provider has-radius is-mobile" @click="selectWallet('walletconnect')">
                <img src="@/assets/img/providers/walletconnect.svg">
                WalletConnect
              </div>
            </div>
            <div class="column is-full has-text-centered">
              <div class="title">
                - OR -
              </div>
              <p>
                Use the <span class="has-text-primary"><b>Effect Wallet</b></span>, This is a wallet stored <b class="has-text-danger">in your browser</b>. To use this wallet, import your private key from an existing BSC address into it, or create a newly generated keypair.
              </p>
            </div>
            <div class="column is-6 is-offset-3">
              <div class="provider has-radius is-mobile" to="/burner-wallet" @click.prevent="toBurnerWallet()">
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/2666.png">
                <span class="has-text-dark">Effect Wallet</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      error: null,
      pkValue: null
    }
  },
  computed: {
    isMetaMaskInstalled () {
      return Boolean(this.$blockchain.bsc.metamask && this.$blockchain.bsc.metamask.isMetaMask)
    },
    isTrustInstalled () {
      return Boolean(this.$blockchain.bsc.metamask && this.$blockchain.bsc.metamask.isTrust)
    },

    isBinanceInstalled () {
      return Boolean(this.$blockchain.bsc.binance != null)
    },
    pk () {
      this.$root.$on('selectBurnerWallet', (val) => {
        this.pkValue = val
        this.selectWallet('burner-wallet')
      })
      return this.pkValue
    }
  },
  methods: {
    toBurnerWallet () {
      this.$root.$emit('switchToBurnerWalletContent', true)
      this.$blockchain.loginModal = false
    },
    async selectWallet (provider) {
      this.loading = true
      try {
        await this.$blockchain.login(provider, 'bsc', null, this.pkValue)
        this.$blockchain.loginModal = false
      } catch (error) {
        console.error(error)
        if (error.response && error.response.data) {
          if (error.response.data.error) {
            this.error = error.response.data.error
          } else if (error.response.data.message) {
            this.error = error.response.data.message
          } else {
            this.error = error.response.data
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = error
        }
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card-body {
  border-radius: 0 0 6px 6px;
}

.modal-card {
  max-width: 500px;
}

.column {
  padding: 0.5rem;

  .provider {
    padding: 10px;
    display: block;
    border: 1px solid #CCC;
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;

    img {
      float: left;
      height: 40px;
      max-height: none;
      max-width: none;
      margin-right: 8px;
    }

    &:hover {
      background: #f3f3f3;
      cursor: pointer;
    }
  }
}
</style>
