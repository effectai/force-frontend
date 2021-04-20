export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  generate: {
    fallback: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Effect Force',
    title: 'Effect Force',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],

  auth: {
    strategies: {
      local: {
        _scheme: '~/schemes/authScheme',
        endpoints: {
          login: { url: `${process.env.NUXT_ENV_AUTH_SERVER}/verify`, method: 'post', propertyName: 'token' },
          logout: { url: `${process.env.NUXT_ENV_AUTH_SERVER}/logout`, method: 'get', withCredentials: true },
          user: { url: `${process.env.NUXT_ENV_AUTH_SERVER}/user`, method: 'get', propertyName: false }
        }
      }
    },
    fullPathRedirect: true,
    redirect: {
      login: `${process.env.NUXT_ENV_AUTH_SERVER}?redirect=${encodeURIComponent(process.env.NUXT_ENV_FRONTEND_URL)}/callback`,
      logout: '/',
      callback: '/callback',
      home: '/user'
    },
    plugins: [
      { src: '~/plugins/axios.js' }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@nuxtjs/auth'],
    loaders: {
      scss: {
        additionalData: "@import '~assets/scss/variables.scss';"
      }
    }
  }
}
