import * as effectSdk from '@effectai/effect-js'
import Vue from 'vue'
import eos from '../services/eos'
import bsc from '../services/bsc'

const effectsdk = new effectSdk.EffectClient(process.env.NUXT_ENV_SDK_ENV)

export default (context, inject) => {
  const blockchain = new Vue({
    data () {
      // Initialize empty SDK, reinitialize when connecting wallet
      return {
        account: null,
        blockchain: null,
        provider: null,
        loginModal: false,
        efxAvailable: null,
        efxPayout: 0,
        efxPending: 0,
        pendingPayout: null,
        eos,
        bsc,
        sdk: effectsdk,
        error: null,
        waitForSignatureFrom: null,
        waitForSignature: 0,
        efxPrice: null,
        userRefreshInterval: null,
        forceRefreshInterval: null,
        templateRefreshInterval: null,
        eosInfo: null,
        relayerStatus: null,
        triggerGenerate: false
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
        if (context.$auth && context.$auth.loggedIn) {
          const vAccountRows = context.$auth.user.vAccountRows
          if (vAccountRows) {
            vAccountRows.forEach((row) => {
              if (row.balance.contract === this.sdk.config.efxTokenContract) {
                balance = parseFloat(row.balance.quantity.replace(` ${this.sdk.config.efxSymbol}`, ''))
              }
            })
          }
        }
        return balance
      }
    },
    created () {
      this.updateUserInfo()
      if (!this.userRefreshInterval) {
        this.userRefreshInterval = setInterval(this.updateUserInfo, parseInt(process.env.NUXT_ENV_USER_UPDATE_RATE, 10))
      }
      if (!this.forceRefreshInterval) {
        this.forceRefreshInterval = setInterval(this.updateForceInfo, parseInt(process.env.NUXT_ENV_FORCE_UPDATE_RATE, 10))
      }
      if (!this.templateRefreshInterval) {
        this.templateRefreshInterval = setInterval(this.updateTemplates, parseInt(process.env.NUXT_ENV_TEMPLATE_UPDATE_RATE, 10))
      }
    },

    beforeDestroy () {
      clearInterval(this.userRefreshInterval)
      clearInterval(this.forceRefreshInterval)
      clearInterval(this.templateRefreshInterval)
    },

    methods: {
      updateForceInfo () {
        // console.log('updating campaigns and batches and submissions..')
        context.store.dispatch('campaign/getCampaigns')
        context.store.dispatch('campaign/getBatches')
        context.store.dispatch('campaign/getSubmissions')
        context.store.dispatch('pendingPayout/loadPendingPayouts')
      },
      updateTemplates () {
        // console.log('updating campaign templates..')
        context.store.dispatch('template/getTemplates')
      },
      updateUserInfo () {
        this.getEfxPrice()
        this.getBlockchainInfo()
        this.getRelayerStatus()
        if (context.$auth.loggedIn) {
          // console.log('updating user and balance..')
          context.$auth.fetchUser()
          this.getAccountBalance()
          this.getPendingBalance()
          this.getPayoutBalance()
          this.getPendingPayouts()
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
      async estimateMinPricePerTask (efx, currency = 'usd') {
        const price = await this.getEfxPrice(currency).catch(console.error)
        if (price) {
          const res = this.sdk.config.taskEstimatedTime < efx * price
          console.log('Minimum price efx', res)
          return res
        }
      },
      async getBlockchainInfo () {
        let eosInfo
        try {
          eosInfo = await this.eos.getEosInfo()
        } catch (e) {
          console.error(e)
        }
        this.eosInfo = eosInfo
      },
      async getRelayerStatus () {
        this.relayerStatus = await this.eos.getRelayerStatus().catch(console.error)
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
            this.getPayoutBalance()
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
          } else if (_chainId !== this.sdk.config.bscHexId) {
            alert(`Please switch to the correct chain:\n${this.sdk.config.bscChainName}, Mainnet, chainId: ${this.sdk.config.bscNetworkId}\n\nCurrently on: ${this.bsc.web3.utils.hexToNumberString(_chainId)}\n\nLogging out.`)
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

      async vTransfer (toAccountId, amount) {
        return await this.sdk.account.vtransfer(toAccountId, amount)
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
            const efxRow = (await this.sdk.api.rpc.get_currency_balance(this.sdk.config.efxTokenContract, context.$auth.user.accountName, this.sdk.config.efxSymbol))[0]
            if (efxRow) {
              this.efxAvailable = parseFloat(efxRow.replace(` ${this.sdk.config.efxSymbol}`, ''))
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
        const efxAddress = this.sdk.config.bscEfxTokenContract// Token contract address
        const contract = new this.bsc.web3.eth.Contract(erc20JsonInterface, efxAddress)
        try {
          const balance = await contract.methods.balanceOf(address).call()
          return this.bsc.web3.utils.fromWei(balance.toString())
        } catch (error) {
          console.error('Could not retrieve balance', error)
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
      async getPayoutBalance () {
        if (context.$auth.loggedIn) {
          const data = await this.sdk.force.getPendingBalance(context.$auth.user.vAccountRows[0].id)
          let pending = 0
          if (data) {
            data.rows.forEach((entry) => {
              if (((new Date(new Date(entry.last_submission_time) + 'UTC').getTime() / 1000) + this.sdk.force.config.payoutDelaySec) < ((Date.now() / 1000))) {
                pending = pending + parseFloat(entry.pending.quantity)
              }
            })
          }
          this.efxPayout = pending
          return this.efxPayout
        }
      },
      async getPendingPayouts () {
        let data
        if (context.$auth && context.$auth.loggedIn) {
          data = await this.sdk.force.getPendingBalance(context.$auth.user.vAccountRows[0].id)
        // console.log('getPendingPayout', data)
        }
        if (data) {
          this.pendingPayouts = data.rows
          return data
        } else {
          return null
        }
      },
      async makeReservation (batches) {
        if (!Array.isArray(batches)) {
          batches = [batches]
        }
        let reservation
        // go through the batches that have available tasks
        for (let i = 0; i < batches.length; i++) {
          await context.store.dispatch('campaign/getBatchTasks', batches[i])
          try {
            reservation = await this.reserveOrClaimTask(batches[i], batches[i].tasks)
            context.app.router.push('/campaigns/' + batches[i].campaign_id + '/' + batches[i].batch_id + '/' + reservation.task_index + '?submissionId=' + reservation.id)
            return
          } catch (error) {
            if (i === batches.length - 1) {
              // no more batches to try..
              if (error.message === 'no available tasks') {
                context.app.router.push('/campaigns/' + batches[i].campaign_id + '?completed=1')
                return
              } else {
                throw error
              }
            }
            console.error('reservation error, trying next batch..', error)
            // there are more batches, so lets try this again
          }
        }
      },
      async getBatches (nextKey, limit = 50, processBatch = true) {
        return await this.sdk.force.getBatches(nextKey, limit, processBatch)
      },
      async getCampaign (id) {
        return await this.sdk.force.getCampaign(id)
      },
      async getMyLastCampaign () {
        return await this.sdk.force.getMyLastCampaign()
      },
      async getCampaigns (nextKey, limit = 50, processCampaign = true) {
        return await this.sdk.force.getCampaigns(nextKey, limit, processCampaign)
      },
      async getSubmissions (nextKey, limit = 50) {
        return await this.sdk.force.getSubmissions(nextKey, limit)
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
      async reserveOrClaimTask (batch, tasks) {
        return await this.sdk.force.reserveOrClaimTask(batch, tasks)
      },
      async reserveTask (batchId, taskIndex, campaignId, tasks) {
        return await this.sdk.force.reserveTask(batchId, taskIndex, campaignId, tasks)
      },
      async claimExpiredTask (taskId, accountId) {
        return await this.sdk.force.claimExpiredTask(taskId, accountId)
      },
      async releaseTask (taskId) {
        return await this.sdk.force.releaseTask(taskId)
      },
      async reclaimTask (taskId) {
        return await this.sdk.force.reclaimTask(taskId)
      },
      async submitTask (batchId, submissionId, data) {
        return await this.sdk.force.submitTask(batchId, submissionId, data)
      },
      async createBatch (campaignId, content, repetitions) {
        return await this.sdk.force.createBatch(campaignId, content, repetitions)
      },
      async pauseBatch (batch) {
        return await this.sdk.force.pauseBatch(batch)
      },
      async resumeBatch (batch) {
        return await this.sdk.force.resumeBatch(batch)
      },
      async editCampaign (id, hash, reward) {
        return await this.sdk.force.editCampaign(id, hash, reward)
      },
      async createCampaign (hash, reward) {
        return await this.sdk.force.createCampaign(hash, reward)
      },
      async payout () {
        return await this.sdk.force.payout()
      },
      async getTaskSubmissionsForBatch (batchId) {
        return await this.sdk.force.getSubmissionsOfBatch(batchId, 'submissions')
      },
      async getTaskReservationsForBatch (batchId) {
        return await this.sdk.force.getSubmissionsOfBatch(batchId, 'reservations')
      },
      async getSubmissionsAndReservationsForBatch (batchId) {
        return await this.sdk.force.getSubmissionsOfBatch(batchId)
      },
      async getTaskIndexFromLeaf (campaignId, batchId, leafhash, tasks, leaves) {
        return await this.sdk.force.getTaskIndexFromLeaf(campaignId, batchId, leafhash, tasks, leaves)
      },
      async getTreeLeaves (campaignId, batchId, tasks) {
        return await this.sdk.force.getTreeLeaves(campaignId, batchId, tasks)
      },
      async connectAccount () {
        const chain = this.account.blockchain
        const account = this.account
        return await this.sdk.connectAccount(chain === 'eos' ? this.eos.wallet.provider.signatureProvider : this.bsc.web3, account)
      },
      async waitForTransaction (transactionResult) {
        return await this.sdk.force.waitTransaction(transactionResult)
      },
      async joinCampaignAndReserveTask (id, batchId, tasksDone, tasks) {
        return await this.sdk.force.joinCampaignAndReserveTask(id, batchId, tasksDone, tasks)
      },
      // createQualification = async (name: string, description: string, type: number, image?: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
      async createQualification (name, description, type, image) {
        return await this.sdk.force.createQualification(name, description, type, image)
      },
      // assignQualification = async (qualificationId: number, campaignId: number, hash: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
      async assignQualification (qualificationId, campaignId, hash) {
        return await this.sdk.force.assignQualification(qualificationId, campaignId, hash)
      },
      // getQualification = async (id: number): Promise<Qualification> => {
      async getQualification (id) {
        return await this.sdk.force.getQualification(id)
      },
      async getAllQualifications () {
        return await this.sdk.force.getAllQualifications()
      },
      // getUserQualifications = async (id: number): Promise<Array<Qualification>> => {
      async getUserQualifications (id) {
        return await this.sdk.force.getUserQualifications(id)
      },

      async recoverPublicKey () {
        const message = 'Effect Account'
        const signature = await bsc.sign(message)
        const addresses = this.sdk.account.recoverPublicKey(message, signature)
        return addresses
      },

      splitCompositeKey (compositeKey) {
        const keys = effectSdk.splitCompositeKey(compositeKey)
        return {
          batch: keys[0],
          campaign: keys[1]
        }
      },

      getPayoutDelay () {
        return this.sdk.force.config.payoutDelaySec
      },

      isBscAddress (address) {
        return effectSdk.isBscAddress(address)
      },

      isEosAccount (accountName) {
        return effectSdk.isEosAccount(accountName)
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
