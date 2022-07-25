<template>
  <div>
    <FloatingViewModal
      v-if="activeShowcase"
      :fetched="activeShowcase ? true : false"
      @close="activeShowcase = false"
    >
      <ShowcaseSection :showcase="activeShowcase" class="floating-view mb-12" />
      <CtaSection />
    </FloatingViewModal>

    <div class="w-full flex flex-wrap">
      <ShowcaseCard
        v-for="(showcase, index) in showcases"
        :key="showcase.id"
        :data-index="index"
        :showcase="showcase"
        sortable
        class="w-full mb-4 sm:w-1/2 md:w-1/3"
        @open-link="openLinkHandler(showcase)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showcases: {
    type: Array,
    default: null
  }
})

const { findOne } = useStrapi3()

const activeShowcase = ref(null)

async function openLinkHandler (showcase) {
  const fullShowcase = await findOne('showcases', showcase.slug)
  activeShowcase.value = fullShowcase
}
</script>
