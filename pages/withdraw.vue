<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <div class="notification is-light" v-if="submitted" :class="{'is-danger': err === true, 'is-success': err === false}">
        {{ message }}
        <a target="_blank" :href="transactionUrl">{{ transactionUrl }}</a>
      </div>
      <form class="column is-6" accept-charset="UTF-8" @submit.prevent="withdraw(account, tokenAmount)">
        <h1 class="title mt-5">Transfer tokens</h1>
        <div class="field">
          <label class="label">Destination Account</label>
          <div class="control">
            <input v-model="account" class="input" type="text" required>
          </div>
        </div>

        <div class="field">
          <label class="label">Quantity</label>
          <div class="field has-addons">
            <div class="control">
              <input
                v-model="tokenAmount"
                required
                class="input"
                type="number"
                min=0
                :max="amount"
                :disabled="amount == -1"
                placeholder="0.0001"
                step="0.0001">
            </div>
            <p class="control">
              <span class="button is-primary" :disabled="amount == -1" @click.prevent="tokenAmount = amount">{{ amount }} EFX</span>
            </p>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button :disabled="!tokenAmount || !account" type="submit" class="button is-link" :class="{'is-loading': loading}">Withdraw</button>
          </div>
          <div class="control">
            <button class="button is-link is-light" @click.prevent="clearFields()">Clear fields</button>
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
      account: null,
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
    async withdraw (account, tokenAmount) {
      this.loading = true
      if (this.tokenAmount > this.amount || this.tokenAmount < 0) {
        this.message = 'Quantity cannot be higher than your balance.'
        this.err = true
        return
      }

      try {
        const result = await this.$blockchain.withdraw(account, parseFloat(tokenAmount).toFixed(4))
        if (result) {
          this.transactionUrl = process.env.NUXT_ENV_EOS_EXPLORER_URL + '/transaction/' + result.transaction_id
          this.message = 'Withdrawing has been successful. Check your transaction here: '

          setTimeout(() => {
            this.$auth.fetchUser()
          }, 1000)
        }
      } catch (error) {
        this.$blockchain.handleError(error)
        this.message = error
        this.err = true
      }
      this.loading = false
      this.submitted = true
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
