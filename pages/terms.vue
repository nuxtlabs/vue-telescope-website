<template>
  <div class="max-w-readable px-4 mx-auto pt-12">
    <h1 class="text-four leading-four font-display-weight mb-8">
      Title
      <!-- TODO -->
      <!-- {{ terms.title }} -->
    </h1>
    <Content class="prose" />
  </div>
</template>

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
}
</style>
