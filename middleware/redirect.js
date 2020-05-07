export default function ({ route, redirect }) {
  if (process.server) {
    if (route.query.preview && route.query.preview !== '') {
      redirect(`/showcases?preview=${route.query.preview}`)
    }
  }
}
