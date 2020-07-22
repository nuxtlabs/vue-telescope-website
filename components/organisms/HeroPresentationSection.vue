<template>
  <section id="hero-presentation" class="flex flex-col items-center py-12">
    <div class="max-w-readable-line-length m-auto mb-12">
      <LookupInput class="" />
    </div>
    <HeroPresentationSlider :featured="featured" class="my-12" />
  </section>
</template>

<script>
export default {
  props: {
    featured: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
#hero-presentation {
  opacity: 0;
  animation: scale 450ms theme('transitionTimingFunction.ease-out-material')
    1250ms forwards;
}
</style>
