<template>
  <section id="hero-proposition" class="flex flex-col items-center">
    <h1
      ref="headingRef"
      class="inline-flex flex-col items-center text-center text-two leading-two md:text-one md:leading-one font-bold-body-weight -tracking-4 mb-12"
    >
      <div class="opacity-0">
        Discover websites
      </div>
      <div class="opacity-0">
        made with
      </div>
      <div class="opacity-0 w-full -z-1">
        <HeroPropositionBrandsRotator />
      </div>
    </h1>

    <div ref="lookupInputRef" class="opacity-0 max-w-readable m-auto mb-12">
      <LookupInput />
    </div>

    <p
      ref="subheadingRef"
      class="opacity-0 text-center text-eight leading-eight md:text-seven md:leading-seven text-grey-700 mb-12 max-w-2xl"
    >
      Reveal the Vue plugins and technology stack powering any website or
      explore our database of {{ showcasesCount }} websites.
    </p>
    <InstallExtensionButton
      ref="installExtensionButtonRef"
      size="large"
      class="opacity-0 mb-8"
    />
  </section>
</template>

<script setup lang="ts">
const headingRef = ref(null)
const lookupInputRef = ref(null)
const subheadingRef = ref(null)
const installExtensionButtonRef = ref(null)

const { $gsap, $SplitText } = useNuxtApp()
const { showcasesCount } = useShowcasesCount()

onMounted(() => {
  $gsap.fromTo(
    headingRef.value?.children,
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

  $gsap.fromTo(
    lookupInputRef.value,
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
      delay: 0.5,
      ease: 'power4.inOut',
      clearProps: true,
      onComplete () {
        lookupInputRef.value.classList.remove('opacity-0')
      }
    }
  )

  const splitted = new $SplitText(subheadingRef.value, {
    type: 'lines'
  })
  $gsap.set(subheadingRef.value, {
    opacity: 1
  })
  $gsap.fromTo(
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
      delay: 0.6,
      ease: 'power4.inOut',
      onComplete: () => {
        splitted.revert()
      }
    }
  )

  $gsap.fromTo(
    installExtensionButtonRef.value.$el,
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
      delay: 0.6,
      ease: 'power4.inOut'
    }
  )
})
</script>
