<template>
  <div class="px-4 pt-12 mx-auto max-w-container">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/4" />
      <h1
        class="w-full mb-8 text-center md:w-3/4 md:text-left text-four leading-four font-display-weight"
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
