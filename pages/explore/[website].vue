<template>
  <div>
    <div class="px-4 xl:px-8">
      explore-website

      <ShowcaseSection
        :website="website"
        class="max-w-readable xl:max-w-container m-auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { findOne } = useStrapi4()

const { data: website } = await useAsyncData(
  `showcases:${route.params.website}`,
  () => findOne('showcases', route.params.website)
)
</script>
