<template>
  <svg class="loading-spinner" viewBox="0 0 50 50">
    <circle
      class="spinner-background"
      cx="25"
      cy="25"
      r="22.5"
      fill="none"
      stroke-width="5"
      :class="[background]"
    />
    <circle
      class="spinner-path"
      cx="25"
      cy="25"
      r="22.5"
      fill="none"
      stroke-width="5"
      :class="[path]"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  background: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.loading-spinner {
  animation: private-spin 2s infinite linear;
}

@keyframes private-spin {
  100% {
    transform: rotate(1turn);
  }
}

.spinner-background {
  stroke: currentColor;
  /* opacity: 0.5; */
}

.spinner-path {
  stroke: currentColor;
}

.spinner-path {
  animation: private-dash 2s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes private-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -50;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -140;
  }
}
</style>
