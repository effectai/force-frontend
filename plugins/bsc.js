import Vue from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

const web3 = new Web3()
web3.setProvider(process.env.NUXT_ENV_BSC_RPC)

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
        web3: null,
        wallet: null,
        loginModal: false,
        transaction: null,
        transactionError: null,
        metamask: window.ethereum || null,
        metamaskConnected: false,
        binance: window.BinanceChain || null,
        trustWallet: window.ethereum.isTrust || null,
        walletConnect: null,
        walletConnected: null,
        explorer: process.env.NUXT_ENV_BSC_EXPLORER_URL
      }
    },
    created () {

    },
    beforeDestroy () {
    },

    methods: {
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
        this.wallet = null
        Object.assign(this.$data, this.$options.data.call(this))
      },

      async sign (message) {
        // console.debug(`onCorrectChain:: ${await this.onCorrectChain()}`)
        if (await this.onCorrectChain()) {
          // BSC-Extensions only support 'eth_sign'
          // https://binance-wallet.gitbook.io/binance-chain-extension-wallet/dev/get-started#binancechain-request-method-eth_sign-params-address-message
          this.web3.extend({
            property: 'bsc',
            methods: [{
              name: 'sign',
              call: 'eth_sign',
              params: 2
            }]
          })

          try {
            if (this.currentProvider === this.binance) {
              return await this.web3.bsc.sign(this.wallet[0], message)
            } else {
              return await this.web3.eth.personal.sign(message, this.wallet[0])
            }
          } catch (error) {
            console.error(error)
            return Promise.reject(error)
          }
        } else {
          alert(`Please switch to the correct chain in your wallet:\n${process.env.NUXT_ENV_CHAIN_NAME}, ${process.env.NUXT_ENV_NETWORK_TYPE}, ${process.env.NUXT_ENV_BSC_NETWORK_ID}`)
          return Promise.reject(new Error('Invalid chain'))
        }
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
        try {
          return web3.utils.isAddress(bscAddress, process.NUXT_ENV_BSC_NETWORK_ID)
        } catch (error) {
          console.error(error)
        }
      },

      clearTransaction () {
        this.transaction = null
        this.transactionError = null
      },

      async onTrustWalletConnect () {
        try {
          if (!this.metamask) { this.metamask = window.ethereum }
          await this.registerProvider(this.metamask)
          context.$auth.$storage.setUniversal('provider', 'trustwallet')
          // this.checkBscFormat(this.wallet[0])
        } catch (error) {
          console.error(error)
          return Promise.reject(error)
        }
      },

      async onMetaMaskConnect () {
        try {
          if (!this.metamask) { this.metamask = window.ethereum }
          this.metamaskConnected = true
          await this.registerProvider(this.metamask)
          context.$auth.$storage.setUniversal('provider', 'metamask')
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
          await this.registerProvider(this.binance)
          context.$auth.$storage.setUniversal('provider', 'bsc')
        } catch (error) {
          console.error(error)
          return Promise.reject(error)
        }
      },

      async onWalletConnectWeb3 () {
        const wcProvider = new WalletConnectProvider({
          chainId: process.env.NUXT_ENV_BSC_NETWORK_ID,
          rpc: {
            56: process.env.NUXT_ENV_BSC_RPC
          },
          qrcodeModalOptions: {
            mobileLinks: ['metamask', 'trust']
          },
          bridge: process.env.NUXT_ENV_BRIDGE
        })

        this.walletConnect = wcProvider

        try {
          await this.registerProvider(wcProvider)
          // this.wallet = this.walletConnect.accounts
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
          if (this.currentProvider === this.metamask) {
            try {
              await this.web3.givenProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: process.env.NUXT_ENV_BSC_HEX_ID }]
              }, (error, result) => {
                if (error) { console.error(error) }
              })
              window.location.reload()
            } catch (switchError) {
              if (switchError.code === 4902) { // 4902 indicates that the chain has not been added yet.
                try {
                  console.log('isMetaMask')
                  // This method is only available for metamask right now.
                  await this.web3.givenProvider.request({
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
            alert(`Please update the current chain in your wallet. Current-chain: ${await this.getCurrentChainNetwork()}`)
          }
        }
      },

      /**
       * Return the network
       * @returns the network web3 is connected to as an integer
       */
      async getCurrentChainNetwork () {
        try {
          return await this.web3.eth.getChainId()
        } catch (error) {
          console.error(`Error requesting currentchain, ${error}`)
          return Promise.reject(error)
        }
      },

      async onCorrectChain () {
        try {
          const currentChain = await this.getCurrentChainNetwork()
          // console.debug(`currentChain:: ${currentChain}, isHex:: ${this.web3.utils.isHex(currentChain)}`)
          return Boolean(currentChain === parseInt(process.env.NUXT_ENV_BSC_NETWORK_ID) && this.web3.utils.isHex(currentChain))
        } catch (error) {
          console.error('Something went wrong retrieving chain.')
          return Promise.reject(error)
        }
      },

      async registerListener (provider) {
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
            // console.log('logging out..')
            this.logout()
            context.$auth.logout()
          }
        })

        // Inform user of chain change
        const oldchain = this.web3.utils.toHex(await this.getCurrentChainNetwork())
        provider.on('chainChanged', (_chainId) => {
          // console.log(`
          //   oldchaind: ${oldchain}
          //   _chainid: ${_chainId}
          //   Nuxt env bsc hex id: ${process.env.NUXT_ENV_BSC_HEX_ID}
          // `)
          if (!this.web3.utils.isHex(oldchain)) {
            alert('This chain is not supported, logging out.')
            this.logout()
          } else if (_chainId !== process.env.NUXT_ENV_BSC_HEX_ID) {
            alert(`Please switch to the correct chain:\n${process.env.NUXT_ENV_CHAIN_NAME}, Mainnet, chainId: ${process.env.NUXT_ENV_BSC_NETWORK_ID}\n\nCurrently on: ${web3.utils.hexToNumberString(_chainId)}\n\nLogging out.`)
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
      },

      async getAccounts (w3, provider) {
      },

      /**
       * Assign provider to currentProvider, instantiate web3, and register eventlisteners.
       */
      async registerProvider (provider) {
        this.currentProvider = provider
        this.wallet = null
        this.web3 = new Web3(provider)
        // context.$auth.$storage.setUniversal('web3', provider)

        if (!this.onCorrectChain()) {
          return Promise.reject(new Error('Wrong chain'))
        }

        // Enable provider to instantiate connection with wallet
        await this.currentProvider.enable()

        try {
          if (this.currentProvider === this.binance || this.currentProvider === this.walletConnect) {
            this.wallet = await this.web3.eth.getAccounts()
          } else {
            this.wallet = await this.web3.eth.requestAccounts()
          }
        } catch (error) {
          console.error(error)
          return Promise.reject(error)
        }

        this.checkBscFormat(this.wallet[0])
        this.addChain()
        this.registerListener(provider)
      }
    }
  })

  inject('bsc', bsc)
}
