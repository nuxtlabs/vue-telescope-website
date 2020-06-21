<template>
  <div class="search-input-molecule relative flex">
    <span
      class="absolute top-0 left-0 h-full flex items-center pl-4 font-bold-body-weight text-grey-400 text-eight"
      @click="$refs.input.$el.focus()"
    >
      https://
    </span>
    <AppInput ref="input" size="large" class="pl-20 rounded-r-none" />
    <AppButton size="large" appearance="info" class="rounded-l-none">
      Search
    </AppButton>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
