<template>
  <div class="max-w-container px-4 mx-auto pt-12">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/4" />
      <h1
        class="w-full md:w-3/4 text-center md:text-left text-four leading-four font-display-weight mb-8"
      >
        {{ title }}
      </h1>
    </div>
    <div class="prose">
      <ContentDoc />
    </div>
  </div>
</template>

<script setup lang="ts">
const { name } = useRoute()
const {
  data: {
    value: { title, description }
  }
} = await useAsyncData(name as string, () => {
  return queryContent(name as string).only(['title', 'description']).findOne()
})

const { $changelog } = useNuxtApp()

useFrontMatter({
  title,
  description
})

onMounted(() => {
  $changelog.saw()
})

// TODO: temp solution
if (process.client) {
  setTimeout(() => {
    window.scrollTo({ top: 0 })
  }, 0)
}
</script>
