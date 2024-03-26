const { isLoggedIn } = useEffectClient();

export default defineNuxtRouteMiddleware((to, from) => {
  // If the user is not logged in, redirect to home page
  if (!isLoggedIn.value) {
    return navigateTo("/");
  }
});
