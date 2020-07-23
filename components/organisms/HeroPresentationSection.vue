<template>
  <section id="hero-presentation" class="flex flex-col items-center py-12">
    <div class="max-w-readable-line-length m-auto mb-12">
      <LookupInput ref="lookup-input" class="opacity-0" />
    </div>
    <HeroPresentationSlider
      ref="hero-presentation-slider"
      :featured="featured"
      class="my-12 opacity-0"
    />
  </section>
</template>

<script>
export default {
  props: {
    featured: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    const lookupInput = this.$refs['lookup-input'].$el
    const heroPresentationSlider = this.$refs['hero-presentation-slider'].$el
    this.$gsap.fromTo(
      lookupInput,
      {
        opacity: 0,
        scale: 0.75,
        y: '15px'
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        delay: 0.8,
        ease: 'power4.inOut'
      }
    )
    this.$gsap.fromTo(
      heroPresentationSlider,
      {
        opacity: 0,
        scale: 0.75,
        y: '15px'
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        delay: 0.9,
        ease: 'power4.inOut'
      }
    )
  }
}
</script>

<style scoped>
/* #hero-presentation {
  opacity: 0;
  animation: scale 450ms theme('transitionTimingFunction.ease-out-material')
    1250ms forwards;
} */
</style>
