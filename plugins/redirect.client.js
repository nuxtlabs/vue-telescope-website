export default function ({ route, query, redirect }) {
  const path = route.path.replace(/\/+$/, '') // remove trailing slash

  if (path === '/submit' && query.preview) {
    window.location.replace(`/explore?preview=${query.preview}`)
  }
}
