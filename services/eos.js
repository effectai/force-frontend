import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import anchor from 'eos-transit-anchorlink-provider'
import tp from 'eos-transit-tokenpocket-provider'
import lynx from 'eos-transit-lynx-provider'
import { JsonRpc } from 'eosjs' // Only to retrieve block height

const networkHost = {
  host: (process.env.NUXT_ENV_EOS_NETWORK.includes('local') ? 'localhost' : process.env.NUXT_ENV_EOS_NODE_URL),
  port: (process.env.NUXT_ENV_EOS_NETWORK.includes('local') ? 8888 : 443),
  protocol: (process.env.NUXT_ENV_EOS_NETWORK.includes('local') ? 'http' : 'https'),
  chainId: process.env.NUXT_ENV_EOS_CHAIN_ID
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
  explorer: process.env.NUXT_ENV_EOS_EXPLORER_URL,
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
    const rpc = new JsonRpc(`${networkHost.protocol}://${networkHost.host}:${networkHost.port}`)
    return await rpc.get_info()
  },

  async getRelayerStatus () {
    const rpc = new JsonRpc(`${networkHost.protocol}://${networkHost.host}:${networkHost.port}`)
    return await rpc.get_account(process.env.NUXT_ENV_EOS_RELAYER_CONTRACT)
  }

}

export default eos
