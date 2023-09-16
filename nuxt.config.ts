// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    // '@nuxt/image',
  ],
  vite: {
    server: {
      watch: {
        useFsEvents: true,
        usePolling: true,
        interval: 1000
      }
    }
  },
  // image: {
  //   dir: 'public/'
  // },
})
