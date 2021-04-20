<template>
  <div>
    <h3 class="title">
      Logging in..
    </h3>
  </div>
</template>

<script>

export default {
  created () {
    if (process.client) {
      this.login()
    }
  },
  methods: {
    async login () {
      if (!this.$route.query.ssoToken) {
        const redirect = window.location.origin + '/callback'
        window.location = `${process.env.NUXT_ENV_AUTH_SERVER}?redirect=${encodeURIComponent(redirect)}`
      } else {
        try {
          const ssoToken = this.$route.query.ssoToken
          delete this.$route.query.ssoToken
          this.$router.push({ query: { ssoToken: null } })
          await this.$auth.loginWith('local', { data: { ssoToken } })
        } catch (err) {
          console.error(err)
          alert('Could not login')
          this.$router.push('/')
        }
      }
    }
  }
}
</script>
