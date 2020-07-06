<template>
  <div class="w-full sm:w-1/2 md:w-1/3 p-2">
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
        <!-- <img :src="showcase.screenshotUrl" alt="" /> -->
        <!-- <pre>{{ showcase.screenshotUrl.split('/').pop() }}</pre> -->
        <AppResponsiveCloudinaryImage
          :src="showcase.screenshotUrl"
          ratio="4:3"
          sizes="(min-width: 834px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
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
</template>

<script>
export default {
  props: {
    showcase: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style></style>
