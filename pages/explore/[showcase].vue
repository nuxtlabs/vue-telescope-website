<template>
  <div>
    <div v-if="directHit" class="px-4 xl:px-8">
      <ShowcaseSection
        :showcase="showcase"
        class="max-w-readable xl:max-w-container m-auto"
      />
    </div>

    <div v-else>
      <FloatingViewModal
        :fetched="showcase ? true : false"
        @close="onCloseModal"
      >
        <ShowcaseSection :showcase="showcase" class="floating-view mb-12" />
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

// TODO: server, lazy?
const { data: showcase } = await useAsyncData(
  `showcases:${route.params.showcase}`,
  () => findOne('showcases', route.params.showcase)
)

function onCloseModal () {
  // setModal(false)
  router.push('/explore')
}

useFrontMatter({
  title: (showcase.value && showcase.value.title) || 'Loading...',
  description: `Reveal the Vue plugins and technology stack powering ${showcase.value ? showcase.value.domain : 'any website'}`,
  noindex: true
})
</script>
