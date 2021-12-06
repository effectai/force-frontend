<template>
  <section class="section">
    <div class="modal" :class="{'is-active': !confirmed}">
      <div class="modal-background" />
      <div class="modal-content p-5 has-background-light has-radius">
        <form accept-charset="UTF-8" @submit.prevent="confirmed = modalConfirmation">
          <h2 class="subtitle is-3">
            Memo and Address
          </h2>
          <p>Before continuing, understand that both a Memo and Address are <span class="has-text-danger">required</span> to successfully deposit your tokens.</p>
          <label class="checkbox mt-3">
            <input v-model="modalConfirmation" type="checkbox" required>
            I understand that deposits <b>WITHOUT</b> Memo or Address are <b>INVALID</b> and will result into funds <b>NOT ARRIVING</b> into my address.
          </label>
          <div class="has-text-right mt-3">
            <button class="button is-warning" type="submit">
              I understand
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="container is-max-widescreen">
      <h1 class="title">
        Deposit EFX tokens
      </h1>

      <div class="notification is-danger is-light mt-3" role="alert">
        When depositing to this address, you must enter the "memo" in the message field of the transaction. Forgetting this will result in funds not arriving at your address.
      </div>
      <div class="box has-limited-width is-horizontal-centered">
        <div class="field">
          <label class="label">Manual Deposit Address</label>
          <div class="control has-icons-right">
            <input class="input blockchain-address" type="text" :value="account" readonly>
            <span class="p-2 icon is-small is-right is-clickable has-tooltip-arrow has-tooltip-fade" :data-tooltip="copy_message" @click.prevent="copyToClipboard(account)" @mouseout="copy_message = 'Copy to clipboard'">
              <img src="~assets/img/icons/copy.svg" alt="Copy">
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Memo</label>
          <div class="control has-icons-right">
            <input class="input blockchain-address" type="text" :value="memo" readonly>
            <span class="p-2 icon is-small is-right is-clickable has-tooltip-arrow has-tooltip-fade" :data-tooltip="copy_message" @click.prevent="copyToClipboard(memo)" @mouseout="copy_message = 'Copy to clipboard'">
              <img src="~assets/img/icons/copy.svg" alt="Copy">
            </span>
          </div>
        </div>
      </div>
      <div v-if="$blockchain.efxAvailable && $auth.user.blockchain === 'eos'">
        <div class="has-text-centered title">
          - OR -
        </div>
        <div v-if="submitted" class="notification is-light" :class="{'is-danger': err === true, 'is-success': err === false}">
          {{ message }}
          <a target="_blank" :href="transactionUrl">{{ transactionUrl }}</a>
        </div>
        <form class="box is-horizontal-centered has-limited-width" accept-charset="UTF-8" @submit.prevent="deposit(tokenAmount)">
          <div class="field">
            <label class="label">Deposit from Wallet Balance</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  v-model="tokenAmount"
                  required
                  class="input"
                  type="number"
                  min="0"
                  :max="$blockchain.efxAvailable"
                  :disabled="!$blockchain.efxAvailable"
                  placeholder="0.0001"
                  step="0.0001"
                >
              </div>
              <p class="control">
                <span class="button is-primary" :disabled="!$blockchain.efxAvailable" @click.prevent="tokenAmount = $blockchain.efxAvailable">{{ $blockchain.efxAvailable }} EFX</span>
              </p>
            </div>
          </div>

          <div class="field is-grouped-right is-grouped">
            <div class="control">
              <button :disabled="!tokenAmount" type="submit" class="button is-link" :class="{'is-loading': loading}">
                Deposit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      submitted: false,
      message: null,
      err: false,
      tokenAmount: null,
      transactionUrl: null,
      confirmed: false,
      loading: false,
      copy_message: 'Copy to clipboard',
      modalConfirmation: false,
      memo: this.$auth.user.vAccountRows[0].id,
      account: this.$blockchain.sdk.account.config.account_contract,
      clipboard: navigator.clipboard
    }
  },
  methods: {
    copyToClipboard (content) {
      navigator.clipboard.writeText(content).then(() => {
        this.copy_message = 'Copied!'
      })
    },
    async deposit (tokenAmount) {
      this.loading = true
      if (this.tokenAmount > this.$blockchain.efxAvailable || this.tokenAmount < 0) {
        this.message = 'Quantity cannot be higher than your balance.'
        this.err = true
        return
      }

      try {
        const result = await this.$blockchain.deposit(parseFloat(tokenAmount).toFixed(4))
        if (result) {
          this.$store.dispatch('transaction/addTransaction', result)
          this.transactionUrl = process.env.NUXT_ENV_EOS_EXPLORER_URL + '/transaction/' + result.transaction_id
          this.message = 'Withdrawing has been successful. Check your transaction here: '
          await this.$blockchain.waitForTransaction(result.transaction_id)
          this.$blockchain.updateBlockchainInfo()
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        this.message = error
        this.err = true
      }
      this.loading = false
      this.submitted = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
