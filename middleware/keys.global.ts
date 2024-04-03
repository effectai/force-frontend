export default defineNuxtRouteMiddleware((to, from) => {
  const accessKey = useLocalStorage("accessKey", null);

  //if the user has a beta key
  //if not on the key page and the user does not have a beta key
  if (to.path !== "/access" && !accessKey.value) {
    return navigateTo("/access");
  }
});
