<template>
  <div class="block md:hidden">
    <button
      class="focus:outline-none flex items-center justify-center absolute top-0 right-0 text-grey-900 has-hover:hover:text-primary-500 mt-3 mr-2"
      @click="show = true"
    >
      <FilterIcon class="h-7 w-7 overflow-visible" />
    </button>
    <MobileSlideModal v-if="show" label="Select filters:" @close="show = false">
      <ShowcasesSearchFilters @searching="show = false" />
    </MobileSlideModal>
  </div>
</template>

<script setup lang="ts">
import FilterIcon from '@/assets/icons/filter.svg'

const show = ref(false)
</script>
