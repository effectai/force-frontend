import Vue from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

const web3 = new Web3()
web3.setProvider(process.env.NUXT_ENV_BSC_RPC)

// Walletconnect config object
const wcProvider = new WalletConnectProvider({
  chainId: process.env.NUXT_ENV_BSC_NETWORK_ID,
  rpc: {
    56: process.env.NUXT_ENV_BSC_RPC
  },
  qrcodeModalOptions: {
    mobileLinks: ['metamask', 'trust', 'rainbow', 'argent']
  }
})

// Used for add chain network functionality. only for metamask atm
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
        metamaskConnected: false,
        binance: window.BinanceChain || null,
        trustWallet: window.ethereum.isTrust || null,
        walletConnect: wcProvider || null,
        walletConnected: null,
        explorer: process.env.NUXT_ENV_BLOCKEXPLORER
      }
    },
    created () {
      const provider = context.$auth.$storage.getUniversal('provider')
      console.log(provider)
      const w3 = new Web3(this.metamask)
      console.log(w3.eth.givenProvider.isMetaMask)
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
          const signature = await this.currentProvider.call({
            method: 'eth_sign',
            params: [
              this.wallet[0],
              web3.utils.sha3(message, { encoding: 'hex' })
            ]
          })
          return signature
        }
        const signature = await this.currentProvider.call({
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
      },

      checkBinanceInstalled () {
        return Boolean(this.binance)
      },

      checkMetaMaskInstalled () {
        return Boolean(this.metamask)
      },

      isTrustWalletDappBrowser () {
        return Boolean(this.trustj)
      },

      checkBscFormat (bscAddress) {
        return web3.utils.isAddress(bscAddress, process.NUXT_ENV_BSC_NETWORK_ID)
      },

      clearTransaction () {
        this.transaction = null
        this.transactionError = null
      },

      async onTrustWalletConnect () {
        try {
          if (!this.metamask) { this.metamask = window.ethereum }
          this.registerProviderListener(this.metamask)
          this.wallet = await this.currentProvider.eth.getAccounts()

          context.$auth.$storage.setUniversal('provider', 'trustwallet')
          this.checkBscFormat(this.wallet[0])
        } catch (error) {
          console.error(error)
          return Promise.reject(error)
        }
      },

      async onMetaMaskConnect () {
        try {
          if (!this.metamask) { this.metamask = window.ethereum }
          this.metamaskConnected = true
          this.registerProviderListener(this.metamask)
          this.wallet = await this.currentProvider.eth.getAccounts()
          context.$auth.$storage.setUniversal('provider', 'metamask')
          this.checkBscFormat(this.wallet[0])
        } catch (error) {
          console.error(error)
          return Promise.reject(error)
        }
      },

      async onBinanceConnect () {
        try {
          if (!this.binance) {
            this.binance = window.BinanceChain
          }
          this.registerProviderListener(this.binance)
          this.wallet = await this.currentProvider.eth.getAccounts()
          context.$auth.$storage.setUniversal('provider', 'bsc')
        } catch (error) {
          console.error(error)
          return Promise.reject(error)
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
        } catch (error) {
          console.error(error)
          return Promise.reject(error)
        }
      },

      /**
       * Method to add the correct chain to the wallet of the user.
       * method `wallet_addEthereumChain` is only supported for the Metamask wallet
       * https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
       *
       * Check the following links for updates
       * https://eips.ethereum.org/EIPS/eip-3085, https://github.com/ethereum/EIPs/pull/3326
       * When the proposal for the eips is finalized we need to update this.
       */
      async addChain () {
        const chainId = await this.getCurrentChainNetwork()
        if (chainId !== parseInt(process.env.NUXT_ENV_BSC_NETWORK_ID)) {
          if (this.metamaskConnected) {
            try {
              await this.currentProvider.givenProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: process.env.NUXT_ENV_BSC_HEX_ID }]
              }, (error, result) => {
                if (error) { console.error(error) }
              })
            } catch (switchError) {
              if (switchError.code === 4902) { // 4902 indicates that the chain has not been added yet.
                try {
                  console.log('isMetaMask')
                  // This method is only available for metamask right now.
                  await this.currentProvider.givenProvider.request({
                    method: 'wallet_addEthereumChain',
                    params: [chainObject]
                  }, (err, res) => {
                    if (err) { console.error(err) }
                  })
                  window.location.reload()
                } catch (addChainError) {
                  console.error(addChainError)
                }
              }
            }
          } else {
            // Notify the user to change the chain they are on manually.
            alert(`Please update the current chain in your wallet. Currenchain: ${await this.getCurrentChainNetwork()}`)
          }
        }
      },

      /**
       * Retrieve current network the wallet is listening to. can be testnet or mainnet of either bsc or ethereum for example.
       * Return format is an integer
       */
      async getCurrentChainNetwork () {
        try {
          return await this.currentProvider.eth.net.getId()
        } catch (error) {
          console.error(`Error requesting currentchain, ${error}`)
        }
      },

      async onCorrectChain () {
        try {
          const currentChain = await this.getCurrentChainNetwork()
          return Boolean(currentChain === process.env.NUXT_ENV_BSC_NETWORK_ID)
        } catch (error) {
          console.error('Something went wrong retrieving chain.')
        }
      },

      /**
       * Assign provider to currentProvider, and register eventlisteners.
       * @
       *
       */
      async registerProviderListener (provider) {
        // assign provider to this.currentProvider, there are differenct provider objects
        this.currentProvider = new Web3(provider)
        // context.$auth.$storage.setUniversal('currentProvider', provider)

        // Change boolean of walletconnected status
        this.walletConnected = true

        // Connection status does not refer to connection with wallet
        // it just means that connection with provider is available and thus requests can be made to it.

        // Connected, requests can be made to provider.
        provider.on('connect', () => {
          this.walletConnected = true
        })

        // Disconnected, requests can no longer be made with provider.
        provider.on('disconnect', () => {
          this.walletConnected = false
          this.logout()
          context.$auth.logout()
        })

        // Inform user of account change, only one account can be selected
        provider.on('accountsChanged', (newWallet) => {
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
        const oldchain = await this.getCurrentChainNetwork()
        provider.once('chainChanged', (_chainId) => {
          if (_chainId !== process.env.NUXT_ENV_BSC_HEX_ID) {
            alert(`Please switch to the correct chain: Binance Smart Chain, Mainnet, chainId: ${process.env.NUXT_ENV_BSC_NETWORK_ID}, currently on: ${web3.utils.hexToNumberString(_chainId)}. Logging out.`)
            // It is recommended to reload the entire window, or to logout the user to make sure the user doesn't do any txs.
            this.logout()
            context.$auth.logout() // Logout
            // window.location.reload() // reload window aswell?
          } else if (oldchain !== _chainId && _chainId === process.env.NUXT_ENV_BSC_HEX_ID) {
            alert('Chain changed to the correct chain. Logging out, please log back in.')
            this.logout()
            context.$auth.logout()
          }
        })

        provider.on('message', (message) => {
          console.log(message)
        })

        this.addChain()
      }
    }
  })

  inject('bsc', bsc)
}
