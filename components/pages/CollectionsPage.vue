<template>
  <ClientOnly>
    <AsideContentTemplate v-if="$strapi.user">
      <div slot="aside-content-aside">
        <CreateCollection class="mb-2" />

        <transition-group
          :css="false"
          @enter="enterAnimation"
          @leave="leaveAnimation"
        >
          <CollectionListItem
            v-for="collection in sortedCollections"
            :key="collection.id"
            class="px-2"
            :collection="collection"
            @close-menu="notWorking"
          />
        </transition-group>
      </div>

      <template slot="aside-content-header">
        <MobileCollectionsMenu ref="mobile-menu" />
        <CollectionsBreadcrumbs
          @open-menu="$refs['mobile-menu'].show = true"
          class="ml-4 absolute top-0 -mt-6"
        />
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
  },
  created() {
    // this.selectedCollection = this.collections[0]
    this.$store.commit('collections/setSelectedCollection', {
      collection: this.sortedCollections[0],
      from: 'CollectionsPage'
    })
    // console.log('BREADCRUMBS ISSUE', this.sortedCollections[0])
    if (this.sortedCollections[0] && this.sortedCollections[0].groups.length) {
      this.$store.commit(
        'collections/setSelectedGroup',
        this.sortedCollections[0].groups[0]
      )
    }
  },
  methods: {
    notWorking() {
      console.log('NOT WORKING')
    },
    enterAnimation(el, done) {
      this.$gsap.fromTo(
        el,
        {
          opacity: 0,
          y: -10
        },
        {
          opacity: 1,
          y: 0,
          clearProps: true,
          duration: 0.25,
          onComplete: done
        }
      )
    },
    leaveAnimation(el, done) {
      // this.$gsap.set(el, {
      //   transformOrigin: 'left'
      // })
      this.$gsap.to(el, {
        height: 0,
        // y: 10,
        opacity: 0,
        duration: 0.25,
        onComplete: done
      })
    }
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

/*.list-enter-active,
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
}*/
</style>
