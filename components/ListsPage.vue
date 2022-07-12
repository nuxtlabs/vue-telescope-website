<template>
  <AsideContentTemplate v-if="user">
    <template #aside-content-aside>
      <div>
        <CreateListButton class="mb-2" />

        <!-- <transition-group
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
        </transition-group> -->
      </div>
    </template>

    <template #aside-content-header>
      <!-- <MobileCollectionsMenu ref="mobile-menu" /> -->
      <!-- @open-menu="$refs['mobile-menu'].show = true" -->
      <CollectionsBreadcrumbs class="ml-4 absolute top-0 -mt-6" />
    </template>

    <template #aside-content-main>
      <div>
        <transition name="slide" mode="out-in">
          <EmptyCollectionsTour v-if="!lists.length" class="mt-0 -mt-4" />

          <!-- navigate between groups -->
          <div v-else-if="selectedGroup">
            <transition name="slide" mode="out-in">
              <ListShowcaseCardsListing
                v-if="selectedShowcases.length"
                :key="selectedGroup.id"
                :showcases="selectedShowcases"
              />

              <!-- if no showcases, then show tour -->
              <EmptyListTour v-else key="empty" :list="selectedGroup" />
            </transition>
          </div>

          <!-- direct hit, collection overview; create group tour -->
          <div v-else>
            <transition name="slide" mode="out-in">
              <GroupMain
                v-if="selectedList"
                :key="selectedList.id"
                :groups="selectedList.groups"
                :collection="selectedList"
              />
            </transition>
          </div>
        </transition>
      </div>
    </template>
  </AsideContentTemplate>
  <ListsGreeting v-else />
</template>

<script setup lang="ts">
import AsideContentTemplate from '@/components/templates/AsideContentTemplate.vue'

const user = useStrapiUser()

const {
  lists,
  selectedList,
  selectedGroup,
  selectedShowcases,
  sortedLists,
  setSelectedList,
  setSelectedGroup
} = useLists()

setTimeout(async () => {
  // await createList({ name: 'LIST TWO' })
  // await createRemoteGroup({
  //   name: 'CHECK REMOTE GROUP CREATE',
  //   list: { id: 1125 }
  // })
  // await updateRemoteGroup({
  //   group: { id: 959 },
  //   name: 'UPDATED GROUP',
  //   list: { id: 1125 }
  // })
})

if (sortedLists.value[0]) {
  setSelectedList(sortedLists.value[0])
}
if (sortedLists.value[0] && sortedLists.value[0].groups.length) {
  setSelectedGroup(sortedLists.value[0].groups[0])
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
