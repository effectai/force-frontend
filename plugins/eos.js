import { Api, JsonRpc } from 'eosjs'
import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import anchor from 'eos-transit-anchorlink-provider'
import tp from 'eos-transit-tokenpocket-provider'
import lynx from 'eos-transit-lynx-provider'
import Vue from 'vue'

const appName = 'therealforce'
const accessContext = initAccessContext({
  appName,
  network: {
    host: process.env.NUXT_ENV_EOS_NODE_URL,
    port: 443,
    protocol: 'https',
    chainId: process.env.NUXT_ENV_EOS_CHAIN_ID
  },
  walletProviders: [
    scatter(),
    anchor(appName, { verifyProofs: true }),
    tp(),
    lynx()
  ]
})
export default (context, inject) => {
  const eos = new Vue({
    data () {
      const rpc = new JsonRpc(`https://${process.env.NUXT_ENV_EOS_NODE_URL}:443`)

      return {
        explorer: process.env.NUXT_ENV_EOS_EXPLORER_URL,
        api: new Api({ rpc }),
        providers: {
          scatter: 'scatter',
          anchor: 'anchor-link',
          tokenpocket: 'TokenPocket',
          lynx: 'EOS Lynx'
        },
        wallet: null,
        loginModal: false,
        efxAvailable: null,
        transaction: null,
        transactionError: null
      }
    },
    beforeDestroy () {
    },

    methods: {
      async rememberLogin () {
        const accountInfo = context.$auth.$storage.getUniversal('accountInfo')
        if (accountInfo) {
          await this.login(accountInfo.provider, accountInfo.auth.accountName, accountInfo.auth.permission)
          await context.$auth.loginWith('blockchain', {
            account: {
              eos: accountInfo.auth,
              bsc: null
            }
          })
          // Needed because there is a redirect bug when going to a protected route from the login page
          const path = context.$auth.$storage.getUniversal('redirect') || '/'
          context.$auth.$storage.setUniversal('redirect', null)
          context.app.router.push(path)
        }
      },
      async login (provider, accountName, permission) {
        const providers = accessContext.getWalletProviders()
        const selectedProvider = providers.find(r => r.id === provider)
        if (selectedProvider) {
          const wallet = accessContext.initWallet(selectedProvider)
          await wallet.connect()
          await wallet.login(accountName, permission)
          context.$auth.$storage.setUniversal('accountInfo', JSON.stringify({
            loggedIn: true,
            provider,
            auth: { accountName: wallet.auth.accountName, permission: wallet.auth.permission, publicKey: wallet.auth.publicKey }
          }))
          this.wallet = wallet
          this.updateAccount()
        }
      },

      async sign (message) {
        console.log(this.wallet)
        const response = await await this.wallet.provider.link.identify()
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

      async logout () {
        if (this.wallet) {
          await this.wallet.logout()
        }
        context.$auth.$storage.setUniversal('accountInfo', null)
        this.clear()
      },
      updateAccount () {
        if (this.wallet) {
          this.getAccountBalance()
        }
      },

      clear () {
        this.clearTransaction()
        Object.assign(this.$data, this.$options.data.call(this))
      },

      async getAccountBalance () {
        if (this.wallet) {
          const efxRow = (await this.api.rpc.get_currency_balance(process.env.NUXT_ENV_EOS_TOKEN_CONTRACT, this.wallet.auth.accountName, process.env.NUXT_ENV_EOS_EFX_TOKEN))[0]
          if (efxRow) {
            this.efxAvailable = parseFloat(efxRow.replace(` ${process.env.NUXT_ENV_EOS_EFX_TOKEN}`, ''))
          }
        }
      },

      handleTransaction (actions) {
        this.clearTransaction()

        return this.wallet.eosApi.transact({ actions }, {
          blocksBehind: 3,
          expireSeconds: 60
        })
          .then((transaction) => {
            this.transaction = transaction
            return Promise.resolve(transaction)
          })
          .catch((error) => {
            this.transactionError = error
            return Promise.reject(error)
          })
      },

      clearTransaction () {
        this.transaction = null
        this.transactionError = null
      },

      isValidEosAccount (name) {
        return this.api.rpc.get_account(name).then(() => {
          return true
        }).catch((e) => {
          console.error('account not found', e)
          return false
        })
      }
    }
  })

  inject('eos', eos)
}
