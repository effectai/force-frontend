const { isLoggedIn } = useEffectClient();

export default defineNuxtRouteMiddleware((to, from) => {
	const accessKey = useLocalStorage("hasAccessNft", false);

	// If the user is not logged in, redirect to home page
	if (!isLoggedIn.value && accessKey.value) {
		return navigateTo("/");
	}
});
