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
      this.$auth.reset()
    }
    this.$blockchain = $blockchain
    await this.fetchUser(account)
    return false
  }

  async fetchUser (account) {
    if (!account) {
      account = { ...this.$auth.user }
    }
    if (!this.check().valid) {
      return Promise.resolve()
    }
    let vAccountRows = []
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
