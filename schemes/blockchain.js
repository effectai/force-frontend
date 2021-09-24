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
    return true
  }

  async fetchUser (account) {
    if (!account) {
      account = { ...this.$auth.user }
    }
    if (!this.check().valid) {
      return Promise.resolve()
    }
    let vAccountRows = []
    try {
      vAccountRows = await this.$blockchain.getVAccount()
      if (!vAccountRows || !vAccountRows.length) {
        // account does not exists
        throw new Error('Cannot find Effect Account')
      }
    } catch (error) {
      alert('Cannot check if account exist, assuming it exists for now..')
    }

    account.vAccountRows = vAccountRows
    this.$auth.setUser(account)
    return Promise.resolve()
  }

  logout (endpoint = {}) {
    return this.$auth.reset()
  }

  reset () {
    this.$auth.setUser(false)
  }
}
