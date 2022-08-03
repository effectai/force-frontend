export default ({ $axios, $auth, app }) => {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if ([401, 403].includes(code) && error.response.data.message.includes('jwt expired')) {
      console.log('refresh token')
      app.$utils.logout()
    }

    return Promise.reject(error)
  })
}
