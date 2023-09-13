// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
  ],
})
