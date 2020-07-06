<template>
  <div id="explore-showcases-grid" class="flex flex-wrap">
    <div v-if="!showcases || !showcases.length">
      No showcases found. Please clear the filters
    </div>
    <ExploreShowcasesCard
      v-for="showcase in showcases"
      :key="showcase.id"
      :showcase="showcase"
    />
  </div>
</template>

<script>
export default {
  props: {
    showcases: {
      type: Array,
      default: () => []
    }
  }
}
</script>
