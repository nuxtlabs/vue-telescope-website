<template>
  <div class="max-w-readable px-4 mx-auto pt-12">
    <h1 class="text-four leading-four font-display-weight mb-8">
      {{ privacy.title }}
    </h1>
    <NuxtContent :document="privacy" class="prose" />
  </div>
</template>

<script>
import frontMatter from '@/utils/front-matter'

export default {
  data() {
    return {
      privacy: {}
    }
  },
  async fetch() {
    this.privacy = await this.$content('privacy').fetch()
  },
  head() {
    return frontMatter({
      path: this.$route.path,
      title: 'Privacy Policy'
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
