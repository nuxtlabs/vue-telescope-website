export default defineNuxtPlugin(() => {
  const listsFeature = useState('listsFeature', () => false)
  listsFeature.value = Boolean(
    window.localStorage.getItem('listsFeatureSeen') === 'true'
  )

  return {
    provide: {
      tour: {
        listsFeature
      }
    }
  }
})
