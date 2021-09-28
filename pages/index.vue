<template>
  <section class="section">
    <div class="container">
      <div class="text-center mb-4">
        <a class="button is-primary" @click="deposit('1.0000')">test deposit</a>
        <br><br>
        <a class="button is-primary" @click="withdraw('1.0000')">test withdraw</a>
      </div>
      <campaign-list />
    </div>
  </section>
</template>

<script>
import CampaignList from '@/components/CampaignList'
export default {
  components: {
    CampaignList
  },
  middleware: ['auth'],
  created () {
  },
  methods: {
    async deposit (amount) {
      try {
        if (this.$auth.user.blockchain === 'eos') {
          const result = await this.$blockchain.deposit(amount)
          return result
        } else {
          alert('no support yet for bsc')
        }
      } catch (error) {
        this.$blockchain.handleError(error)
      }
    },
    async withdraw (amount) {
      try {
        if (this.$auth.user.blockchain === 'eos') {
          const result = await this.$blockchain.withdraw(this.$auth.user.accountName, amount)
          return result
        } else {
          const result = await this.$blockchain.withdraw('testjairtest', amount)
          console.log(result)
          alert('no support yet for bsc')
        }
      } catch (error) {
        this.$blockchain.handleError(error)
      }
    }
  }
}
</script>

<style>
</style>
