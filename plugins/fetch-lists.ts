export default defineNuxtPlugin((nuxtApp) => {
  const user = useStrapiUser()
  if (user.value) {
    const { setLists } = useLists()
    setLists(user.value.lists)
  }
})
