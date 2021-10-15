import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

const web3 = new Web3()
console.log(process.env.NUXT_ENV_BSC_RPC)
web3.setProvider(process.env.NUXT_ENV_BSC_RPC)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// Used for add chain network functionality. only for metamask atm
const chainObject = {
  chainId: process.env.NUXT_ENV_BSC_HEX_ID,
  chainName: process.env.NUXT_ENV_BSC_CHAIN_NAME,
  nativeCurrency: {
    name: process.env.NUXT_ENV_BSC_TOKEN_NAME,
    symbol: process.env.NUXT_ENV_BSC_TOKEN_SYMBOL,
    decimals: 18
  },
  rpcUrls: [process.env.NUXT_ENV_BSC_RPC],
  blockExplorerUrls: [process.env.NUXT_ENV_BSC_EXPLORER_URL]
}

const bsc = {
  currentProvider: null,
  web3,
  wallet: null,
  loginModal: false,
  metamask: window.ethereum || null,
  binance: window.BinanceChain || null,
  trustWallet: window.ethereum.isTrust || null,
  walletConnect: null,
  explorer: process.env.NUXT_ENV_BSC_EXPLORER_URL,

  login: async (provider) => {
    switch (provider) {
      case 'trustwallet':
        return await bsc.onTrustWalletConnect()
      case 'metamask':
        return await bsc.onMetaMaskConnect()
      case 'bsc':
        return await bsc.onBinanceConnect()
      case 'walletconnect':
        return await bsc.onWalletConnectWeb3()
      case 'burner-wallet':
        return await bsc.onBurnerWallet()
    }
  },
  logout: async () => {
    if (bsc.currentProvider) {
      if (bsc.currentProvider === bsc.walletConnect) {
      // This method is only available for WalletConnect
        await bsc.walletConnect.disconnect()
      }
    }
    bsc.wallet = null
    bsc.web3 = new Web3()
    web3.setProvider(process.env.NUXT_ENV_BSC_RPC)
  },

  sign: async (message) => {
  // BSC-Extensions only support 'eth_sign'
  // https://binance-wallet.gitbook.io/binance-chain-extension-wallet/dev/get-started#binancechain-request-method-eth_sign-params-address-message
    bsc.web3.extend({
      property: 'bsc',
      methods: [{
        name: 'sign',
        call: 'eth_sign',
        params: 2
      }]
    })

    try {
      if (bsc.currentProvider === bsc.binance) {
        return await bsc.web3.bsc.sign(bsc.wallet[0], message)
      } else if (bsc.currentProvider === 'burner-wallet') {
        return (await bsc.web3.eth.accounts.sign(message, bsc.wallet[0].privateKey)).signature
      } else {
        return await bsc.web3.eth.personal.sign(message, bsc.wallet[0])
      }
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  testTx: () => {
    const web32 = new Web3(bsc.currentProvider)
    const receiver = '0x541209bd9C60cDb11A5076b785ba1BD44cd15768'
    const sender = bsc.wallet[0]
    web32.eth.sendTransaction({
      to: receiver,
      from: sender,
      value: web32.utils.toWei('0.5', 'ether')
    }
    // eslint-disable-next-line node/handle-callback-err
    , function (err, res) {})
  },

  checkBinanceInstalled: () => {
    return Boolean(bsc.binance)
  },

  checkBscFormat: (bscAddress) => {
    try {
      return web3.utils.isAddress(bscAddress, process.NUXT_ENV_BSC_NETWORK_ID)
    } catch (error) {
      console.error(error)
    }
  },

  onTrustWalletConnect: async () => {
    try {
      if (!bsc.metamask) { bsc.metamask = window.ethereum }
      return await bsc.registerProvider(bsc.metamask)
    // bsc.checkBscFormat(bsc.wallet[0])
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  onMetaMaskConnect: async () => {
    try {
      if (!bsc.metamask) { bsc.metamask = window.ethereum }
      return await bsc.registerProvider(bsc.metamask)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  onBinanceConnect: async () => {
    try {
      if (!bsc.binance) {
        bsc.binance = window.BinanceChain
      }
      return await bsc.registerProvider(bsc.binance)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  onWalletConnectWeb3: async () => {
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

    bsc.walletConnect = wcProvider

    try {
      const provider = await bsc.registerProvider(wcProvider)
      // bsc.wallet = bsc.walletConnect.accounts
      bsc.walletConnect.updateRpcUrl(process.env.NUXT_ENV_BSC_NETWORK_ID, process.env.NUXT_ENV_BSC_RPC)
      return provider
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },
  onBurnerWallet: async () => {
    try {
      return await bsc.registerProvider('burner-wallet')
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },
  generateBSCKeyPair: () => {
    return bsc.web3.eth.accounts.create()
  },

  /**
   * Method to add the correct chain to the wallet of the user.
   * method `wallet_addEthereumChain` is only supported for the Metamask wallet
   * https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
   *
   * Check the following links for updates
   * https://eips.ethereum.org/EIPS/eip-3085, https://github.com/ethereum/EIPs/pull/3326
   * When the proposal for the eips is finalized we need to update bsc.
   */
  addChain: async () => {
    const chainId = await bsc.getCurrentChainNetwork()
    if (chainId !== parseInt(process.env.NUXT_ENV_BSC_NETWORK_ID)) {
      let correctChain = false
      if (bsc.currentProvider === bsc.metamask) {
        try {
          await bsc.web3.givenProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: process.env.NUXT_ENV_BSC_HEX_ID }]
          })
          correctChain = true
          // Sleep needed to make sure the next popup for request accounts opens
          await sleep(500)
        } catch (switchError) {
          if (switchError.code === 4902) { // 4902 indicates that the chain has not been added yet.
            console.log('isMetaMask')
            // This method is only available for metamask right now.
            await bsc.web3.givenProvider.request({
              method: 'wallet_addEthereumChain',
              params: [chainObject]
            })
            correctChain = true
            // Sleep needed to make sure the next popup for request accounts opens
            await sleep(500)
          } else {
            throw switchError
          }
        }
      } else {
      // Notify the user to change the chain they are on manually.
        alert(`Please update the current chain in your wallet. Current-chain: ${await bsc.getCurrentChainNetwork()}`)
      }
      return correctChain
    }
    return true
  },

  /**
   * Return the network
   * @returns the network web3 is connected to as an integer
   */
  getCurrentChainNetwork: async () => {
    try {
      return await bsc.web3.eth.getChainId()
    } catch (error) {
      console.error(`Error requesting currentchain, ${error}`)
      return Promise.reject(error)
    }
  },

  /**
   * Assign provider to currentProvider, instantiate web3, and register eventlisteners.
   */
  registerProvider: async (provider) => {
    bsc.currentProvider = provider
    bsc.wallet = null
    if (bsc.currentProvider !== 'burner-wallet') {
      bsc.web3 = new Web3(provider)
      if (!(await bsc.addChain())) {
        return Promise.reject(new Error('Wrong chain'))
      }
      // Enable provider to instantiate connection with wallet
      await bsc.currentProvider.enable()
    }
    try {
      if (bsc.currentProvider === bsc.binance || bsc.currentProvider === bsc.walletConnect) {
        bsc.wallet = await bsc.web3.eth.getAccounts()
      } else if (bsc.currentProvider === 'burner-wallet') {
        // either generate private key or retrieve private key
        const keypair = bsc.generateBSCKeyPair()
        // creates empty wallet.
        bsc.web3.eth.accounts.wallet.create()
        // add current account (in the burner-wallet) to the actual wallet.
        bsc.web3.eth.accounts.wallet.add(keypair)
        // assign wallet.
        bsc.wallet = bsc.web3.eth.accounts.wallet
      } else {
        bsc.wallet = await bsc.web3.eth.requestAccounts()
      }
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }

    bsc.checkBscFormat(bsc.wallet[0])
    return provider
  }
}

export default bsc
