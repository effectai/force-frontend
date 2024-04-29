export default defineNuxtRouteMiddleware(async (to, from) => {
	const { hasAccessNft } = useAuth();
	const config = useRuntimeConfig();

	console.log(hasAccessNft.value);

	if (
		to.path !== "/access" &&
		!hasAccessNft.value &&
		config.public.EARLY_ALPHA_ACCESS_TEMPLATE_ID
	) {
		return navigateTo("/access");
	}
});
