<template>
  <span>
    <div class="modal" :class="{ 'is-active': $bsc.loginModal }">
      <div class="modal-background" @click="$bsc.loginModal = false" />
      <div class="modal-card">
        <div v-if="error" class="notification is-danger">
          <button class="delete" @click="error = null" />
          {{ error }}
        </div>
        <header class="modal-card-head">
          <p class="modal-card-title">
            Select your BSC wallet
          </p>
          <button class="delete" aria-label="close" @click="$bsc.loginModal = false" />
        </header>
        <section class="modal-card-body">
          <div v-if="loading" class="loader-wrapper is-active">
            <div class="loader is-loading" />
          </div>
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
              <div v-if="this.$bsc.checkBinanceInstalled" class="provider has-radius" @click="selectWallet('bsc')">
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
      error: null
    }
  },
  computed: {
    isMetaMaskInstalled () {
      return Boolean(this.$bsc.metamask && this.$bsc.metamask.isMetaMask)
    },
    isTrustInstalled () {
      return Boolean(this.$bsc.metamask && this.$bsc.metamask.isTrust)
    },

    isBinanceInstalled () {
      return Boolean(this.$bsc.binance != null)
    }
  },
  created () {
    const provider = this.$auth.$storage.getUniversal('provider')
    if (provider) {
      this.$bsc.loginModal = true
      this.selectWallet(provider)
    }
  },
  methods: {
    async selectWallet (provider) {
      this.loading = true
      try {
        switch (provider) {
          case 'trustwallet':
            await this.$bsc.onTrustWalletConnect()
            break
          case 'metamask':
            await this.$bsc.onMetaMaskConnect()
            break
          case 'bsc':
            await this.$bsc.onBinanceConnect()
            break
          case 'walletconnect':
            await this.$bsc.onWalletConnectWeb3()
            break
        }
        this.$bsc.loginModal = false
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
