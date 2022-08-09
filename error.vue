<template>
  <div>
    <NuxtLayout>
      <ErrorPage :error="error" />
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
