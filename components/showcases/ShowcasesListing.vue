<template>
  <div class="w-full flex flex-wrap">
    <ShowcaseCard
      v-for="(showcase, index) in showcases"
      :key="showcase.id"
      :data-index="index"
      :showcase="showcase"
      class="w-full sm:w-1/2 md:w-1/3 mb-4"
      @open-link="openLinkHandler(showcase)"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Showcase } from '~/types'

const router = useRouter()
defineProps({
  showcases: {
    type: Array as PropType<Showcase[]>,
    default: null
  }
})

function openLinkHandler (showcase: Showcase) {
  router.push(`/explore/${showcase.slug}`)
}
</script>
