<template>
  <div class="el relative flex flex-col items-center justify-center px-4">
    <h2 class="text-center text-four leading-four font-bold-body-weight mb-4">
      There's no websites saved in "{{ list.name }}"
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
import type { List } from '~/types'

defineProps({
  list: {
    type: Object as PropType<List>,
    default: null
  }
})
</script>

<style lang="postcss" scoped>
.el {
  height: calc(100vh - calc(theme('spacing.16') + theme('spacing.8')));
}
</style>
