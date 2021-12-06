<template>
  <div id="app">
    <bsc-wallet />
    <eos-wallet />
    <div class="container">
      <div class="columns is-gapless is-vcentered is-multiline is-centered" style="min-height: 100vh">
        <div class="column is-6-tablet is-5-widescreen ">
          <div class="box is-paddingless">
            <div class="has-text-centered pt-6">
              <img src="~assets/img/logo.svg" class="logo" width="150px">
            </div>
            <nuxt class="p-5" />
          </div>
          <div class="has-text-grey-light is-size-7 pl-2">
            © 2021 Effect.AI B.V.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BscWallet from '@/components/BscWallet'
import EosWallet from '@/components/EosWallet'

export default {
  components: {
    BscWallet,
    EosWallet
  }
}
</script>

<style lang="scss">
html {
  min-height: 100vh;
  background-size: cover;
}
</style>
