<template>
  <div class="flex flex-wrap">
    <div v-for="showcase in showcases" :key="showcase.id" class="w-1/4">
      <img :src="showcase.screenshotUrl" alt="" />
      <NuxtLink
        :to="{ name: 'explore-website', params: { website: showcase.slug } }"
      >
        {{ showcase.title }}
      </NuxtLink>
    </div>
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

<style></style>
