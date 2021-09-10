<template>
  <span>
    <div class="modal" :class="{ 'is-active': $eos.loginModal }">
      <div class="modal-background" @click="$eos.loginModal = false" />
      <div class="modal-card">
        <div v-if="error" class="notification is-danger">
          <button class="delete" @click="error = null" />
          {{ error }}
        </div>
        <header class="modal-card-head">
          <p class="modal-card-title">
            Select your EOS wallet
          </p>
          <button class="delete" aria-label="close" @click="$eos.loginModal = false" />
        </header>
        <section class="modal-card-body">
          <div v-if="loading" class="loader-wrapper is-active">
            <div class="loader is-loading" />
          </div>
          <div class="columns is-multiline">
            <div class="column is-half">
              <div class="provider has-radius" @click="selectWallet(providers.anchor)">
                <img src="@/assets/img/providers/anchor.svg">
                Anchor
              </div>
            </div>
            <div class="column is-half">
              <div class="provider has-radius" @click="selectWallet(providers.scatter)">
                <img src="@/assets/img/providers/scatter.svg">
                Scatter
              </div>
            </div>
            <div class="column is-half">
              <div class="provider has-radius is-mobile" @click="selectWallet(providers.lynx)">
                <img src="@/assets/img/providers/lynx.svg">
                Lynx
              </div>
            </div>
            <div class="column is-half">
              <div class="provider has-radius is-mobile" @click="selectWallet(providers.tokenpocket)">
                <img src="@/assets/img/providers/tokenpocket.png">
                Token Pocket
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      error: null
    }
  },
  computed: {
    providers () {
      return this.$eos.providers
    }
  },
  created () {
    const provider = this.$auth.$storage.getUniversal('provider')
    if (provider) {
      this.$eos.loginModal = true
      this.selectWallet(provider)
    }
  },
  methods: {
    async selectWallet (index) {
      this.loading = true
      try {
        await this.$eos.login(index)
        this.$eos.loginModal = false
      } catch (error) {
        this.error = error
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card-body {
  border-radius: 0 0 6px 6px;
}
.modal-card {
  max-width: 500px;
}
.column {
  padding: 0.5rem;
  .provider {
    padding: 10px;
    border: 1px solid #CCC;
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    img {
      float: left;
      height: 40px;
      max-height: none;
      max-width: none;
      margin-right: 8px;
    }
    &:hover {
      background: #f3f3f3;
      cursor: pointer;
    }
  }
}
</style>
