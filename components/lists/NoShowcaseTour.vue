<template>
  <div class="h-(screen-top-position) relative flex flex-col items-center justify-center px-4">
    <h2 class="text-center text-four leading-four font-bold-body-weight mb-4">
      There's no websites saved in "{{ group.name }}"
    </h2>
    <p class="text-center text-seven leading-seven mb-48">
      Visit
      <NuxtLink
        to="/explore"
        class="text-primary-500 has-hover:hover:underline"
      >
        Explore
      </NuxtLink>
      page to save websites.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Group } from '~/types'

defineProps({
  group: {
    type: Object as PropType<Group>,
    default: () => ({})
  }
})
</script>
