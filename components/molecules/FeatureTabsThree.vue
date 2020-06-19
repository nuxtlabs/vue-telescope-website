<template>
  <div class="w-full h-24 bg-yellow-500">
    <h1 ref="heading" class="font-display-weight text-three text-center">
      Three
    </h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$gsap.from(this.$refs.heading, {
      scale: 2,
      opacity: 0
    })
  },
  methods: {
    leave() {
      return new Promise((resolve, reject) => {
        this.$gsap.to(this.$refs.heading, {
          scale: 0,
          duration: 0.5,
          onComplete: () => {
            console.log('LEAVE')
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style></style>
