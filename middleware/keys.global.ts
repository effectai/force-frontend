export default defineNuxtRouteMiddleware(async (to, from) => {
	const { hasAccessNft } = useAuth();
	const config = useRuntimeConfig();

	if (
		to.path !== "/access" &&
		!hasAccessNft.value &&
		config.public.EARLY_ALPHA_ACCESS_TEMPLATE_ID
	) {
		// console.log("User does not have access, redirecting to access page");
		return navigateTo("/access");
	}
});
