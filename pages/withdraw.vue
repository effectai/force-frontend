<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <h1 class="title mt-5">
        Withdraw tokens
      </h1>

      <div class="tabs is-centered is-large">
        <ul>
          <li
            :class="[withdrawalBlockchain === 'eos' ? 'is-active' : '']"
            @click.prevent="withdrawalBlockchain = 'eos'"
          >
            <a>
              <span class="icon is-large"><img src="@/assets/img/providers/EOS-logo.svg" alt="EOS" /></span>
              <span>EOS</span>
            </a>
          </li>
          <li>|</li>
          <li
            :class="[withdrawalBlockchain === 'bsc' ? 'is-active' : ''] "
            @click.prevent="withdrawalBlockchain = 'bsc'"
          >
            <a>
              <span>BSC</span>
              <span class="icon is-large"><img src="@/assets/img/providers/BSC-logo.svg" alt="BSC" /></span>
            </a>
          </li>
        </ul>
      </div>

      <div v-if="submitted" class="notification is-light" :class="{'is-danger': err === true, 'is-success': err === false}">
        {{ message }}
        <a target="_blank" :href="transactionUrl">{{ transactionUrl }}</a>
      </div>

      <form class="box has-limited-width is-horizontal-centered" accept-charset="UTF-8" @submit.prevent="withdraw(account, tokenAmount, memo)">

        <div class="field">
          <label class="label">Destination {{ withdrawalBlockchain === 'eos' ? 'EOS' : 'BSC' }} Account</label>
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
                @submit="checkWithdrawal"
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

        <div v-if="withdrawalBlockchain === 'eos'" class="field">
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
import { isAddress } from 'web3'

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
      withdrawalBlockchain: this.$auth.user.blockchain
    }
  },
  computed: {
    amount () {
      return (this.$blockchain.vefxAvailable !== null ? this.$blockchain.vefxAvailable.toFixed(2) : -1)
    }
  },
  methods: {
    async withdraw (account, tokenAmount, memo) {
      this.loading = true
      if (this.tokenAmount > this.amount || this.tokenAmount < 0) {
        this.message = 'Quantity cannot be higher than your balance.'
        this.err = true
        return
      }

      try {
        const result = await this.$blockchain.withdraw(this.$auth.user.blockchain === 'eos' ? account : 'xbsc.ptokens', parseFloat(tokenAmount).toFixed(4), this.$auth.user.blockchain === 'eos' ? memo : this.$auth.user.address)
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
    checkWithdrawal (e) {
      console.debug('checkform', this.account)
      if (!this.account) {
        this.message = 'Please fill in a valid EOS account or BSC address'
        this.err = true
      } else if (!this.validEosAccount(this.account) && this.withdrawalBlockchain === 'eos') {
        this.message = 'Invalid EOS account'
        this.err = true
      } else if (!this.validBscAddress(this.account && this.withdrawalBlockchain === 'bsc')) {
        this.message = 'Invalid BSC address'
        this.err = true
      } else {
        return true
      }

      e.preventDefault()
    },
    validEosAccount (account) {
      const validEosChars = 'abcdefghijklmnopqrstuvwxyz12345' // Allowed characters for EOS account name
      const maxEosLength = 12
      const validChars = account.split('').every(ela => validEosChars.split('').includes(elb => elb === ela))
      const length = account.length <= maxEosLength
      console.debug('valideosaccount', validChars, length)
      return validChars && length
    },
    validBscAddress (address) {
      return isAddress(address)
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
