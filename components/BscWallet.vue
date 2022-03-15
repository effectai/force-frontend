<template>
  <span>
    <div class="modal" :class="{ 'is-active': $blockchain.loginModal === 'bsc' }">
      <div class="modal-background" @click="$blockchain.loginModal = false; burnerWallet = false; showKeypairDetails = false" />
      <div class="modal-card">
        <div v-if="error" class="notification is-danger">
          <button class="delete" @click="error = null" />
          {{ error }}
        </div>
        <header class="modal-card-head">
          <p class="modal-card-title">
            Choose your BSC login method
          </p>
          <button class="delete" aria-label="close" @click="$blockchain.loginModal = false; burnerWallet = false; showKeypairDetails = false" />
        </header>
        <section class="modal-card-body">
          <div v-if="loading" class="loader-wrapper is-active">
            <img src="~assets/img/loading.svg">
            <div class="loading-text subtitle">Waiting for wallet</div>
          </div>
          <div v-if="burnerWallet == true && showKeypairDetails == false">
            <div>
              <a href="#" class="has-text-danger-dark" @click.prevent="burnerWallet = false">Back</a>
            </div>
            <div class="mb-4">
              <input v-model="privateKey" class="input is-primary is-medium" type="text" placeholder="Private Key..." readonly>
            </div>
            <div class="">
              <button class="button is-primary is-fullwidth" :disabled="!privateKey" @click.prevent="importPrivateKey">
                <span>Import Private Key</span>
              </button>
              <span class="mt-3">No Private key? <a class="is-size-6" @click.prevent="createKeypair">Generate a keypair</a></span>
            </div>
          </div>
          <div v-if="burnerWallet == true && showKeypairDetails == true" class="content">
            <div class="box has-limited-width is-horizontal-centered">
              <div class="field">
                <label class="label">Public key</label>
                <div class="control has-icons-right">
                  <input class="input blockchain-address" type="text" :value="keypair.address" readonly>
                  <span class="p-2 icon is-small is-right is-clickable has-tooltip-arrow has-tooltip-fade unselectable" :data-tooltip="copy_message" @click.prevent="copyToClipboard(keypair.address)" @mouseout="copy_message = 'Copy to clipboard'">
                    <img src="~assets/img/icons/copy.svg" alt="Copy">
                  </span>
                </div>
              </div>
              <div class="">
                <label class="label">Private key</label>
                <div class="control has-icons-right has-icons-left">
                  <input class="input blockchain-address" :type="password_hidden ? 'password' : 'text'" :value="keypair.privateKey" readonly>
                  <span class="p-2 icon is-small is-left is-clickable has-tooltip-arrow has-tooltip-fade unselectable" :data-tooltip="visibility_message" @click.prevent="togglePasswordVisibility()" @mouseout="visibility_message = 'Toggle visibility'">
                    <font-awesome-icon v-if="password_hidden" icon="fa-solid fa-eye" />
                    <font-awesome-icon v-else icon="fa-solid fa-eye-slash" />
                  </span>
                  <span class="p-2 icon is-small is-right is-clickable has-tooltip-arrow has-tooltip-fade unselectable" :data-tooltip="copy_message" @click.prevent="copyToClipboard(keypair.privateKey)" @mouseout="copy_message = 'Copy to clipboard'">
                    <img src="~assets/img/icons/copy.svg" alt="Copy">
                  </span>
                </div>
              </div>
            </div>
            <div class="notification is-warning is-light mt-3" role="alert">
              Do not forget to backup your private key.
            </div>
            <label class="checkbox">
              <input v-model="backup" type="checkbox">
              I have backed up my Private Key
            </label>
            <div class="has-text-right">
              <a href="#" class="button is-primary" :disabled="!backup" @click.prevent="() => { if (!backup) return; privateKey = keypair.privateKey; showKeypairDetails = false}">Continue</a>
            </div>
          </div>
          <div v-if="burnerWallet == false && showKeypairDetails == false" class="columns is-multiline">
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
            <!-- <div class="column is-half">
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
            </div> -->
            <!-- <div class="column is-half">
              <div v-if="isTrustInstalled" class="provider has-radius is-mobile" @click="selectWallet('trustwallet')">
                <img src="@/assets/img/providers/trust.png">
                TrustWallet
              </div>
              <div v-else class="provider has-radius is-mobile" @click="selectWallet('walletconnect')">
                <img src="@/assets/img/providers/trust.png">
                TrustWallet
              </div> -->

            <!-- <div class="column is-half">
              <div class="provider has-radius is-mobile" @click="selectWallet('walletconnect')">
                <img src="@/assets/img/providers/walletconnect.svg">
                WalletConnect
              </div>
            </div> -->
            <!-- <div class="column is-full has-text-centered">
              <div class="title">
                - OR -
              </div>
              <p>
                Use the <span class="has-text-primary"><b>Effect Wallet</b></span>, This is a wallet stored <b class="has-text-danger">in your browser</b>. To use this wallet, import your private key from an existing BSC address into it, or create a newly generated keypair.
              </p>
            </div> -->
            <div class="column is-half">
              <div class="provider has-radius is-mobile" to="/burner-wallet" @click.prevent="burnerWallet = true">
                <img src="@/assets/img/icons/key.svg">
                <span class="has-text-dark">Private Key</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </span>
</template>

<script>
import { createAccount } from '@effectai/effect-js'

export default {
  data () {
    return {
      loading: false,
      error: null,
      backup: false,
      privateKey: null,
      burnerWallet: false,
      showKeypairDetails: false,
      copy_message: 'Copy to clipboard',
      password_hidden: true,
      keypair: {
        address: '',
        privateKey: ''
      }
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
    }
  },
  watch: {
    '$blockchain.triggerGenerate' (trigger) {
      if (trigger) {
        this.burnerWallet = true
        this.createKeypair()
      }
    }
  },
  methods: {
    togglePasswordVisibility () {
      this.password_hidden = !this.password_hidden
    },
    copyToClipboard (content) {
      navigator.clipboard.writeText(content).then(() => {
        this.copy_message = 'Copied!'
      })
    },
    createKeypair () {
      this.$blockchain.triggerGenerate = false
      this.showKeypairDetails = true
      const { address, privateKey } = createAccount()
      this.keypair = { address, privateKey }
    },
    importPrivateKey () {
      this.selectWallet('burner-wallet')
    },
    async selectWallet (provider) {
      this.loading = true
      try {
        await this.$blockchain.login(provider, 'bsc', null, this.privateKey)
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
.has-limited-width {
  width: 450px;
}
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
