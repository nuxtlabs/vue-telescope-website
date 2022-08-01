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
} = await useAsyncData(name, () => {
  return queryContent(name).only(['title', 'description']).findOne()
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

<style lang="postcss" scoped>
::v-deep(.prose) {
  & a {
    @apply text-primary-500;
    &:hover {
      @apply underline;
    }
  }
  & h2 {
    @apply text-five leading-five mb-4 mt-8 font-display-weight;
    a {
      @apply text-grey-900 pointer-events-none;
    }
  }
  & p {
    @apply mb-4;
  }
  & ul {
    @apply list-disc list-inside mb-4;

    & > li {
      @apply mb-2;
    }
  }
  & img {
    @apply mb-4;
  }
}
</style>
