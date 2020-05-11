export default function ({ route, redirect }) {
  if (process.server) {
    if (route.query.preview && route.query.preview !== '') {
      redirect(`/explore?preview=${route.query.preview}`)
    }
  }
}
