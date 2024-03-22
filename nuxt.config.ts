// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },
    modules: ["@vueuse/nuxt", "@nuxt/ui"],
    css: ["@/assets/scss/global.scss"],
});
