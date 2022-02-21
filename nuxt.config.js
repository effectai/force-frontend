// eslint-disable-next-line nuxt/no-cjs-in-config
require('./config.js')

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
    '@/assets/scss/global.scss',
    'simplemde/dist/simplemde.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    ['nuxt-twa-module', {
      /* module options */
      defaultUrl: 'https://work.effectai.org',
      hostName: 'work.effectai.org',
      sha256Fingerprints: ['/* your SHA-256 keys */'],
      applicationId: 'com.effectai.force',
      launcherName: 'Effect Force',
      versionCode: 1,
      versionName: '1.0',
      statusBarColor: '#057cff',
      /* Overwrite folder where to put .wellknown */
      distFolder: '.nuxt/dist/client'
    }]
  ],
  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    injected: true,
    html: true,
    // preset: 'default',
    linkify: true,
    breaks: true
    // use: [
    //   'markdown-it-div',
    //   'markdown-it-attrs'
    // ]
  },
  auth: {
    strategies: {
      blockchain: {
        scheme: '~/schemes/blockchain'
      },
      local: {
        endpoints: {
          login: { url: `${process.env.NUXT_ENV_BACKEND_URL}/user/login`, method: 'post', propertyName: 'token' },
          user: { url: `${process.env.NUXT_ENV_BACKEND_URL}/user`, method: 'get', propertyName: '' }
        },
        user: {
          property: ''
        }
      }
    },
    watchLoggedIn: true,
    // localStorage: false,
    // cookie: false,
    fullPathRedirect: true,
    redirect: {
      login: '/login',
      logout: '/login',
      home: false
    },
    plugins: [
      { src: '~/plugins/axios.js' },
      { src: '~/plugins/blockchain.js', mode: 'client' }
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
    transpile: ['@nuxtjs/auth-next'],
    loaders: {
      scss: {
        additionalData: "@import '~assets/scss/variables.scss';"
      }
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  }
}
