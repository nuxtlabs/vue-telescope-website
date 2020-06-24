<template>
  <section id="hero-presentation" class="flex flex-col items-center">
    <div class="max-w-readable-line-length m-auto mb-12">
      <SearchInput class="" />
    </div>
    <HeroPresentationSlider :featured="featured" />
  </section>
</template>

<script>
export default {
  props: {
    featured: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
