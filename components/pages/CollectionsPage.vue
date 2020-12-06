<template>
  <ClientOnly>
    <AsideContentTemplate v-if="$strapi.user">
      <div slot="aside-content-aside">
        <div>
          <LoggedInCard class="mb-4 mx-2" />
        </div>
      </div>
    </AsideContentTemplate>
    <div v-else>
      <CollectionsGreeting />
    </div>
  </ClientOnly>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.collections.collections)
  }
}
</script>
