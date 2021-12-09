import * as effectSdk from '@effectai/effect-js'
import Vue from 'vue'
import eos from '../services/eos'
import bsc from '../services/bsc'

export default (context, inject) => {
  const blockchain = new Vue({
    data () {
      // Initialize empty SDK, reinitialize when connecting wallet
      const eosHost = process.env.NUXT_ENV_EOS_NODE_URL.includes('localhost') ? `http://${process.env.NUXT_ENV_EOS_NODE_URL}:8888` : `https://${process.env.NUXT_ENV_EOS_NODE_URL}:443`
      const sdkOptions = {
        network: process.env.NUXT_ENV_EOS_NETWORK,
        host: eosHost
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
        sdk: new effectSdk.EffectClient(process.env.NUXT_ENV_EOS_NETWORK, sdkOptions),
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
        let balance = 0
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
        this.getEfxPrice()
        if (context.$auth.loggedIn) {
          context.$auth.fetchUser()
          this.getAccountBalance()
          this.getPendingBalance()
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
        // const rememberAccount = null
        if (rememberAccount) {
          const loggedIn = await this.login(rememberAccount.provider, rememberAccount.blockchain, rememberAccount)
          await this.connectAccount()
          if (loggedIn) {
            await context.$auth.loginWith('blockchain', {
              account: this.account,
              $blockchain: this
            })
            this.getAccountBalance()
            this.getPendingBalance()
            // Needed because there is a redirect bug when going to a protected route from the login page
            const path = context.$auth.$storage.getUniversal('redirect') || '/'
            context.$auth.$storage.setUniversal('redirect', null)
            context.app.router.push(path)
          }
        }
      },
      async login (providerName, blockchain, rememberAccount, pk) {
        let account
        try {
          if (blockchain === 'eos') {
            const wallet = await this.eos.connect(providerName, rememberAccount ? rememberAccount.accountName : null, rememberAccount ? rememberAccount.permission : null)
            account = { accountName: wallet.auth.accountName, permission: wallet.auth.permission, address: wallet.auth.publicKey, publicKey: wallet.auth.publicKey }
          } else if (blockchain === 'bsc') {
            if (rememberAccount && rememberAccount.privateKey) {
              pk = rememberAccount.privateKey
            }
            const provider = await this.bsc.connect(providerName, pk)
            let accountName
            if (rememberAccount) {
              accountName = rememberAccount.accountName
              // Make sure we still have the same connection as our stored account
              if (rememberAccount.address.toLowerCase() !== this.bsc.wallet.address.toLowerCase()) {
                await this.logout()
                return false
              }
            } else {
              accountName = (await this.recoverPublicKey()).accountName
            }
            if (providerName === 'burner-wallet') {
              account = { accountName, address: this.bsc.wallet.address, privateKey: this.bsc.wallet.privateKey }
            } else {
              this.registerBscListeners(provider)
              account = { accountName, address: this.bsc.wallet.address }
            }
          }
          if (account) {
            account.blockchain = blockchain
            account.provider = providerName
            this.account = account
            return true
          }
          return false
        } catch (error) {
          return false
        }
      },
      async switchBscAccountBeforeLogin () {
        this.waitForSignature++
        try {
          const account = { ...this.account }
          // Make sure address matches with the public key we get from bsc wallet
          const addresses = await this.recoverPublicKey()

          // Check if this is the signature we are currently waiting for, as we could have multiple signature requests..
          if (addresses.address.toLowerCase() === this.waitForSignatureFrom.toLowerCase() && addresses.address.toLowerCase() === this.bsc.wallet.address.toLowerCase()) {
            this.waitForSignatureFrom = null
            account.accountName = addresses.accountName
            account.address = this.bsc.wallet.address
            this.account = account
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
          this.bsc.wallet = bsc.wallet = { address: newWallet[0] }
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
        return await this.sdk.account.openAccount(this.account.accountName, this.account.permission)
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
        return await this.sdk.account.deposit(amount)
      },

      async withdraw (toAccount, amount, memo) {
        return await this.sdk.account.withdraw(toAccount, amount, memo)
      },

      async vTransfer (toAccount, toAccountId, amount) {
        return await this.sdk.account.vtransfer(toAccount, toAccountId, amount, { permission: this.account.permission, address: context.$auth.user.address })
      },

      async logout () {
        context.$auth.$storage.setUniversal('rememberAccount', null)
        this.clear()
        await this.eos.disconnect()
        await this.bsc.disconnect()
      },

      clear () {
        Object.assign(this.$data, this.$options.data.call(this))
      },
      async getAccountBalance () {
        if (context.$auth.loggedIn) {
          if (context.$auth.user.blockchain === 'bsc') {
            const balance = await this.getBscEFXBalance(context.$auth.user.address)
            this.efxAvailable = parseFloat(balance)
          } else {
            const efxRow = (await this.sdk.api.rpc.get_currency_balance(process.env.NUXT_ENV_EOS_TOKEN_CONTRACT, context.$auth.user.accountName, process.env.NUXT_ENV_EOS_EFX_TOKEN))[0]
            if (efxRow) {
              this.efxAvailable = parseFloat(efxRow.replace(` ${process.env.NUXT_ENV_EOS_EFX_TOKEN}`, ''))
            } else {
              this.efxAvailable = 0
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
          console.log(error)
          this.handleError(error)
        }
      },
      async getPendingBalance () {
        if (context.$auth.loggedIn) {
          const data = await this.sdk.force.getPendingBalance(context.$auth.user.vAccountRows[0].id)
          let pending = 0
          if (data) {
            data.rows.forEach((entry) => {
              pending += parseFloat(entry.pending.quantity)
            })
          }
          this.efxPending = pending
        }
      },
      async getBatches (nextKey, limit = 20) {
        return await this.sdk.force.getBatches(nextKey, limit)
      },
      async getCampaign (id) {
        return await this.sdk.force.getCampaign(id)
      },
      async getCampaigns (nextKey, limit = 20, processCampaign = true) {
        return await this.sdk.force.getCampaigns(nextKey, limit, processCampaign)
      },
      async getCampaignJoins (campaignId) {
        return await this.sdk.force.getCampaignJoins(campaignId)
      },
      async joinCampaign (campaignId) {
        return await this.sdk.force.joinCampaign(campaignId)
      },
      async uploadCampaign (content) {
        return await this.sdk.force.uploadCampaign(content)
      },
      async reserveTask (batchId, campaignId, taskIndex, tasks) {
        return await this.sdk.force.reserveTask(batchId, taskIndex, campaignId, tasks)
      },
      async submitTask (batchId, submissionId, data) {
        return await this.sdk.force.submitTask(batchId, submissionId, data)
      },
      async createBatch (campaignId, content, repetitions) {
        return await this.sdk.force.createBatch(campaignId, content, repetitions)
      },
      async editCampaign (id, hash, reward) {
        return await this.sdk.force.editCampaign(id, hash, reward)
      },
      async createCampaign (hash, reward) {
        return await this.sdk.force.createCampaign(hash, reward)
      },
      async getReservations () {
        return await this.sdk.force.getReservations()
      },
      async getTaskSubmissionsForBatch (batchId) {
        return await this.sdk.force.getTaskSubmissionsForBatch(batchId)
      },
      async getTaskReservationsForBatch (batchId) {
        return await this.sdk.force.getTaskReservationsForBatch(batchId)
      },
      async getSubmissionsAndReservationsForBatch (batchId) {
        return await this.sdk.force.getSubmissionsAndReservationsForBatch(batchId)
      },
      async getTaskIndexFromLeaf (campaignId, batchId, leafhash, tasks) {
        return await this.sdk.force.getTaskIndexFromLeaf(campaignId, batchId, leafhash, tasks)
      },
      async connectAccount () {
        const chain = this.account.blockchain
        const account = this.account
        return await this.sdk.connectAccount(chain === 'eos' ? this.eos.wallet.provider.signatureProvider : this.bsc.web3, account)
      },
      async waitForTransaction (transactionId) {
        return await this.sdk.force.waitTransaction(transactionId)
      },

      async recoverPublicKey () {
        const message = 'Effect Account'
        const signature = await bsc.sign(message)
        const addresses = this.sdk.account.recoverPublicKey(message, signature)
        return addresses
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
