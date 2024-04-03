const { betaKey } = useBetaKeys();

export default defineNuxtRouteMiddleware((to, from) => {
  //if the user has a beta key
  //if not on the key page and the user does not have a beta key
  if (to.path !== "/access" && !betaKey.value) {
    return navigateTo("/access");
  }
});
