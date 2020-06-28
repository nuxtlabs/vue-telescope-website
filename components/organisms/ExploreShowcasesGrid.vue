<template>
  <div class="flex flex-wrap">
    <div v-for="showcase in showcases" :key="showcase.id" class="w-1/3 p-2">
      <div
        class="bg-grey-200 rounded-lg cursor-pointer"
        @click="
          $router.push({
            name: 'explore-website',
            params: { website: showcase.slug }
          })
        "
      >
        <div class="rounded-lg overflow-hidden">
          <img :src="showcase.screenshotUrl" alt="" />
        </div>
        <div class="p-4">
          <NuxtLink
            class="font-display-weight text-eight leading-eight"
            :to="{
              name: 'explore-website',
              params: { website: showcase.slug }
            }"
          >
            {{ showcase.title }}
          </NuxtLink>
        </div>
      </div>
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
