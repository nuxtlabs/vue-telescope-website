<template>
  <LazyErrorSection :error="error" />
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
