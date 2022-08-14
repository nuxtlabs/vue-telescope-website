<template>
  <button
    aria-label="Profile button"
    class="relative rounded-full overflow-hidden focus:outline-none"
  >
    <ClientOnly>
      <teleport to="body">
        <UserButtonTour v-if="showTour" @close="showTour = false" />
      </teleport>
    </ClientOnly>

    <ClientOnly>
      <img
        v-if="user"
        :src="`https://github.com/${user.username}.png?size=64`"
        class="absolute top-0 left-0 w-8 h-8 mr-1 rounded-full"
      >
    </ClientOnly>

    <svg
      class="w-8 h-8"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="#F5F7F6" />
      <rect x="2" y="11" width="2" height="6" fill="#0BDCA0" />
      <rect x="4" y="9" width="2" height="4" fill="#0BDCA0" />
      <rect x="6" y="9" width="2" height="8" fill="#0BDCA0" />
      <rect x="16" y="9" width="2" height="8" fill="#0BDCA0" />
      <rect x="12" y="9" width="2" height="6" fill="#0BDCA0" />
      <rect x="10" y="9" width="2" height="6" fill="#0BDCA0" />
      <rect
        width="2"
        height="4"
        transform="matrix(1 0 0 -1 8 15)"
        fill="#0BDCA0"
      />
      <rect
        width="3"
        height="2"
        transform="matrix(1 0 0 -1 8 19)"
        fill="#0BDCA0"
      />
      <rect
        width="3"
        height="2"
        transform="matrix(1 0 0 -1 13 19)"
        fill="#0BDCA0"
      />
      <rect
        width="2"
        height="4"
        transform="matrix(1 0 0 -1 14 15)"
        fill="#0BDCA0"
      />
      <rect x="6" y="7" width="12" height="2" fill="#0BDCA0" />
      <rect x="8" y="5" width="2" height="2" fill="#0BDCA0" />
      <rect x="14" y="5" width="2" height="2" fill="#0BDCA0" />
      <rect x="16" y="3" width="2" height="2" fill="#0BDCA0" />
      <rect x="6" y="3" width="2" height="2" fill="#0BDCA0" />
      <rect x="18" y="9" width="2" height="4" fill="#0BDCA0" />
      <rect x="20" y="11" width="2" height="6" fill="#0BDCA0" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { User } from '~/types'

const user = useStrapiUser() as Ref<User>

const { $tour } = useNuxtApp()

const showTour = ref(false)

onMounted(() => {
  setTimeout(() => {
    showTour.value = !user.value && !$tour.listsFeature.value
  }, 3000)
})

</script>
