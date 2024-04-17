export default defineNuxtRouteMiddleware(async (to, from) => {
	const { hasAccessNft } = useAuth();
	const config = useRuntimeConfig();

	if (
		to.path !== "/access" &&
		!hasAccessNft.value &&
		config.public.REQUIRE_ACCESS_NFT_TEMPLATE_ID
	) {
		return navigateTo("/access");
	}
});
