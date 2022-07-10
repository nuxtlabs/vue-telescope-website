<template>
  <AsideContentTemplate v-if="user">
    <template #aside-content-main>
      <div>fuuuuuuuu{{ lists }}</div>
    </template>
  </AsideContentTemplate>
  <ListsGreeting v-else />
</template>

<script setup lang="ts">
import AsideContentTemplate from '@/components/templates/AsideContentTemplate.vue'

const user = useStrapiUser()

const { lists, updateGroup, updateRemoteGroup } = useLists()

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

// ...mapState({
//   collections: (state) => state.collections.collections,
//   selectedCollection: (state) => state.collections.selectedCollection,
//   selectedGroup: (state) => state.collections.selectedGroup,
//   selectedShowcases: (state) => {
//     return [...state.collections.selectedGroup.showcases].sort(
//       (a, b) => a.position - b.position
//     )
//   }
// }),
// ...mapGetters({ sortedCollections: 'collections/sortedCollections' })
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
