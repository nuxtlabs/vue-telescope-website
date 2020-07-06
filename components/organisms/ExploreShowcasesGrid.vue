<template>
  <div id="explore-showcases-grid" class="flex flex-wrap">
    <div v-if="!showcases || !showcases.length">
      No showcases found. Please clear the filters
    </div>
    <div
      v-for="showcase in showcases"
      :key="showcase.id"
      class="w-full sm:w-1/2 md:w-1/3 p-2"
    >
      <div
        class="bg-grey-200 rounded-xl overflow-hidden cursor-pointer"
        @click="
          $router.push({
            name: 'explore-website',
            params: { website: showcase.slug }
          })
        "
      >
        <div class="">
          <!-- TODO: responsive https://res.cloudinary.com/nuxt/image/upload/w_1200,h_675,c_fill,f_auto,g_north/v1593006976/vue-telemetry/cacd07c28f622c286e5146fb8dc7a46e.jpg -->
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
