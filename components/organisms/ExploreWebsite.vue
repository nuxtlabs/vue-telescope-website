<template>
  <div v-if="website">
    <div class="overflow-hidden rounded-lg mb-8">
      <img :src="website.screenshotUrl" alt="" />
    </div>
    <h1 class="text-six leading-six font-display-weight">
      {{ website.title }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    website: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style></style>
