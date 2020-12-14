<template>
  <div class="max-w-readable-line-length px-4 mx-auto pt-12">
    <h1 class="text-four leading-four font-display-weight mb-8">
      {{ terms.title }}
    </h1>
    <NuxtContent :document="terms" class="prose" />
  </div>
</template>

<script>
import frontMatter from '@/utils/front-matter'

export default {
  data() {
    return {
      terms: {}
    }
  },
  async fetch() {
    this.terms = await this.$content('terms').fetch()
    // console.log(this.terms)
  },
  head() {
    return frontMatter({
      path: this.$route.path,
      title: 'Terms and Conditions'
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
