<template>
  <ClientOnly>
    <AsideContentTemplate v-if="$strapi.user">
      <div slot="aside-content-aside">
        <CollectionsListItem
          v-for="collection in collections"
          :key="collection.id"
          :collection="collection"
          :class="[
            selectedCollection &&
              selectedCollection.id === collection.id &&
              'text-red-500'
          ]"
          @collection-selected="
            $event
              ? (selectedCollection = collection)
              : (selectedCollection = null)
          "
        />
        <button @click="addCollection">Add Collection</button>
      </div>
      <div slot="aside-content-main">
        <pre>{{ selectedCollection }}</pre>
        <transition name="fade" mode="out-in">
          <GroupsList
            v-if="selectedCollection"
            :key="selectedCollection.id"
            :groups="selectedCollection.groups"
          />
        </transition>
      </div>
    </AsideContentTemplate>
    <div v-else>
      <CollectionsGreeting />
    </div>
  </ClientOnly>
</template>

<script>
export default {
  data() {
    return {
      selectedCollection: null
    }
  },
  computed: {
    collections() {
      return this.$store.state.collections.collections
    }
  },
  mounted() {
    console.log(this.$store.state.collections.collections)
  },
  methods: {
    async addCollection() {
      console.log('addCollection')
      const newCollection = await this.$store.dispatch(
        'collections/createCollection',
        {
          name: 'wtf'
        }
      )
      console.log('COLLECTION CREATED', newCollection)
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 250ms;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
