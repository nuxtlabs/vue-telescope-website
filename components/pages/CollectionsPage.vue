<template>
  <ClientOnly>
    <AsideContentTemplate v-if="$strapi.user">
      <div slot="aside-content-aside">
        <CreateCollection class="mb-12" />

        <div>
          <transition-group name="list">
            <CollectionListItem
              v-for="collection in sortedCollections"
              :key="collection.id"
              class="px-2"
              :collection="collection"
            />
          </transition-group>
        </div>

        <!-- <button @click="addCollection">Add Collection</button> -->
        <!-- @cleanup="clearActions" -->
      </div>

      <div slot="aside-content-main">
        <CreateCollectionTour v-if="!collections.length" class="mt-0 -mt-4" />

        <!-- navigate between grousp -->
        <div v-else-if="selectedGroup">
          <transition name="fade" mode="out-in">
            <ShowcasesListing
              v-if="selectedGroup.showcases.length"
              :key="selectedGroup.id"
              :showcases="selectedGroup.showcases"
            />
            <div
              v-else
              :key="selectedGroup.id"
              class="px-4 mt-0 -mt-4 flex items-center justify-center"
            >
              <h2 class="text-seven">
                Visit
                <NuxtLink
                  to="/explore"
                  class="text-primary-500 hover:underline"
                >
                  Explore
                </NuxtLink>
                page to save showcases.
              </h2>
            </div>
          </transition>
        </div>

        <div v-else>
          <!-- <pre>{{ selectedCollection }}</pre> -->
          <transition name="fade" mode="out-in">
            <GroupMain
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
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      collections: (state) => state.collections.collections,
      selectedCollection: (state) => state.collections.selectedCollection,
      selectedGroup: (state) => state.collections.selectedGroup
    }),
    ...mapGetters({ sortedCollections: 'collections/sortedCollections' })
    //   reversedCollections() {
    //     // TODO: sort by created
    //     const c = [...this.collections]
    //     return c.sort(function (a, b) {
    //       const keyA = new Date(a.created_at)
    //       const keyB = new Date(b.created_at)
    //       if (keyA > keyB) return -1
    //       if (keyA < keyB) return 1
    //       return 0
    //     })
    //   }
  },
  created() {
    // this.selectedCollection = this.collections[0]
    this.$store.commit(
      'collections/setSelectedCollection',
      this.sortedCollections[0]
    )
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
    // collectionSelectionHandler($event, collection) {
    //   this.$store.commit(
    //     'collections/setSelectedCollection',
    //     $event ? collection : null
    //   )
    //   this.$store.commit('collections/setSelectedGroup', null)
    // }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 250ms;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.fade-enter {
  opacity: 0;
  transform: translateX(-5px);
}

.fade-leave-active {
  opacity: 0;
  transform: translateX(5px);
}

.list-enter-active,
.list-leave-active {
  transition-duration: 250ms;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.list-enter {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-active {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
