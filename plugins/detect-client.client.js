export default ({ store }) => {
  const ua = window.navigator.userAgent
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua)
  const isFirefox = /Firefox/i.test(ua)
  const isChrome = /Chrome/i.test(ua)
  const isSafari = /Safari/i.test(ua)
  // console.log(ua)
  store.commit('SET_MOBILE', isMobile)
  if (isFirefox) {
    store.commit('SET_BROWSER', 'Firefox')
  } else if (isChrome) {
    store.commit('SET_BROWSER', 'Chrome')
  } else if (isSafari) {
    store.commit('SET_BROWSER', 'Safari')
  } else {
    store.commit('SET_BROWSER', ua)
  }
  window.onNuxtReady(() => {
    store.commit(
      'setIsExtensionInstalled',
      Boolean(window.$vueTelemetryExtension) ||
        Boolean(window.$vueTelescopeExtension)
    )
  })
}
