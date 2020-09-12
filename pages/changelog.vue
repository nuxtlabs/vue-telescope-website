<template>
  <div class="max-w-container-max-width px-4 mx-auto pt-12">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/4"></div>
      <h1
        class="w-full md:w-3/4 text-center md:text-left text-four leading-four font-display-weight mb-8"
      >
        {{ changelog.title }}
      </h1>
    </div>
    <NuxtContent :document="changelog" class="prose" />
  </div>
</template>

<script>
import frontMatter from '@/utils/front-matter'

export default {
  async asyncData({ $content }) {
    const changelog = await $content('changelog').fetch()

    return { changelog }
  },
  mounted() {
    this.$changelog.saw()
  },
  head() {
    return frontMatter({
      path: this.$route.path,
      title: 'Changelog',
      description: 'Discover the lastest news from Vue Telemetry.'
    })
  }
}
</script>

<style lang="postcss" scoped>
::v-deep .prose {
  & a {
    @apply text-primary-500;
    &:hover {
      @apply underline;
    }
  }
  & h1 {
    @apply text-four leading-four mb-4 mt-8 font-display-weight;
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
