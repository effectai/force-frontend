import { BaseScheme } from '~auth/runtime'

const DEFAULTS = {
  name: 'blockchain'
}

export default class BlockchainScheme extends BaseScheme {
  constructor ($auth, options, ...defaults) {
    super($auth, options, ...defaults, DEFAULTS)
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

  async login ({ account = {}, reset = true } = {}) {
    if (reset) {
      this.$auth.reset()
    }

    await this.fetchUser(account)
    return true
  }

  fetchUser (account) {
    if (!this.check().valid) {
      return Promise.resolve()
    }
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
