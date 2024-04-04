// https://nuxt.com/docs/api/configuration/nuxt-config
import stylelint from "vite-plugin-stylelint";
import { visualizer } from "rollup-plugin-visualizer";

export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    public: {
      BASE_EXPLORER_URL:
        process.env.BASE_EXPLORER_URL ?? "https://jungle4.eosq.eosnation.io/",
    },
  },
  build: {
    analyze: {},
  },
  modules: ["@vueuse/nuxt"],
  vite: {
    plugins: [
      visualizer({
        emitFile: true,
        filename: "stats.html",
      }),
      stylelint({
        fix: true,
        include: [`./**/*.{css,scss,sass,vue}`],
      }),
    ],
  },
  css: ["@/assets/css/global.css"],
});
