<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Migrate your Qualifications
      </h1>
      <h2 class="subtitle">
        Migrate your qualifications from the old Force to the new Force
      </h2>
      <p>By connecting your old effect force account,<br>you can migrate over your old qualification to this new Force account.</p>
      <div class="notification is-warning">
        <b>ATTENTION!</b> You can only migrate your old qualifications once, so make sure to do it to your correct account.
      </div>
      <div v-if="user">
        <p>Old Effect Force Account:</p>
        <h2 class="title is-4">
          {{ user.name }}
        </h2>
        <h4 class="subtitle is-5">
          {{ user.email }}
        </h4>
        <div>
          <p /><b>Are you sure you want to migrate over your qualifications from this account?</b></p>
          <button class="button is-primary" :disabled="loading" :class="{'is-loading': loading}" @click="migrate(user.token)">
            Migrate
          </button>
        </div>
        <div class="mt-4">
          <a class=" has-text-danger" @click.prevent="globalLogout(user.token)">
            switch account
          </a>
        </div>
      </div>
      <h3 v-else-if="ssoToken">
        Logging in..
      </h3>
      <h3 v-else>
        <button class="button is-primary" @click="login">
          Connect to old Force account
        </button>
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
      ssoToken: this.$route.query.ssoToken,
      loading: false
    }
  },
  created () {
    if (process.client) {
      if (this.ssoToken) {
        this.getToken(this.ssoToken)
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
      try {
        this.loading = true
        await axios.get(`${process.env.NUXT_ENV_BACKEND_URL}/user/migrate-qualifications`, this.$auth.user.vAccountRows[0].id, { headers: { Authorization: 'Bearer ' + token } })
        this.$router.push('/profile')
      } catch (error) {
        this.$blockchain.handleError(error)
      }
      this.loading = false
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
        this.user = null
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
