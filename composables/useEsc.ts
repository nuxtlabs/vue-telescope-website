export const useEsc = (handler) => {
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      handler()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', escapeHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', escapeHandler)
  })

  return {}
}
