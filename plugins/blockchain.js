import Vue from 'vue'
import eos from '../services/eos'
import bsc from '../services/bsc'
// const effectSdk = require('@effectai/effect-js')
const effectSdk = require('../../effect-js')

export default (context, inject) => {
  const blockchain = new Vue({
    data () {
      // Initialize empty SDK, reinitialize when connecting wallet
      const sdkOptions = {
        network: process.env.NUXT_ENV_EOS_NETWORK,
        host: `https://${process.env.NUXT_ENV_EOS_NODE_URL}:443`
      }
      return {
        account: null,
        blockchain: null,
        provider: null,
        loginModal: false,
        efxAvailable: null,
        efxPending: 0,
        eos,
        bsc,
        sdk: new effectSdk.EffectClient(sdkOptions),
        error: null,
        waitForSignatureFrom: null,
        waitForSignature: 0,
        efxPrice: null,
        refreshInterval: null
      }
    },
    computed: {
      efxLoading () {
        return this.vefxAvailable === null || this.efxAvailable === null || this.efxPending === null
      },
      efxTotal () {
        return this.efxAvailable + this.vefxAvailable + this.efxPending
      },
      vefxAvailable () {
        let balance
        const vAccountRows = context.$auth.user.vAccountRows
        if (vAccountRows) {
          vAccountRows.forEach((row) => {
            if (row.balance.contract === process.env.NUXT_ENV_EOS_TOKEN_CONTRACT) {
              balance = parseFloat(row.balance.quantity.replace(` ${process.env.NUXT_ENV_EOS_EFX_TOKEN}`, ''))
            }
          })
        }
        return balance
      }
    },
    created () {
      this.updateBlockchainInfo()
      if (!this.refreshInterval) {
        this.refreshInterval = setInterval(this.updateBlockchainInfo, parseInt(process.env.NUXT_ENV_BLOCKCHAIN_UPDATE_RATE, 10))
      }
    },

    beforeDestroy () {
      clearInterval(this.refreshInterval)
    },

    methods: {
      updateBlockchainInfo () {
        console.log('refreshing:')
        console.log('refreshing price..')
        this.getEfxPrice()
        if (context.$auth.loggedIn) {
          console.log('refreshing user..')
          context.$auth.fetchUser()
          console.log('refreshing user balance..')
          this.getAccountBalance()
        }
      },
      async getEfxPrice (currency = 'usd') {
        this.efxPrice = await fetch(
          'https://api.coingecko.com/api/v3/coins/effect-network/tickers'
        )
          .then(data => data.json())
          .then((data) => {
            if (data.tickers) {
              return data.tickers[0].converted_last[currency]
            }
          })
      },
      async rememberLogin () {
        const rememberAccount = context.$auth.$storage.getUniversal('rememberAccount')
        if (rememberAccount) {
          const loggedIn = await this.login(rememberAccount.provider, rememberAccount.blockchain, rememberAccount)
          if (loggedIn) {
            await context.$auth.loginWith('blockchain', {
              account: this.account,
              $blockchain: this
            })
            this.getAccountBalance()
            // Needed because there is a redirect bug when going to a protected route from the login page
            const path = context.$auth.$storage.getUniversal('redirect') || '/'
            context.$auth.$storage.setUniversal('redirect', null)
            context.app.router.push(path)
          }
        }
      },
      async login (providerName, blockchain, rememberAccount) {
        let account
        if (blockchain === 'eos') {
          const wallet = await this.eos.login(providerName, rememberAccount ? rememberAccount.accountName : null, rememberAccount ? rememberAccount.permission : null)
          account = { accountName: wallet.auth.accountName, permission: wallet.auth.permission, publicKey: wallet.auth.publicKey }
        } else if (blockchain === 'bsc') {
          const provider = await this.bsc.login(providerName)
          let accountAddress
          if (rememberAccount) {
            accountAddress = rememberAccount.accountName
            // Make sure we still have the same connection as our stored account
            if (rememberAccount.publicKey !== this.bsc.wallet[0]) {
              await this.logout()
              return false
            }
          } else {
            accountAddress = (await this.recoverPublicKey(this.bsc.wallet[0])).accountAddress
          }
          this.registerBscListeners(provider)
          account = { accountName: accountAddress, publicKey: this.bsc.wallet[0] }
        }
        if (account) {
          account.blockchain = blockchain
          account.provider = providerName
          this.account = account
          this.initSdk()
          return true
        }
        return false
      },
      async switchBscAccountBeforeLogin () {
        this.waitForSignature++
        try {
          const account = { ...this.account }
          // Make sure address matches with the public key we get from bsc wallet
          const addresses = await this.recoverPublicKey(this.bsc.wallet[0])
          // Check if this is the signature we are currently waiting for, as we could have multiple signature requests..
          if (addresses.address.toLowerCase() === this.waitForSignatureFrom.toLowerCase() && addresses.address.toLowerCase() === this.bsc.wallet[0].toLowerCase()) {
            this.waitForSignatureFrom = null
            account.accountName = addresses.accountAddress
            account.publicKey = this.bsc.wallet[0]

            this.account = account
            this.initSdk()
          }
        } catch (error) {
          this.handleError(error)
        }
        this.waitForSignature--
      },
      registerBscListeners (provider) {
        // Disconnected, requests can no longer be made with provider.
        provider.on('disconnect', () => {
          console.log('disconnecting provider') // eslint-disable-line no-console
          this.logout()
          context.$auth.logout()
        })

        // Inform user of account change, only one account can be selected
        provider.on('accountsChanged', (newWallet) => {
          this.bsc.wallet = newWallet
          if (newWallet.length) {
            if (context.$auth.loggedIn) {
              if (newWallet[0].toLowerCase() !== context.$auth.user.accountName.toLowerCase()) {
                context.$auth.logout()
              }
            } else {
              this.waitForSignatureFrom = newWallet[0]
            }
          } else {
            this.logout()
            context.$auth.logout()
          }
        })

        // Inform user of chain change
        provider.on('chainChanged', (_chainId) => {
          if (!this.bsc.web3.utils.isHex(_chainId)) {
            alert('This chain is not supported, logging out.')
            this.logout()
          } else if (_chainId !== process.env.NUXT_ENV_BSC_HEX_ID) {
            alert(`Please switch to the correct chain:\n${process.env.NUXT_ENV_BSC_CHAIN_NAME}, Mainnet, chainId: ${process.env.NUXT_ENV_BSC_NETWORK_ID}\n\nCurrently on: ${this.bsc.web3.utils.hexToNumberString(_chainId)}\n\nLogging out.`)
            // It is recommended to reload the entire window, or to logout the user to make sure the user doesn't do any txs.
            this.logout()
            context.$auth.logout() // Logout
            // window.location.reload() // reload window aswell?
          }
        })
      },

      async openVAccount () {
        await this.sdk.account.openAccount(this.account.accountName, this.account.permission)
      },
      async getVAccountByName (accountName) {
        if (!accountName) {
          accountName = this.account.accountName
        }
        return await this.sdk.account.getVAccountByName(accountName)
      },
      async getVAccountById (id) {
        return await this.sdk.account.getVAccountById(id)
      },

      async deposit (amount) {
        return await this.sdk.account.deposit(this.account.accountName, this.account.vAccountRows[0].id, amount, this.account.permission)
      },

      async withdraw (toAccount, amount, memo) {
        return await this.sdk.account.withdraw(context.$auth.user.blockchain === 'bsc' ? context.$auth.user.publicKey : context.$auth.user.accountName, context.$auth.user.vAccountRows[0].id, context.$auth.user.vAccountRows[0].nonce, toAccount, amount, context.$auth.user.permission, memo)
      },

      async vTransfer (toAccount, amount) {
        return await this.sdk.account.vtransfer(this.account.accountName, toAccount, amount, this.account.permission)
      },

      async logout () {
        context.$auth.$storage.setUniversal('rememberAccount', null)
        this.clear()
        await this.eos.logout()
        await this.bsc.logout()
      },

      clear () {
        Object.assign(this.$data, this.$options.data.call(this))
      },
      async getAccountBalance () {
        if (context.$auth.loggedIn) {
          if (context.$auth.user.blockchain === 'bsc') {
            const balance = await this.getBscEFXBalance(context.$auth.user.publicKey)
            this.efxAvailable = parseFloat(balance)
          } else {
            const efxRow = (await this.sdk.api.rpc.get_currency_balance(process.env.NUXT_ENV_EOS_TOKEN_CONTRACT, context.$auth.user.accountName, process.env.NUXT_ENV_EOS_EFX_TOKEN))[0]
            if (efxRow) {
              this.efxAvailable = parseFloat(efxRow.replace(` ${process.env.NUXT_ENV_EOS_EFX_TOKEN}`, ''))
            }
          }
        }
      },
      async getBscEFXBalance (address) {
        // balanceOf && decimals
        const erc20JsonInterface = [
          {
            constant: true,
            inputs: [{ name: '_owner', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: 'balance', type: 'uint256' }],
            type: 'function'
          }
        ]
        const efxAddress = process.env.NUXT_ENV_BSC_EFX_TOKEN_CONTRACT // Token contract address
        const contract = new this.bsc.web3.eth.Contract(erc20JsonInterface, efxAddress)
        try {
          const balance = await contract.methods.balanceOf(address).call()
          return this.bsc.web3.utils.fromWei(balance.toString())
        } catch (error) {
          this.handleError(error)
        }
      },
      async getBatches (nextKey, limit = 20) {
        return await this.sdk.force.getBatches(nextKey, limit)
      },
      async getCampaigns (nextKey, limit = 20) {
        return await this.sdk.force.getCampaigns(nextKey, limit)
      },
      async campaignJoin (accountId, campaignId) {
        return await this.sdk.force.campaignJoin(accountId, campaignId)
      },
      async joinCampaign (accountId, campaignId) {
        return await this.sdk.force.joinCampaign(context.$auth.user.accountName, this.account.permission, accountId, campaignId)
      },
      async uploadCampaign (content) {
        return await this.sdk.force.uploadCampaign(content)
      },
      async reserveTask (batchId, campaignId, taskIndex, tasks) {
        return await this.sdk.force.reserveTask(context.$auth.user.blockchain === 'bsc' ? context.$auth.user.publicKey : context.$auth.user.accountName, this.account.permission, batchId, taskIndex, campaignId, context.$auth.user.vAccountRows[0].id, tasks)
      },
      async submitTask (batchId, campaignId, submissionId, data) {
        return await this.sdk.force.submitTask(context.$auth.user.blockchain === 'bsc' ? context.$auth.user.publicKey : context.$auth.user.accountName, this.account.permission, batchId, submissionId, data, context.$auth.user.vAccountRows[0].id)
      },
      async createBatch (campaignId, batchId, content, repetitions) {
        return await this.sdk.force.createBatch(context.$auth.user.blockchain === 'bsc' ? context.$auth.user.publicKey : context.$auth.user.accountName, this.account.permission, campaignId, batchId, content, repetitions)
      },
      async createCampaign (hash, reward) {
        return await this.sdk.force.createCampaign(context.$auth.user.blockchain === 'bsc' ? context.$auth.user.publicKey : context.$auth.user.accountName, context.$auth.user.vAccountRows[0].id, context.$auth.user.vAccountRows[0].nonce, hash, reward, this.account.permission)
      },
      async getReservations () {
        return await this.sdk.force.getReservations(0, 20)
      },
      async getTaskIndexFromLeaf (leafhash, tasks) {
        return await this.sdk.force.getTaskIndexFromLeaf(leafhash, tasks)
      },
      initSdk () {
        const sdkOptions = {
          network: process.env.NUXT_ENV_EOS_NETWORK,
          host: `https://${process.env.NUXT_ENV_EOS_NODE_URL}:443`,
          signatureProvider: this.eos.wallet ? this.eos.wallet.provider.signatureProvider : null,
          web3: this.bsc.wallet ? this.bsc.web3 : null
        }
        this.sdk = new effectSdk.EffectClient(sdkOptions)
      },

      async recoverPublicKey () {
        const message = 'Effect Account'
        const signature = await bsc.sign(message)
        return this.sdk.account.recoverPublicKey(message, signature)
      },

      handleError (error) {
        console.error(error) // eslint-disable-line no-console
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
    }
  })

  inject('blockchain', blockchain)
}
