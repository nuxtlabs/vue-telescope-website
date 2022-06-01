<template>
  <div>
    <div v-if="directHit" class="px-4 xl:px-8">
      <ShowcaseSection
        :website="website"
        class="max-w-readable xl:max-w-container m-auto"
      />
    </div>

    <div v-else>
      <FloatingViewModal
        :fetched="website ? true : false"
        @close="$router.push('/explore')"
      >
        <ShowcaseSection :website="website" class="twitter-like mb-12" />
        <CtaSection />
      </FloatingViewModal>
    </div>
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
