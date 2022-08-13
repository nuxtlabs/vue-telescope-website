<template>
  <div class="overflow-hidden">
    <HeroPropositionSection
      class="px-4 mx-auto mt-24 md:mt-32 max-w-readable"
    />
    <HeroPresentationSlider class="my-24" />
    <FeaturesSection class="px-4 m-auto max-w-container" />
    <BenefitsSection class="px-4 m-auto max-w-container" />
    <CtaSection />
  </div>
</template>

<script setup lang="ts">
await fetchShowcasesCount()

useFrontMatter()

// TODO: temp solution
if (process.client) {
  setTimeout(() => {
    window.scrollTo({ top: 0 })
  }, 0)
}
</script>
