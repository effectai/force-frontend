import { BaseScheme } from '~auth/runtime'

const DEFAULTS = {
  name: 'blockchain'
}

export default class BlockchainScheme extends BaseScheme {
  constructor ($auth, options, ...defaults) {
    super($auth, options, ...defaults, DEFAULTS)
    this.$blockchain = null
  }

  check () {
    const response = {
      valid: false
    }
    response.valid = true
    return response
  }

  mounted () {
  }

  async login ({ account = {}, reset = true, $blockchain } = {}) {
    if (reset) {
      console.log('reset?')
      this.$auth.reset()
    }
    this.$blockchain = $blockchain
    console.log('loginWith', this.$blockchain)
    await this.fetchUser(account)
    return true
  }

  async fetchUser (account) {
    console.log('3', this.$blockchain)
    if (!account) {
      account = { ...this.$auth.user }
    }
    if (!this.check().valid) {
      return Promise.resolve()
    }
    let vAccountRows = []
    console.log('fetchUser', account, this.$blockchain)
    vAccountRows = await this.$blockchain.getVAccountByName()
    if (!vAccountRows || !vAccountRows.length) {
      // account does not exists
      throw new Error('Cannot find Effect Account')
    }

    account.vAccountRows = vAccountRows
    this.$auth.setUser(account)
    return Promise.resolve()
  }

  async logout (endpoint = {}) {
    if (this.$blockchain) {
      await this.$blockchain.logout()
    }
    return this.$auth.reset()
  }

  reset () {
    this.$auth.setUser(false)
  }
}
