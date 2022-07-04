<template>
  <div></div>
</template>

<script setup lang="ts">
const { authenticateProvider } = useStrapiAuth()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    await authenticateProvider('github', route.query.access_token)

    const redirect = useCookie('redirect')
    if (redirect.value) {
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
