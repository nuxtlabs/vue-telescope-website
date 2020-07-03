<template>
  <div class="search-input-molecule relative flex">
    <span
      class="absolute top-0 left-0 h-full flex items-center pl-4 font-bold-body-weight text-grey-400 text-eight"
      @click="$refs.input.$el.focus()"
    >
      https://
    </span>
    <AppInput
      ref="input"
      size="large"
      class="pl-20 rounded-r-none border-r-0"
      :value="url"
      @input="formatUrlInput"
    />
    <AppButton size="large" appearance="info" class="rounded-l-none">
      Search
    </AppButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  methods: {
    formatUrlInput(url) {
      this.url = url.includes('://') ? url.split('://')[1] : url
    }
  }
}
</script>

<style></style>
