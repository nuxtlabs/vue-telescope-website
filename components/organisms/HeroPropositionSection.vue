<template>
  <section id="hero-proposition" class="flex flex-col items-center">
    <h1
      ref="heading"
      class="inline-flex flex-col items-center text-center text-two leading-two md:text-one md:leading-one font-bold-body-weight -tracking-4 mb-12"
    >
      <div class="opacity-0">Discover websites</div>
      <div class="opacity-0">made with</div>
      <div class="opacity-0 w-full -z-1">
        <HeroPropositionBrandsRotator />
      </div>
    </h1>

    <p
      ref="subheading"
      class="opacity-0 text-center text-eight leading-eight md:text-seven md:leading-seven text-grey-700 mb-12 max-w-2xl"
    >
      Reveal the Vue plugins and technology stack powering any website or
      explore our database of <ShowcasesCount /> websites.
    </p>
    <InstallExtensionButton
      ref="install-extension-button"
      size="large"
      class="opacity-0 mb-8"
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
        scale: 0.75
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.45,
        ease: 'power4.inOut'
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
        scale: 0.75
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.45,
        delay: 0.5,
        ease: 'power4.inOut'
      }
    )

    const installExtensionButton = this.$refs['install-extension-button'].$el
    this.$gsap.fromTo(
      installExtensionButton,
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
        delay: 0.75,
        ease: 'power4.inOut'
      }
    )
  }
}
</script>
