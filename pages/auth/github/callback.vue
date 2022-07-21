<template>
  <div />
</template>

<script setup lang="ts">
const { authenticateProvider } = useStrapiAuth()
const user = useStrapiUser()
const route = useRoute()
const router = useRouter()
const { setLists } = useLists()

onMounted(async () => {
  try {
    await authenticateProvider('github', route.query.access_token)

    const redirect = useCookie('redirect')
    if (redirect.value) {
      if (user.value) {
        setLists(user.value.lists)
      }
      router.push(redirect.value)
      redirect.value = null
    } else {
      router.push('/')
    }
  } catch (e) {
    router.push('/')
  }
})
</script>
