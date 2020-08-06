<template>
  <div class="max-w-readable-line-length px-4 mx-auto">
    <h1 class="text-four leading-four font-display-weight mb-8">
      {{ terms.title }}
    </h1>
    <NuxtContent :document="terms" class="prose" />
  </div>
</template>

<script>
export default {
  async fetch() {
    this.terms = await this.$content('terms').fetch()
    // console.log(this.terms)
  },
  data() {
    return {
      terms: null
    }
  }
}
</script>

<style lang="postcss" scoped>
::v-deep .prose {
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
