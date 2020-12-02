<template>
  <div class="max-w-container-max-width px-2 mx-auto pt-4 pb-12">
    <ClientOnly>
      <CollectionsGreeting v-if="!$strapi.user" />
      <div v-else>
        <LoggedInCard class="mb-4 mx-2" />
        <Collections />
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import frontMatter from '@/utils/front-matter'

export default {
  head() {
    return frontMatter({
      path: this.$route.path,
      title: 'Collections'
    })
  }
}
</script>
