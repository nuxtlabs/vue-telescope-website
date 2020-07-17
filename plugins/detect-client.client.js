export default ({ store }) => {
  const ua = window.navigator.userAgent
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua)
  const isFirefox = /Firefox/i.test(ua)
  const isChrome = /Chrome/i.test(ua)
  // console.log(ua)
  store.commit('SET_MOBILE', isMobile)
  if (isFirefox) {
    store.commit('SET_BROWSER', 'Firefox')
  } else if (isChrome) {
    store.commit('SET_BROWSER', 'Chrome')
  } else {
    store.commit('SET_BROWSER', 'Other')
  }
}
