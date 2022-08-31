<template>
  <div />
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { StrapiAuthProvider } from '@nuxtjs/strapi/dist/runtime/types'
import type { User } from '~/types'

const { authenticateProvider } = useStrapiAuth()
const user = useStrapiUser() as Ref<User>
const route = useRoute()
const router = useRouter()
const { setLists } = useLists()

onMounted(async () => {
  try {
    await authenticateProvider('github' as StrapiAuthProvider, route.query.access_token as string)

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
