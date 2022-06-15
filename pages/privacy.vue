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

<script setup>
const { name } = useRoute()
const {
  data: {
    value: { title }
  }
} = await useAsyncData(name, () => {
  return queryContent(name).only(['title']).findOne()
})
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
}
</style>
