<template>
  <div class="my-4">
    <h1 class="text-2xl font-bold">
      {{ data.domain }}
    </h1>
    <img
      class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
      :src="data.screenshot_url"
      alt=""
    />
    <div>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
