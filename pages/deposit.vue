<template>
  <section class="container">
    <div class="modal" :class="{'is-active': loading}">
      <div class="modal-background"></div>
      <div class="modal-content p-5 has-background-light has-radius">
        <form accept-charset="UTF-8" @submit.prevent="onSubmit()">
          <h2 class="subtitle is-3">Memo and Address</h2>
          <p>Before continuing, understand that both a Memo and Address are <span class="has-text-danger">required</span> to successfully deposit your tokens.</p>
          <label class="checkbox mt-3">
            <input v-model="modal_confirmation" type="checkbox" required>
            I understand that deposits <b>WITHOUT</b> Memo or Address are <b>INVALID</b> and will result into funds <b>NOT ARRIVING</b> into my address.
          </label>
          <div class="has-text-right mt-3">
            <button class="button is-warning" type='submit'>I understand</button>
          </div>
        </form>
      </div>
    </div>
    <div class="block">
      <div class="notification is-danger is-light mt-3" role="alert">
        When depositing to this address, you must enter the "memo" in the message field of the transaction. <b>DO NOT ENCRYPT THE MESSAGE!</b> Forgetting this will result in funds not arriving at your address.
      </div>
      <b>Address</b>
      <div class="copy-wrapper">
        <pre class="text">{{ account }}</pre>
        <div class="tooltip">
          <button class="button custom-button" type="button" @click.prevent="copyToClipboard(account, 'address')" @mouseout="clearTooltip('address')">
            <span class="tooltiptext" id="tooltip-address">Copy to clipboard</span>
            <img src="https://icongr.am/clarity/copy.svg" alt="Icon">
          </button>
        </div>
      </div>
      <b>Memo</b>
      <div class="copy-wrapper">
        <pre class="text">{{ memo }}</pre>
        <div class="tooltip">
          <button class="button custom-button" type="button" @click.prevent="copyToClipboard(memo, 'memo')" @mouseout="clearTooltip('memo')">
            <span class="tooltiptext" id="tooltip-memo">Copy to clipboard</span>
            <img src="https://icongr.am/clarity/copy.svg" alt="Icon">
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  middleware: ['auth'],
  data () {
    return {
      loading: true,
      modal_confirmation: false,
      memo: this.$auth.$storage.getUniversal('rememberAccount').vAccountRows[0].id,
      account: this.$blockchain.sdk.account.config.ACCOUNT_CONTRACT,
      clipboard: navigator.clipboard
    }
  },
  created () {

  },
  methods: {
    onSubmit () {
      if (this.modal_confirmation === true) {
        this.loading = false
      }
    },
    copyToClipboard (content, type) {
      navigator.clipboard.writeText(content).then(() => {
        this.copied = true
        const tooltip = document.getElementById('tooltip-' + type)
        tooltip.innerHTML = 'Copied!'
      })
    },
    clearTooltip (type) {
      const tooltip = document.getElementById('tooltip-' + type)
      tooltip.innerHTML = 'Copy to clipboard'
    }
  }
}
</script>

<style lang="scss" scoped>
  .copy-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    border: 2px solid $light;
    padding: 0;
    border-radius: 4px;

    pre.text {
      width: 100%;
      margin: 10px;
      padding: 10px;
    }
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  .custom-button {
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin: 0 15px 0 0;

    &:focus {
      outline: none;
    }

    & img {
      width: 25px;
    }
  }

.tooltip {
  position: relative;
  display: inline-block;

  & .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: #555;
    color: $light;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    font-size: 14px;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
  }
  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
}

</style>
