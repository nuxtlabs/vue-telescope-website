<template>
  <span>{{ $store.state.showcasesCount }}</span>
</template>

<script>
export default {
  mounted() {
    window.onNuxtReady(async () => {
      await this.$store.dispatch('GET_SHOWCASES_COUNT')
      this.$forceUpdate()
    })
  }
}
</script>
