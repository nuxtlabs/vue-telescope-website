<template>
  <span class="">{{ animatedNumber }}</span>
</template>

<script>
export default {
  props: {
    to: {
      type: Number,
      default: 0
    },
    from: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tweenedCount: 0
    }
  },
  computed: {
    animatedNumber() {
      return this.tweenedCount.toFixed(0)
    }
  },
  watch: {
    to: {
      immediate: true,
      handler(newValue) {
        if (process.client) {
          this.$gsap.to(this.$data, { duration: 0.5, tweenedCount: newValue })
        }
      }
    }
  }
}
</script>
