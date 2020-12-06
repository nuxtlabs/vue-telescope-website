<template>
  <div class="block md:hidden">
    <button
      class="focus:outline-none flex items-center justify-center absolute top-0 right-0 text-grey-900 hover:text-primary-500 -mt-9 mr-2"
      @click="show = true"
    >
      <FilterIcon class="h-7 w-7 overflow-visible" />
    </button>
    <DribbbleLikeModalWrapper v-if="show" @close="show = false">
      <ShowcasesSearchFilters />
    </DribbbleLikeModalWrapper>
  </div>
</template>

<script>
import FilterIcon from '@/assets/icons/filter.svg?inline'

export default {
  components: {
    FilterIcon
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style></style>
