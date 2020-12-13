<template>
  <ClientOnly>
    <AsideContentTemplate v-if="$strapi.user">
      <div slot="aside-content-aside">
        <CreateCollection class="mb-2" />

        <div>
          <CollectionListItem
            class="px-2"
            v-for="collection in collections"
            :key="collection.id"
            :collection="collection"
            @collection-selected="
              collectionSelectionHandler($event, collection)
            "
          />
        </div>

        <!-- <button @click="addCollection">Add Collection</button> -->
        <!-- @cleanup="clearActions" -->
      </div>

      <div slot="aside-content-main">
        <CreateCollectionTour v-if="!collections.length" />

        <div v-else-if="selectedGroup">
          <transition name="fade" mode="out-in">
            <pre :key="selectedGroup.id">{{ selectedGroup }}</pre>
          </transition>
        </div>

        <div v-else>
          <!-- <pre>{{ selectedCollection }}</pre> -->
          <transition name="fade" mode="out-in">
            <GroupPreview
              v-if="selectedCollection"
              :key="selectedCollection.id"
              :groups="selectedCollection.groups"
              :collection="selectedCollection"
            />
          </transition>
        </div>
      </div>
    </AsideContentTemplate>
    <div v-else>
      <CollectionsGreeting />
    </div>
  </ClientOnly>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      collections: (state) => state.collections.collections,
      selectedCollection: (state) => state.collections.selectedCollection,
      selectedGroup: (state) => state.collections.selectedGroup
    })
  },
  created() {
    // this.selectedCollection = this.collections[0]
    this.$store.commit('collections/setSelectedCollection', this.collections[0])
  },
  // mounted() {
  //   console.log(this.$store.state.collections.collections)
  // },
  methods: {
    // async deleteCollection(collection) {
    //   try {
    //     await this.$store.dispatch('collections/deleteCollection', {
    //       collection
    //     })
    //     // this.selectedCollection = null
    //     this.$store.commit(
    //       'collections/setSelectedCollection',
    //       this.collections[0]
    //     )
    //   } catch (e) {}
    // },
    collectionSelectionHandler($event, collection) {
      this.$store.commit(
        'collections/setSelectedCollection',
        $event ? collection : null
      )
      this.$store.commit('collections/setSelectedGroup', null)
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
