<template>
  <div class="search-input-molecule relative flex">
    <span
      class="absolute top-0 left-0 h-full flex items-center pl-4 font-bold-body-weight text-grey-400"
      @click="$refs.input.$el.focus()"
    >
      https://
    </span>
    <VtInput ref="input" size="large" class="pl-18 rounded-r-none" />
    <VtButton size="large" appearance="info" class="rounded-l-none">
      Search
    </VtButton>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
