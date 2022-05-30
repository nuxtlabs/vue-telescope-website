<template>
  <div>
    explore-website {{ directHit }}

    <div v-if="directHit" class="px-4 xl:px-8">
      wtf {{ directHit }}

      <ShowcaseSection
        :website="website"
        class="max-w-readable xl:max-w-container m-auto"
      />
    </div>

    <div v-else>another stuff</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { $directHit: directHit } = useNuxtApp()
const { findOne } = useStrapi4()

const { data: website } = await useAsyncData(
  `showcases:${route.params.website}`,
  () => findOne('showcases', route.params.website)
)
</script>
