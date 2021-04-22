<template>
  <div>
    <span class="is-flex is-align-items-center is-justify-content-center"><span><b>{{ amount }}</b> EFX</span>
    <span v-if="!manualPayout && efxPrice" class="is-size-7 pl-2">| $<b>{{ (amount * efxPrice).toFixed(2) }}</b></span></span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      efxPrice: null
    }
  },
  computed: {
    ...mapState({
      userQualifications: state => state.auth.user.qualifications
    }),
    manualPayout () {
      return this.userQualifications.includes(419)
    }
  },
  name: 'Balance',
  props: ['amount'],
  async created () {
    this.efxPrice = await fetch(
      'https://api.coingecko.com/api/v3/coins/effect-ai/tickers'
    )
      .then(data => data.json())
      .then((data) => {
        return data.tickers[0].converted_last.usd
      })
  }
}
</script>

<style lang="scss" scoped>
</style>
