<template>
  <div class="pt-12 md:pt-8 mb-8">
    <CollectionsPage />
  </div>
</template>

<script>
import frontMatter from '@/utils/front-matter'

export default {
  name: 'PagesCollections',
  head() {
    return frontMatter({
      path: this.$route.path,
      title: 'Collections'
    })
  }
}
</script>
