<template>
  <div class="w-full flex flex-wrap">
    <ShowcaseCard
      v-for="(showcase, index) in showcases"
      :key="showcase.id"
      :data-index="index"
      :showcase="showcase"
      class="w-full sm:w-1/2 md:w-1/3 mb-4"
    />
  </div>
</template>

<script>
export default {
  props: {
    showcases: {
      type: Array,
      default: null
    }
  }
}
</script>

<style></style>
