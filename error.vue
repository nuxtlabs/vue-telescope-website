<template>
  <div>
    <NuxtLayout>
      <LazyErrorPage :error="error" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>
