<template>
  <div class="max-w-readable px-4 mx-auto pt-12">
    <h1 class="text-four leading-four font-display-weight mb-8">
      {{ title }}
    </h1>
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

useFrontMatter({
  title,
  description
})

// TODO: temp solution
if (process.client) {
  setTimeout(() => {
    window.scrollTo({ top: 0 })
  }, 0)
}
</script>
