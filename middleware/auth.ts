const { userLoggedIn } = useEffectClient()

export default defineNuxtRouteMiddleware((to, from) => {
    // If the user is not logged in, redirect to home page
    if (!userLoggedIn) {
      return navigateTo('/')
    }
})
