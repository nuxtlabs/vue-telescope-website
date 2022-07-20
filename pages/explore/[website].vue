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
        @close="onCloseModal"
      >
        <ShowcaseSection :website="website" class="floating-view mb-12" />
        <CtaSection />
      </FloatingViewModal>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { $directHit: directHit } = useNuxtApp()
const { findOne } = useStrapi3()
// const { setModal } = useModal()

const { data: website } = await useAsyncData(
  `showcases:${route.params.website}`,
  () => findOne('showcases', route.params.website)
)

function onCloseModal() {
  // setModal(false)
  router.push('/explore')
}
</script>
