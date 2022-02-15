<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <h1 class="title mt-5">
        Transfer tokens
      </h1>
      <p>Transfer your vEFX tokens from your vAccount account to another vAccount using the form below.</p>
      <br>
      <div v-if="submitted" class="notification is-light" :class="{'is-danger': err === true, 'is-success': err === false}">
        {{ message }}
        <a target="_blank" :href="transactionUrl">{{ transactionUrl }}</a>
      </div>
      <form class="box has-limited-width is-horizontal-centered" accept-charset="UTF-8" @submit.prevent="vtransfer(account, tokenAmount)">
        <div class="field">
          <label class="label">Destination VAccount Name</label>
          <div class="control">
            <input v-model="account" class="input" type="text" required>
          </div>
        </div>

        <div class="field">
          <label class="label">vAccount Contract Balance</label>
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

        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button class="button is-link is-light" @click.prevent="clearFields()">
              Clear fields
            </button>
          </div>
          <div class="control">
            <button :disabled="!tokenAmount || !account" type="submit" class="button is-link" :class="{'is-loading': loading}">
              Transfer
            </button>
          </div>
        </div>
      </form>
      <i>Note: you can only send your virtual EFX through this form.</i>
    </div>
  </section>
</template>
<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      loading: false,
      account: this.$auth.user.blockchain === 'eos' ? this.$auth.user.accountName : null,
      submitted: false,
      message: null,
      err: false,
      tokenAmount: null,
      transactionUrl: null
    }
  },
  computed: {
    amount () {
      return (this.$blockchain.vefxAvailable !== null ? this.$blockchain.vefxAvailable.toFixed(2) : -1)
    }
  },
  methods: {
    async vtransfer (account, tokenAmount) {
      this.loading = true
      if (this.tokenAmount > this.amount || this.tokenAmount < 0) {
        this.message = 'Quantity cannot be higher than your balance.'
        this.err = true
        return
      }

      try {
        const vaccount = await this.$blockchain.getVAccountByName(account)
        if (!vaccount[0]) {
          throw new Error("Can't find vAccount")
        }
        const result = await this.$blockchain.vTransfer(vaccount[0].id, parseFloat(tokenAmount).toFixed(4))
        if (result) {
          this.err = false
          this.transactionUrl = process.env.NUXT_ENV_EOS_EXPLORER_URL + '/transaction/' + result.transaction_id
          this.message = 'Transfer has been successful. Check your transaction here: '
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
