<template>
  <section id="hero-proposition" class="flex flex-col items-center">
    <h1
      ref="heading"
      class="inline-flex flex-col items-center text-center text-two leading-two md:text-one md:leading-one font-bold-body-weight -tracking-4 mb-12"
    >
      <div class="opacity-0">Discover</div>
      <div class="opacity-0">websites made with</div>
      <div class="opacity-0 w-full -z-1"><HeroPropositionBrandsRotator /></div>
    </h1>

    <p
      ref="subheading"
      class="opacity-0 text-center text-seven leading-seven text-grey-700 mb-12 max-w-2xl"
    >
      Reveal the Vue plugins and technology stack powering any website with Vue
      Telemetry or explore our database of 4526 websites.
    </p>
    <InstallExtensionButton
      size="large"
      class="install-extension-button mb-8"
    />
  </section>
</template>

<script>
export default {
  mounted() {
    this.$gsap.fromTo(
      this.$refs.heading.children,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.3
      }
    )
    const splitted = new this.$SplitText(this.$refs.subheading, {
      type: 'lines'
    })
    this.$gsap.set(this.$refs.subheading, {
      opacity: 1
    })
    this.$gsap.fromTo(
      splitted.lines,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.3,
        delay: 0.5
      }
    )
  }
}
</script>

<style scoped>
.install-extension-button {
  opacity: 0;
  animation: scale 450ms theme('transitionTimingFunction.ease-out-material')
    1000ms forwards;
}
</style>
