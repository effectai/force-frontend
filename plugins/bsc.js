import Vue from 'vue'

/**
 * When using the walletconnect protocol we need to make sure to use the custom requests.
 * https://docs.binance.org/walletconnect.html
 */
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

const web3 = new Web3()
web3.setProvider(process.env.NUXT_ENV_BSC_RPC)

const wcProvider = new WalletConnectProvider({
  chainId: process.env.NUXT_ENV_BSC_NETWORK_ID,
  rpc: {
    56: process.env.NUXT_ENV_BSC_RPC
  },
  qrcodeModalOptions: {
    mobileLinks: ['metamask', 'trust', 'rainbow', 'argent']
  }
})

export default (context, inject) => {
  const bsc = new Vue({
    data () {
      return {
        currentProvider: null,
        wallet: null,
        loginModal: false,
        transaction: null,
        transactionError: null,
        metamask: window.ethereum || null,
        binance: window.BinanceChain || null,
        walletConnect: wcProvider || null, // connect to mobile wallet; trust, metamask, ...
        walletConnected: null,
        explorer: process.env.NUXT_ENV_BLOCKEXPLORER
      }
    },
    created () {
      const provider = context.$auth.$storage.getUniversal('provider')
      if (provider) {
        this.eagerLogin(provider)
      }
    },
    beforeDestroy () {
    },

    methods: {
      async eagerLogin (provider) {
        this.loginModal = true
        try {
          if (provider === 'metamask') {
            await this.onMetaMaskConnect()
          } else if (provider === 'walletconnect') {
            await this.onWalletConnectWeb3()
          } else if (provider === 'trustwallet') {
            await this.onTrustWalletConnect()
          } else if (provider === 'bsc') {
            await this.onBinanceConnect()
          } else {
            this.logout()
            context.$auth.logout()
          }
          this.loginModal = false
        } catch (e) {
          console.error(e)
          this.logout()
          context.$auth.logout()
        }
      },
      async logout () {
        if (this.currentProvider) {
          if (this.currentProvider === this.walletConnect) {
            // This method is only available for WalletConnect
            await this.walletConnect.disconnect()
          }
        }
        context.$auth.$storage.setUniversal('provider', null)
        this.clear()
      },

      clear () {
        Object.assign(this.$data, this.$options.data.call(this))
      },

      async sign (message) {
        if (this.currentProvider === this.binance) {
          const signature = await this.currentProvider.request({
            method: 'eth_sign',
            params: [
              this.wallet[0],
              web3.utils.sha3(message, { encoding: 'hex' })
            ]
          })
          return signature
        }
        const signature = await this.currentProvider.request({
          method: 'personal_sign',
          params: [
            message,
            this.wallet[0]
          ]
        })
        return signature
      },

      testTx () {
        const web32 = new Web3(this.currentProvider)
        const receiver = '0x541209bd9C60cDb11A5076b785ba1BD44cd15768'
        const sender = this.wallet[0]
        web32.eth.sendTransaction({
          to: receiver,
          from: sender,
          value: web32.utils.toWei('0.5', 'ether')
        }
        // eslint-disable-next-line node/handle-callback-err
        , function (err, res) {})
      },

      handleTransaction (actions) {
        this.clearTransaction()

        // TODO: handle bsc transaction
      },

      checkBinanceInstalled () {
        return Boolean(this.binance)
      },

      checkBscFormat (bscAddress) {
        const response = web3.utils.isAddress(bscAddress, process.NUXT_ENV_BSC_NETWORK_ID)
        return response
      },

      clearTransaction () {
        this.transaction = null
        this.transactionError = null
      },
      async onTrustWalletConnect () {
        try {
          if (!this.metamask) { this.metamask = window.ethereum }
          this.registerProviderListener(this.metamask)
          this.wallet = await this.currentProvider.request({
            method: 'eth_requestAccounts'
          })
          context.$auth.$storage.setUniversal('provider', 'trustwallet')
          this.checkBscFormat(this.wallet[0])
        } catch (mmError) {
          console.error(mmError)
          if (mmError) {
            return Promise.reject(mmError)
          }
        }
      },
      async onMetaMaskConnect () {
        try {
          if (!this.metamask) { this.metamask = window.ethereum }
          this.registerProviderListener(this.metamask)
          this.wallet = await this.currentProvider.request({
            method: 'eth_requestAccounts'
          })
          context.$auth.$storage.setUniversal('provider', 'metamask')
          this.checkBscFormat(this.wallet[0])
        } catch (mmError) {
          console.error(mmError)
          if (mmError) {
            return Promise.reject(mmError)
          }
        }
      },

      async onBinanceConnect () {
        try {
          if (!this.binance) {
            this.binance = window.BinanceChain
          }
          this.registerProviderListener(this.binance)
          this.wallet = await this.currentProvider.request({
            method: 'eth_requestAccounts'
          })
          context.$auth.$storage.setUniversal('provider', 'bsc')
        } catch (bscError) {
          return Promise.reject(bscError)
        }
      },

      async onWalletConnectWeb3 () {
        try {
          // Launches QR-Code Modal
          await this.walletConnect.enable()

          this.registerProviderListener(this.walletConnect)
          this.wallet = this.walletConnect.accounts
          context.$auth.$storage.setUniversal('provider', 'walletconnect')
          this.walletConnect.updateRpcUrl(process.env.NUXT_ENV_BSC_NETWORK_ID, process.env.NUXT_ENV_BSC_RPC)
        } catch (walletConnectError) {
          return Promise.reject(walletConnectError)
        }
      },

      /**
       * Method to add the correct chain to the wallet of the user.
       * method `wallet_addEthereumChain` is not supported on the BinanceChain rpc provider.
       * We cannot add or remove chains with the Binance Chain wallet.
       *
       * But it is currenlty implemented for Metamask
       * https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
       */
      async addChain () {
        const chainId = await this.getCurrentChainNetwork()

        if (chainId !== process.env.NUXT_ENV_BSC_HEX_ID) {
          try {
            if (this.currentProvider === this.metamask) {
              // Create BSC network configuration object.
              // Create BSC network configuration object.
              const chainObject = {
                chainId: process.env.NUXT_ENV_BSC_HEX_ID,
                chainName: process.env.NUXT_ENV_CHAIN_NAME,
                nativeCurrency: {
                  name: process.env.NUXT_ENV_TOKEN_NAME,
                  symbol: process.env.NUXT_ENV_TOKEN_SYMBOL,
                  decimals: 18
                },
                rpcUrls: [process.env.NUXT_ENV_BSC_RPC],
                blockExplorerUrls: [process.env.NUXT_ENV_BLOCKEXPLORER]
              }
              // This method is only available for metamask right now.
              await this.currentProvider.request({
                method: 'wallet_addEthereumChain',
                params: [chainObject]
              })
            } else {
              // Notify the user to change the chain they are on manually.
              alert('Please update the current chain in your wallet.')
              return
            }
          } catch (addChainError) {
            console.error(addChainError)
          }
        }
      },

      /**
       * Retrieve current network the wallet is listening to. can be testnet or mainnet of either bsc or ethereum for example.
       * In what format does this method return the chain id?
       */
      async getCurrentChainNetwork () {
        try {
          return await this.currentProvider.request({ method: 'eth_chainId' })
        } catch (error) {
          console.error(error)
          console.error('Error requesting currentChain')
        }
      },

      async onCorrectChain () {
        try {
          const currentChain = await this.getCurrentChainNetwork()
          const bool = Boolean(currentChain === process.env.NUXT_ENV_BSC_HEX_ID)
          return bool
        } catch (error) {
          console.error('Something went wrong retrieving chain.')
        }
      },

      /**
       * Assign provider to currentProvider, and register eventlisteners.
       *
       */
      registerProviderListener (provider) {
        // assign provider to this.currentProvider, there are differenct provider objects
        this.currentProvider = provider
        // context.$auth.$storage.setUniversal('currentProvider', provider)

        // Change boolean of walletconnected status
        this.walletConnected = true

        // Connection status does not refer to connection with wallet
        // it just means that connection with provider is available and thus requests can be made to it.

        // Connected, requests can be made to provider.
        this.currentProvider.on('connect', () => {
          this.walletConnected = true
        })

        // Disconnected, requests can no longer be made with provider.
        this.currentProvider.on('disconnect', () => {
          this.walletConnected = false
          this.logout()
          context.$auth.logout()
        })

        // Inform user of account change, only one account can be selected
        this.currentProvider.on('accountsChanged', (newWallet) => {
          if (newWallet.length) {
            this.wallet = newWallet
            context.$auth.$storage.setUniversal('wallet', newWallet)
            if (context.$auth.loggedIn && newWallet[0].toLowerCase() !== context.$auth.user.address.toLowerCase()) {
              context.$auth.logout()
            }
          } else {
            console.log('logging out..')
            this.logout()
            context.$auth.logout()
          }
        })

        // Inform user of chain change
        this.currentProvider.on('chainChanged', (_chainId) => {
          if (_chainId !== process.env.NUXT_ENV_BSC_HEX_ID) {
            alert(`Please switch to the correct chain: Binance Smart Chain, Mainnet, chainId: ${process.env.NUXT_ENV_BSC_NETWORK_ID}`)
          }
        })

        this.addChain()
      }
    }
  })

  inject('bsc', bsc)
}
