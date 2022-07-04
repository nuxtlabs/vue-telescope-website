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
  } catch (e) {}

  router.push('/')
})
</script>
