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
import type { Showcase } from '~/types'

const route = useRoute()
const router = useRouter()
const { $directHit: directHit } = useNuxtApp()
const { findOne } = useStrapi3()
// const { setModal } = useModal()

const { data: showcase } = await useAsyncData(
  `showcases:${route.params.showcase}`,
  () => findOne<Showcase>('showcases', route.params.showcase as string)
)

function onCloseModal () {
  // setModal(false)
  router.push('/explore')
}

useFrontMatter({
  title: (showcase.value?.title) || 'Loading...',
  description: `Reveal the Vue plugins and technology stack powering ${showcase.value ? showcase.value.domain : 'any website'}`,
  noindex: true,
  image: `https://res.cloudinary.com/nuxt/image/upload/w_1200,h_630,f_auto,q_auto,c_fill,g_north/${showcase.value.screenshotUrl}`
})
</script>
