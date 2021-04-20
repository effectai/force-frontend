import LocalScheme from '@nuxtjs/auth/lib/schemes/local'
const jwt = require('jsonwebtoken')
const verifyJwtToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.NUXT_ENV_AUTH_PUBLIC_KEY.replace(/\\n/gm, '\n'),
      { algorithms: ['RS256'] },
      (err, decoded) => {
        if (err) {
          return reject(err)
        }
        return resolve(decoded)
      }
    )
  })

export default class AuthScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint) {
    // Token is required but not available
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      return
    }
    const userFromToken = await verifyJwtToken(this.$auth.getToken(this.name).replace('Bearer ', ''))

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser(userFromToken)
      return
    }

    // Try to fetch user
    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    )

    // Transform the user object
    const customUser = {
      ...user,
      app: userFromToken.app
    }

    // Set the custom user
    // The `customUser` object will be accessible through `this.$auth.user`
    // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
    this.$auth.setUser(customUser)
  }
}
