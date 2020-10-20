<template>
  <span>{{ $store.state.showcasesCount }}</span>
</template>

<script>
export default {
  mounted() {
    window.onNuxtReady(() => this.$store.dispatch('GET_SHOWCASES_COUNT'))
  }
}
</script>
