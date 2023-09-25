const { userLoggedIn } = useEffectClient()

export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated() is an example method verifying if a user is authenticated
    console.debug('auth middleware', userLoggedIn, to, from)
    if (userLoggedIn) {
      return navigateTo('/')
    }
})
