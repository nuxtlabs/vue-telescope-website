import { onMounted } from '#imports'

export const useEsc = (action) => {
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      action()
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
