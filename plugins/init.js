export default async function ({ store, enablePreview }) {
  // Don't call it on client, expect if SPA fallback
  if (store.state.isReady) {
    return
  }
  await store.dispatch('INIT_APP')
}
