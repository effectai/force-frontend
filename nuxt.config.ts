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
			REQUIRE_ACCESS_NFT_TEMPLATE_ID:
				Number.parseInt(
					process.env.REQUIRE_ACCESS_NFT_TEMPLATE_ID ?? "false",
				) || 0,
			CAMPAIGN_CACHE_DURATION:
				Number.parseInt(process.env.CAMPAIGN_CACHE_DURATION ?? "0") || 600_000,
			BACKEND_URL: process.env.BACKEND_URL ?? "http://localhost:8888",
			ALTERNATIVE_FRONTEND_URL:
				process.env.ALTERNATIVE_FRONTEND_URL ?? "http://localhost:3000",
			BASE_EXPLORER_URL:
				process.env.BASE_EXPLORER_URL ?? "https://jungle4.eosq.eosnation.io",
		},
	},
	build: {
		analyze: {},
	},
	modules: ["@vueuse/nuxt", "@nuxt/content"],
	vite: {
		plugins: [
			visualizer({
				emitFile: true,
				filename: "stats.html",
			}),
			stylelint({
				fix: true,
				include: ["./**/*.{css,scss,sass,vue}"],
			}),
		],
	},
	css: ["@/assets/css/global.css"],
});
