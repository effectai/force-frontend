export default ({ $axios, $auth, app }) => {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if ([401, 403].includes(code) && error.response.data.message.includes('jwt expired')) {
      console.log('refresh token')
      $auth.$storage.setUniversal('redirect', app.router.currentRoute.fullPath)
      window.location = `${process.env.NUXT_ENV_AUTH_SERVER}?redirect=${process.env.NUXT_ENV_FRONTEND_URL}/callback`
    }

    return Promise.reject(error)
  })
}
