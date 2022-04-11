import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import anchor from 'eos-transit-anchorlink-provider'
import tp from 'eos-transit-tokenpocket-provider'
import lynx from 'eos-transit-lynx-provider'
import { JsonRpc } from 'eosjs'
import { defaultConfiguration } from '@effectai/effect-js'

// Not able to access this.$blockchain here. so opting to use a global variable here.
const config = defaultConfiguration(process.env.NUXT_ENV_SDK_ENV)

const networkHost = {
  host: config.eosNodeHost,
  port: config.eosNodePort,
  protocol: config.eosNodeProtocol,
  chainId: config.eosChainId
}

const appName = 'therealforce'
const accessContext = initAccessContext({
  appName,
  network: networkHost,
  walletProviders: [
    scatter(),
    anchor(appName, { verifyProofs: true }),
    tp(),
    lynx()
  ]
})

const eos = {
  explorer: config.eosExplorerUrl,
  providers: {
    scatter: 'scatter',
    anchor: 'anchor-link',
    tokenpocket: 'TokenPocket',
    lynx: 'EOS Lynx'
  },
  wallet: null,
  connect: async (provider, accountName, permission) => {
    const providers = accessContext.getWalletProviders()
    const selectedProvider = providers.find(r => r.id === provider)
    if (selectedProvider) {
      const wallet = accessContext.initWallet(selectedProvider)
      await wallet.connect()
      await wallet.login(accountName, permission)
      eos.wallet = wallet
      return wallet
    }
    return false
  },

  sign: async (message) => {
    const response = await eos.wallet.provider.link.identify()
    // const identityRequest = [{
    //   account: '', // uint64(0)
    //   name: 'identity',
    //   authorization: [
    //     {
    //       actor: this.wallet.auth.accountName,
    //       permission: this.wallet.auth.permission
    //     }
    //   ],
    //   data: {
    //     scope: 'effect_force',
    //     permission: {
    //       actor: this.wallet.auth.accountName,
    //       permission: this.wallet.auth.permission
    //     }
    //   }
    // }]
    // const signature = await this.handleTransaction(identityRequest)
    console.log(response)
    return response
  },

  handleTransaction (actions) {
    return eos.wallet.eosApi.transact({ actions }, {
      blocksBehind: 3,
      expireSeconds: 60
    })
  },

  async disconnect () {
    if (eos.wallet) {
      await eos.wallet.logout()
      eos.wallet = null
    }
  },

  isValidEosAccount (name) {
    return eos.wallet.eosApi.rpc.get_account(name).then(() => {
      return true
    }).catch((e) => {
      console.error('account not found', e)
      return false
    })
  },

  async getEosInfo () {
    const rpc = new JsonRpc(config.eosNodeUrl)
    return await rpc.get_info()
  },

  async getRelayerStatus () {
    const rpc = new JsonRpc(config.eosNodeUrl)
    return await rpc.get_account(config.eosRelayerAccount)
  }

}

export default eos
