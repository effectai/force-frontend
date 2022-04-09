<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <h1 class="title mt-5">
        Withdraw tokens
      </h1>

      <div class="tabs is-centered is-large">
        <ul>
          <li
            :class="[destinationBlockchain === 'eos' ? 'is-active' : '']"
            @click.prevent="toggleDestination('eos')"
          >
            <a>
              <span class="icon is-large"><img src="@/assets/img/providers/EOS-logo.svg" alt="EOS" /></span>
              <span>EOS</span>
            </a>
          </li>
          <li>|</li>
          <li
            :class="[destinationBlockchain === 'bsc' ? 'is-active' : ''] "
            @click.prevent="toggleDestination('bsc')"
          >
            <a>
              <span>BSC</span>
              <span class="icon is-large"><img src="@/assets/img/providers/BSC-logo.svg" alt="BSC" /></span>
            </a>
          </li>
        </ul>
      </div>

      <div v-if="err" class="notification is-light is-danger">
        {{ message }}
      </div>

      <div v-if="submitted" class="notification is-light" :class="{'is-danger': err === true, 'is-success': err === false}">
        {{ message }}
        <a target="_blank" :href="transactionUrl">{{ transactionUrl }}</a>
        <br>
        <p v-if="destinationBlockchain === 'bsc'">
          Withdrawing to a BSC addresses will take a while, thank you for your patience.
        </p>
      </div>
      <form class="box has-limited-width is-horizontal-centered" accept-charset="UTF-8" @submit.prevent="validateWithdrawForm">

        <div class="field">
          <label class="label">Destination {{ destinationBlockchain === 'eos' ? 'EOS' : 'BSC' }} Account</label>
          <div class="control">
            <input v-model="account" class="input" type="text" required>
          </div>
        </div>

        <div class="field">
          <label class="label">Amount to withdraw</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input
                v-model="tokenAmount"
                required
                class="input"
                type="number"
                min="0"
                :max="amount"
                :disabled="amount == -1"
                placeholder="0.0001"
                step="0.0001"
                style="height: 100%;"
              >
            </div>
            <p class="control">
              <span class="button is-primary" :disabled="amount == -1" @click.prevent="tokenAmount = amount">{{ amount }} EFX</span>
            </p>
          </div>
        </div>

        <div v-if="destinationBlockchain === 'eos'" class="field">
          <label for="" class="label">Memo (optional)</label>
          <div class="control">
            <input v-model="memo" class="input" type="text" >
          </div>
        </div>

        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button class="button is-link is-light" @click.prevent="clearFields()">
              Clear fields
            </button>
          </div>
          <div class="control">
            <button :disabled="!tokenAmount || !account" type="submit" class="button is-link" :class="{'is-loading': loading}">
              Withdraw
            </button>
          </div>
        </div>
      </form>

    </div>
  </section>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      loading: false,
      account: this.$auth.user.blockchain === 'eos' ? this.$auth.user.accountName : this.$auth.user.address,
      submitted: false,
      message: null,
      err: false,
      tokenAmount: null,
      memo: null,
      transactionUrl: null,
      destinationBlockchain: this.$auth.user.blockchain
    }
  },
  computed: {
    amount () {
      return (this.$blockchain.vefxAvailable !== null ? this.$blockchain.vefxAvailable.toFixed(2) : -1)
    }
  },
  methods: {
    async withdraw () {
      this.loading = true

      const withDrawAccount = this.destinationBlockchain === 'eos' ? this.account : 'xbsc.ptokens'
      const withDrawAmount = parseFloat(this.tokenAmount).toFixed(4)
      const withDrawMemo = this.destinationBlockchain === 'eos' ? this.memo : this.account
      // const userBalance = parseFloat(this.amount).toFixed(4)

      // TODO this makes no sense remove this if you can. there be dragon's here.
      // const booleanresult = withDrawAmount > userBalance || withDrawAmount < 0
      // console.debug('withdrawamount > userblance', withDrawAmount, '>', userBalance, withDrawAmount > userBalance, 'withdrawamount < 0 ', withDrawAmount < 0)
      // if (booleanresult) {
      //   console.debug('amount', withDrawAmount, 'userbalance', userBalance)
      //   this.message = 'Quantity cannot be higher than your balance.'
      //   this.err = true
      //   this.loading = false
      //   return
      // }

      try {
        // console.log('Withdraaaaaaw', withDrawAccount, withDrawAmount, withDrawMemo)
        const result = await this.$blockchain.withdraw(withDrawAccount, withDrawAmount, withDrawMemo)
        if (result) {
          this.err = false
          this.transactionUrl = `${this.$blockchain.sdk.config.eosExplorerUrl}/transaction/${result.transaction_id}`
          this.message = 'Withdrawal successful. Check your transaction here: '
          await this.$blockchain.waitForTransaction(result)
          this.$blockchain.updateUserInfo()
          this.submitted = true
        }
      } catch (error) {
        this.$blockchain.handleError(error)
      }
      this.loading = false
    },
    clearFields () {
      this.tokenAmount = null
      this.account = null
    },
    toggleDestination (destBlockChain) {
      this.destinationBlockchain = destBlockChain
      if (destBlockChain === 'bsc') {
        this.account = this.$auth.user.blockchain === 'bsc' ? this.$auth.user.address : ''
      } else {
        this.account = this.$auth.user.blockchain === 'eos' ? this.$auth.user.accountName : ''
      }
    },
    validateWithdrawForm (e) {
      e.preventDefault()

      if (!this.account) {
        this.message = 'Please fill in a valid EOS account or BSC address'
        this.err = true
      } else if (this.destinationBlockchain === 'eos') {
        if (!this.$blockchain.isEosAccount(this.account)) {
          this.message = 'Invalid EOS Account'
          this.err = true
        } else {
          this.withdraw()
        }
      } else if (!this.$blockchain.isBscAddress(this.account)) {
        this.message = 'Invalid BSC Address'
        this.err = true
      } else {
        this.withdraw()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
