<template>
  <div class="block md:hidden">
    <button
      class="focus:outline-none flex items-center justify-center absolute top-0 right-0 text-grey-900 hover:text-primary-500 -mt-9 mr-2"
      @click="show = true"
    >
      <FilterIcon class="h-7 w-7 overflow-visible" />
    </button>
    <DribbbleLikeModalWrapper v-if="show" @close="show = false">
      <ExploreShowcasesSearchFilters
        @update-filters="$emit('update-filters', $event)"
      />
      <!-- <p class="text-two">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nesciunt
        quod voluptate. Voluptate sunt saepe dolor, excepturi corrupti a vitae
        omnis suscipit illo, molestiae quam modi doloremque! Autem, commodi
        consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nesciunt
        quod voluptate. Voluptate sunt saepe dolor, excepturi corrupti a vitae
        omnis suscipit illo, molestiae quam modi doloremque! Autem, commodi
        consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nesciunt
        quod voluptate. Voluptate sunt saepe dolor, excepturi corrupti a vitae
        omnis suscipit illo, molestiae quam modi doloremque! Autem, commodi
        consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nesciunt
        quod voluptate. Voluptate sunt saepe dolor, excepturi corrupti a vitae
        omnis suscipit illo, molestiae quam modi doloremque! Autem, commodi
        consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nesciunt
        quod voluptate. Voluptate sunt saepe dolor, excepturi corrupti a vitae
        omnis suscipit illo, molestiae quam modi doloremque! Autem, commodi
        consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nesciunt
        quod voluptate. Voluptate sunt saepe dolor, excepturi corrupti a vitae
        omnis suscipit illo, molestiae quam modi doloremque! Autem, commodi
        consectetur.
      </p> -->
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
