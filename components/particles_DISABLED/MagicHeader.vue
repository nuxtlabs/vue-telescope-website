<template>
  <div
    ref="magic-header"
    class="absolute top-0 left-0 overflow-hidden w-full h-full px-4"
    :class="[`bg-${appearance}`]"
    :style="{
      zIndex: index
    }"
  >
    <div ref="inner" class="w-full h-full flex items-center">
      <MagicLogo class="h-14" :appearance="appearance" />
      <button>Add to Chrome</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appearance: {
      type: String,
      default: 'white'
    },
    trigger: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    const header = this.$refs['magic-header']
    const inner = this.$refs.inner

    this.$gsap.fromTo(
      header,
      {
        y: '100%'
      },
      {
        scrollTrigger: {
          trigger: this.trigger,
          start: 'top 64px',
          end: 'top top',
          scrub: true,
          markers: true
        },
        y: '0%',
        ease: 'none'
      }
    )
    this.$gsap.fromTo(
      header,
      {
        y: '0%'
      },
      {
        scrollTrigger: {
          trigger: this.trigger,
          start: 'bottom 64px',
          // end: 'top top',
          scrub: true,
          markers: true
        },
        y: '-100%',
        ease: 'none'
      }
    )

    this.$gsap.fromTo(
      inner,
      {
        y: '-100%'
      },
      {
        scrollTrigger: {
          trigger: this.trigger,
          start: 'top 64px',
          end: 'top top',
          scrub: true,
          markers: true
        },
        y: '0%',
        ease: 'none'
      }
    )
    this.$gsap.fromTo(
      inner,
      {
        y: '0%'
      },
      {
        scrollTrigger: {
          trigger: this.trigger,
          start: 'bottom 64px',
          scrub: true,
          markers: true
        },
        y: '100%',
        ease: 'none'
      }
    )
  }
}
</script>

<style></style>
