<template>
  <NuxtLink
    to="/changelog"
    class="relative"
    :class="[!$changelog.hasSeen.value && 'text-primary-500']"
  >
    <slot />
    <!-- Duplicate slot for blurry animation -->
    <div
      v-if="!$changelog.hasSeen.value"
      class="absolute top-0 left-0 animate-notification pointer-events-none"
    >
      <slot />
    </div>
  </NuxtLink>
</template>

<style scoped>
.animate-notification {
  animation: ping 5s cubic-bezier(0, 0, 0.2, 1) infinite 2s;
}

@keyframes ping {
  0% {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  75%,
  100% {
    transform: scale(1.35);
    filter: blur(10px);
    opacity: 0;
  }
}
</style>
