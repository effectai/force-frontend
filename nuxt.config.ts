// https://nuxt.com/docs/api/configuration/nuxt-config
import stylelint from "vite-plugin-stylelint";

export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ["@vueuse/nuxt"],
  vite: {
    plugins: [
      stylelint({
        fix: true,
        include: [`./**/*.{css,scss,sass,vue}`],
      }),
    ],
  },
  css: ["@/assets/css/global.css"],
});
