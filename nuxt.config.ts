// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 500
      }
    }
  },
  image: {
    dir: 'public/'
  },
})
