<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <PrivacyAwareModal v-if="privacyAwarenessCb" />
  </div>
</template>

<script setup lang="ts">
await useTechnologies()
const { privacyAwarenessCb } = usePrivacyAwareness()
const user = useStrapiUser()

const { setLists } = useLists()

setLists(user.value.lists)
</script>

<style lang="postcss">
body {
  @apply font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900 min-w-body;
}
</style>
