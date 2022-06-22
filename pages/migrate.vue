<template>
  <section class="section">
    <div class="container">
      <div v-if="user">
        <h2 class="title">
          {{ user.name }}
        </h2>
        <h4 class="subtitle">
          {{ user.email }}
        </h4>
        <div>
          <button class="button is-primary" @click="migrate(user.token)">
            Migrate
          </button>
        </div>
        <div class="mt-4">
          <button class="button is-danger" @click="globalLogout(user.token)">
            Logout
          </button>
        </div>
      </div>
      <h3 v-else-if="ssoToken">
        Logging in..
      </h3>
      <h3 v-else>
        Redirecting to authorization server..
      </h3>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
const jwt = require('jsonwebtoken')

const verifyJwtToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.NUXT_ENV_AUTH_PUBLIC_KEY,
      { algorithms: ['RS256'] },
      (err, decoded) => {
        if (err) { return reject(err) }
        return resolve(decoded)
      }
    )
  })

export default {
  name: 'Migrate',
  middleware: ['auth'],
  data () {
    return {
      user: null,
      ssoToken: this.$route.query.ssoToken
    }
  },
  created () {
    if (process.client) {
      if (this.ssoToken) {
        this.getToken(this.ssoToken)
      } else {
        this.login()
      }
    }
  },
  methods: {
    login () {
      const redirect = window.location.origin + '/migrate'
      window.location = `${process.env.NUXT_ENV_AUTH_SERVER}?redirect=${redirect}`
    },
    async migrate (token) {
      // TODO: show error and success messages
      const response = await axios.post(`${process.env.NUXT_ENV_BACKEND_URL}/user/migrate-qualifications`, this.$auth.user.vAccountRows[0].id, { headers: { Authorization: 'Bearer ' + token } })
      console.log(response.data)
    },
    async getToken (ssoToken) {
      let token
      let user
      try {
        console.log(`${process.env.NUXT_ENV_AUTH_SERVER}/verify`, ssoToken)
        const response = await axios.post(`${process.env.NUXT_ENV_AUTH_SERVER}/verify`, { ssoToken }, { headers: { Auth: 'NO-AUTH' } })
        token = response.data.token
        user = await verifyJwtToken(token)
        user.token = token
        this.user = user
        console.log('logged in', user)
      } catch (e) {
        console.error(e)
      }
      this.ssoToken = null
      const query = Object.assign({}, this.$route.query)
      delete query.ssoToken
      this.$router.replace({ query })
      return user
    },

    async globalLogout (token) {
      try {
        const config = { withCredentials: true, crossDomain: true }
        if (token) {
          config.headers = { Authorization: 'Bearer ' + token }
        }
        await axios.get(`${process.env.NUXT_ENV_AUTH_SERVER}/logout`, config)
        this.login()
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },

    isAdmin (user) {
      return !!user && (user.roles.includes('admin') || user.app.roles.includes('admin'))
    }
  }
}
</script>
