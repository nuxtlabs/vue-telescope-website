<template>
  <div ref="lavContainer" />
</template>

<script>
import lottie from 'lottie-web'

export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: 'svg',
      loop: this.options.loop !== false,
      autoplay: this.options.autoplay !== false,
      animationData: this.options.animationData
    })
  }
}
</script>
