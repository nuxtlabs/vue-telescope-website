<template>
  <AppButton
    ref="load-more-button"
    class="w-auto sm:w-1/3 flex items-center justify-center"
    @click.native="lazyLoadShowcases"
  >
    <div
      :class="[!pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0']"
      class="transition duration-200 transform ease-in-out"
    >
      Load More
    </div>
    <div
      :class="[pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0']"
      class="absolute transition duration-200 transform ease-in-out"
    >
      <AppLoader
        class="w-6 h-6"
        background="text-grey-100"
        path="text-grey-400"
      />
    </div>
  </AppButton>
</template>

<script>
export default {
  props: {
    pending: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    lazyLoadShowcases(isVisible) {
      // method made initialy for intersection observer (thats why isVisible present)
      if (isVisible) {
        this.$refs['load-more-button'].$el.blur()
        this.$emit('update') // this.currentPage++
      }
    }
  }
}
</script>

<style></style>
