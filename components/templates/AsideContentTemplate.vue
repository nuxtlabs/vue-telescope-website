<template>
  <div
    id="aside-content-template"
    class="flex items-start max-w-container m-auto px-2"
  >
    <div
      id="aside-content-aside"
      ref="aside-content-aside"
      class="w-1/4 hidden md:block"
    >
      <slot name="aside-content-aside" />
    </div>

    <div class="relative md:w-3/4 w-full mb-4 mt-0 md:mt-4">
      <div id="aside-content-header">
        <slot name="aside-content-header" />
      </div>

      <div id="aside-content-main">
        <slot name="aside-content-main" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#aside-content-aside {
  position: sticky;
  top: calc(theme('spacing.16') + theme('spacing.8'));
  /* position: sticky; */
  /* top: 6rem; */
  height: calc(100vh - 6rem);
}
</style>
