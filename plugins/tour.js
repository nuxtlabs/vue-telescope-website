export default function ({ store }, inject) {
  const $tour = {}
  inject('tour', $tour)
  if (process.browser) {
    $tour['collections-feature'] = Boolean(
      window.localStorage.getItem('collections-feature-seen')
    )
  }
}
