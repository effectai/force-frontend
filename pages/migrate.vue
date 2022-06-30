<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Qualification migration
      </h1>
      <h2 class="subtitle">
        Migrate your qualifications from the old Force to the new Force
      </h2>
      <p>
        With great pleasure we would like to announce that it will finally be possible for you to migrate your old qualifications to the new Effect Force.
        This means that we will soon be sunsetting the old Effect Force on the <strong>1st of September</strong>.
        In order to keep your old qualifications please migrate them before this date.
        You will not be able to migrate your old qualifications after this date anymore.
        Ofcourse you will be able to earn them again by doing a qualifier.
      </p>
      <br>
      <p>By connecting your old effect force account, you can migrate over your old qualification to this new Force account.</p>
      <hr>
      <div v-if="migrationNeeded || succesMessage">
        <div v-if="user" class="container">
          <div class="notification is-warning">
            <b>ATTENTION!</b> You can only migrate your old qualifications <strong>ONCE</strong>, so make sure to do it with your correct account.
          </div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <p>Old Effect Force Account:</p>
                <hr>
                <h2 class="title is-4">
                  {{ user.email }}
                </h2>
                <br>
                <h4 class="subtitle is-5">
                  {{ user.name }}
                </h4>
              </div>
            </div>
            <div class="level-item" style="max-width: 10px;">
              <font-awesome-icon icon="fa-solid fa-arrow-right-long" class="fa-2xl"/>
            </div>
            <div class="level-item">
              <div>
                <p>New Effect Force Account:</p>
                <hr>
                <h2 class="title is-4">
                  {{ $auth.user.accountName.slice(0, 5) }}...{{ $auth.user.accountName.slice($auth.user.accountName.length - 5, $auth.user.accountName.length) }}@{{ $auth.user.blockchain }}
                </h2>
                <br>
                <h4 class="subtitle is-5">
                  vAccountID: <strong>{{ $auth.user.vAccountRows[0].id }}</strong>
                </h4>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="buttons is-centered">
              <button class="button has-text-danger" :disabled="loading" @click.prevent="globalLogout(user.token)">
                Switch old account
              </button>
              <button class="button is-primary" :disabled="loading" :class="{'is-loading': loading}" @click="migrate(user.token)">
                Migrate
              </button>
            </div>
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
      <div v-else>
        <h1 class="title is-5">
          You have already migrated an old account to this account.
        </h1>
      </div>
    </div>
    <!-- SuccessModal -->
    <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
  </section>
</template>

<script>
import axios from 'axios'
import SuccessModal from '@/components/SuccessModal'
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
  components: {
    SuccessModal
  },
  data () {
    return {
      user: null,
      ssoToken: this.$route.query.ssoToken,
      loading: false,
      migrationNeeded: true,
      successMessage: '',
      successTitle: ''
    }
  },
  created () {
    if (process.client) {
      if (this.ssoToken) {
        this.getToken(this.ssoToken)
      }
    }
    this.checkMigrationNeeded()
  },
  methods: {
    login () {
      const redirect = window.location.origin + '/migrate'
      window.location = `${process.env.NUXT_ENV_AUTH_SERVER}?redirect=${redirect}`
    },
    async migrate (token) {
      // TODO: show error and success messages
      if (confirm('Are you sure you want to migrate over your qualifications from this account?')) {
        try {
          this.loading = true
          await axios.post(`${process.env.NUXT_ENV_BACKEND_URL}/user/migrate-qualifications`, this.$auth.user.vAccountRows[0].id, { headers: { Authorization: 'Bearer ' + token } })
          this.successTitle = 'Migration complete!'
          this.successMessage = 'Congratulations! You have successfully migrated your earned qualifications to the new Effect Network. Check your profile page to see your limited edition qualification.'
          // this.$router.push('/profile')
        } catch (error) {
          this.$blockchain.handleError(error)
        }
        this.loading = false
      }
    },
    async checkMigrationNeeded () {
      // Check if user has already migrated their qualifications from their old account to this account.
      // 117 Users are assigned this quali if they have migrated their account.
      this.loading = true
      const migrateQuali = 117
      const qualis = await this.$blockchain.getAssignedQualifications(this.$auth.user.vAccountRows[0].id)

      // if not present will return false.
      const bool = qualis.some(q => migrateQuali === q.id)

      // So if not present, migration is needed.
      this.migrationNeeded = !bool
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
