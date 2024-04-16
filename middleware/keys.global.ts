export default defineNuxtRouteMiddleware((to, from) => {
  const accessKey = useLocalStorage("accessKey", null);
  const config = useRuntimeConfig();
  if (to.path !== "/access" && !accessKey.value && config.public.REQUIRE_ACCESS_KEY ) {
    return navigateTo("/access");
  }
});
