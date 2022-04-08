import Vue from 'vue'
import { toWei } from 'web3'
import eos from '../services/eos'
import bsc from '../services/bsc'
import { pEosioToken } from 'ptokens-peosio-token'
import { JsonRpc } from 'eosjs';

export default (context, inject) => {

  const ptokens = new Vue({
    data() {
      return {
        peos: null,
        status: null,
        error: null,
        statusText: null,
        efxAmount: null,
        eosTransactionId: null,
        bscTransactionId: null,
        eosRpc: new JsonRpc(context.$blockchain.sdk.config.eosNodeUrl),
      }
    },
    computed: {
      eosWallet() {
        return (eos) ? eos.wallet : null
      },
      bscWallet() {
        return (bsc) ? bsc.wallet : null
      },
    },
    methods: {
      init (currentProvider) {
        this.peos = new pEosioToken({
          blockchain: context.$auth.user.blockchain,
          network: context.$blockchain.sdk.config.network,
          pToken: 'EFX',
          ethProvider: currentProvider,
          eosRpc: this.eosRpc,
          eosSignatureProvider: this.$auth.user.provider
        })
      },

      resetSwap() {
        this.peos = null;
        this.status = null;
        this.error = null;
        this.statusText = null;
        this.efxAmount = null;
        this.eosTransactionId = null;
        this.bscTransactionId = null;
      },

      async swapToBsc(amount) {
        this.status = 'start'
        this.statusText = 'Setup swap...'
        this.efxAmount = amount
        this.error = null

        if(!this.peos) {
          this.status = 'failed'
          this.error = 'Something went wrong setting up the swap';
          return
        }
        if(!this.eosWallet || !this.bscWallet) {
          this.status = 'failed'
          this.error = 'Connect your wallets first';
          return
        }

        // Check if EOS account exists before contuining
        let validEosAccount = await eos.isValidEosAccount(this.eosWallet.auth.accountName)
        if (!validEosAccount) {
          this.status = 'failed'
          this.error = 'EOS account not found';
          return
        }

        const swap = () =>
          new Promise((resolve, reject) => {
            this.peos.issue(amount, this.bscWallet[0],
              {
                blocksBehind: 3,
                expireSeconds: 60,
                permission: this.eosWallet.auth.permission,
                actor: this.eosWallet.auth.accountName
              })
            // handle events
            .once('nativeTxConfirmed', (tx) => {
              this.eosTransactionId = tx.transaction_id
              this.status = 'progress'
              this.statusText = 'Transaction on EOS confirmed'
            })
            .once('nodeReceivedTx', (tx) => {
              this.statusText = 'Node received the transaction'
            })
            .once('nodeBroadcastedTx', (tx) => {
              this.statusText = 'Broadcasted transaction'
            })
            .once('hostTxConfirmed', (tx) => {
              // console.log(tx)
              this.bscTransactionId = tx.transactionHash
              this.statusText = 'Transaction on BSC confirmed'
            })
            .then(() => resolve())
            .catch((e) =>  {
              this.status = 'failed'
              this.error = e
              reject(e)
            })
          })
        await swap()

        this.status = 'finished'
        this.statusText = 'Finished swap'
      },

      async swapToEos(amount) {
        this.status = 'start'
        this.statusText = 'Setup swap...'
        this.efxAmount = amount
        this.error = null

        if(!this.peos) {
          this.status = 'failed'
          this.error = 'Something went wrong setting up the swap';
          return
        }
        if(!this.eosWallet || !this.bscWallet) {
          this.status = 'failed'
          this.error = 'Connect your wallets first';
          return
        }

        // Check if EOS account exists before contuining
        let validEosAccount = await eos.isValidEosAccount(this.eosWallet.auth.accountName)
        if (!validEosAccount) {
          this.status = 'failed'
          this.error = 'EOS account not found';
          return
        }

        const swap = () =>
          new Promise((resolve, reject) => {

            this.peos.redeem(toWei(amount.toString()), this.eosWallet.auth.accountName,
              {
                //gasPrice: 100e9,
                gas: 80000
              })
            // handle events
            .once('hostTxBroadcasted', (tx) => {
              this.status = 'progress'
              this.statusText = 'Broadcasted transaction'
            })
            .once('hostTxConfirmed', (tx) => {
              this.bscTransactionId = tx.transactionHash
              this.statusText = 'Transaction on BSC confirmed'
            })
            .once('nodeReceivedTx', (tx) => {
              this.statusText = 'Node received the transaction'
            })
            .once('nativeTxConfirmed', (tx) => {
              // console.log(tx)
              this.eosTransactionId = tx.id
              this.statusText = 'Transaction on EOS confirmed'
            })
            .then(() => resolve())
            .catch((_err) =>  {
              this.status = 'failed'
              this.statusText = _err
              reject(_err)
            })
          })
        await swap()

        this.status = 'finished'
        this.statusText = 'Completed swap'
      },
    }
  })

  inject('ptokens', ptokens)
}
