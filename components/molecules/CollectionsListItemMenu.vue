<template>
  <div class="p-2 flex flex-col items-start">
    <button>share</button>
    <button @click="$emit('rename')">rename</button>
    <button @click="$emit('delete')">delete</button>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
