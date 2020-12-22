<template>
  <ClientOnly>
    <AsideContentTemplate v-if="$strapi.user">
      <div slot="aside-content-aside">
        <CreateCollection class="mb-8" />

        <transition-group name="list">
          <CollectionListItem
            v-for="collection in sortedCollections"
            :key="collection.id"
            class="px-2"
            :collection="collection"
          />
        </transition-group>
      </div>

      <template slot="aside-content-header">
        <MobileCollectionsMenu />
      </template>

      <div slot="aside-content-main">
        <transition name="slide" mode="out-in">
          <EmptyCollectionsTour v-if="!collections.length" class="mt-0 -mt-4" />

          <!-- navigate between groups -->
          <div v-else-if="selectedGroup">
            <transition name="slide" mode="out-in">
              <CollectionShowcaseCardsListing
                v-if="selectedGroup.showcases.length"
                :key="selectedGroup.id"
                :showcases="selectedGroup.showcases"
              />

              <!-- if no showcases, then show tour -->
              <EmptyListTour
                v-else
                :key="selectedGroup.id"
                :list="selectedGroup"
              />
            </transition>
          </div>

          <!-- direct hit, collection overview; create group tour -->
          <div v-else>
            <transition name="slide" mode="out-in">
              <GroupMain
                v-if="selectedCollection"
                :key="selectedCollection.id"
                :groups="selectedCollection.groups"
                :collection="selectedCollection"
              />
            </transition>
          </div>
        </transition>
      </div>
    </AsideContentTemplate>

    <CollectionsGreeting v-else />
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
    if (this.sortedCollections[0] && this.sortedCollections[0].groups.length) {
      this.$store.commit(
        'collections/setSelectedGroup',
        this.sortedCollections[0].groups[0]
      )
    }
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
.slide-enter-active,
.slide-leave-active {
  transition-duration: 250ms;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.slide-enter {
  opacity: 0;
  transform: translateY(-4px);
}

.slide-leave-active {
  opacity: 0;
  transform: translateY(4px);
}

.list-enter-active,
.list-leave-active {
  transition-duration: 5000ms;
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
