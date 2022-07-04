<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
await useTechnologies()
</script>

<style lang="postcss">
body {
  @apply font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900 min-w-body;
}
</style>
