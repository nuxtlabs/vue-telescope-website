<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <PrivacyAwareModal v-if="privacyAwarenessCb" />
  </div>
</template>

<script setup lang="ts">
const { privacyAwarenessCb } = usePrivacyAwareness()
</script>

<style lang="postcss">
body {
  @apply font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900 min-w-body;
}
</style>
