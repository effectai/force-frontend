<template>
  <section class="container is-max-widescreen">
    <form class="column is-6" accept-charset="UTF-8" @submit.prevent="onSubmit()">
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
            v-model="amount"
            required
            class="input"
            type="number"
            placeholder="0.0001"
            step="0.0001">
        </div>
        <p class="control">
          <span class="button is-primary">EFX</span>
        </p>
      </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button :disabled="!amount || !account" type="submit" class="button is-link" :class="{'is-loading': loading}">Withdraw</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click.prevent="clearFields()">Clear fields</button>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      loading: false,
      account: null,
      amount: null
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      await this.withdraw(this.account, this.amount)
      this.loading = false
    },
    async withdraw (account, amount) {
      try {
        if (this.$auth.user.blockchain === 'eos') {
          const result = await this.$blockchain.withdraw(account, amount)
          return result
        } else {
          const result = await this.$blockchain.withdraw(account, amount)
          return result
        }
      } catch (error) {
        this.$blockchain.handleError(error)
      }
    },
    clearFields () {
      this.amount = null
      this.account = null
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
