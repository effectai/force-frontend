const { isLoggedIn } = useEffectClient();

export default defineNuxtRouteMiddleware((to, from) => {
    console.log(isLoggedIn.value);
    // If the user is not logged in, redirect to home page
    if (!isLoggedIn.value) {
        return navigateTo("/login");
    }
});
