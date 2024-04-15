export default defineNuxtRouteMiddleware((to, from) => {
  const accessKey = useLocalStorage("accessKey", null);

  //if the user has a beta key
  //if not on the key page and the user does not have a beta key

// check if dev mode


  if (to.path !== "/access" && !accessKey.value && process.env.NODE_ENV !== "development") {
    return navigateTo("/access");
  }
});
