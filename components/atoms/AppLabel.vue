<template>
  <label :for="id">{{ text }}</label>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'Default label text'
    }
  }
}
</script>

<style></style>
