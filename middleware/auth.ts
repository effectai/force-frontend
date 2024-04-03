const { isLoggedIn } = useEffectClient();
const { hasBetaKey } = useBetaKeys();

export default defineNuxtRouteMiddleware((to, from) => {
  // If the user is not logged in, redirect to home page
  if (!isLoggedIn.value && hasBetaKey.value) {
    console.log("nvigating to /home");

    return navigateTo("/");
  }
});
