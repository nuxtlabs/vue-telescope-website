export default async function ({ store, enablePreview }) {
  // Avoid fetching payload since dynamic pages are not statically generated
  if (process.client) {
    enablePreview()
  }
  // Don't call it on client, expect if SPA fallback
  if (store.state.isReady) {
    return
  }
  await store.dispatch('INIT_APP')
}
