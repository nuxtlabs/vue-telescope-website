<template>
  <AsideContentTemplate v-if="user">
    <template #aside-content-aside>
      <div class="pt-8">
        <CreateListButton class="mb-2" />

        <span>
          <ListNavItem
            v-for="list in sortedLists"
            :key="list.id"
            class="px-2"
            :list="list"
          />
        </span>
      </div>
    </template>

    <template #aside-content-header>
      <MobileListsNav />
      <ListsBreadcrumbs class="ml-4 absolute top-0 mt-4 md:mt-0" />
    </template>

    <template #aside-content-main>
      <div>
        <transition name="slide" mode="out-in">
          <NoListTour v-if="!lists.length" class="mt-0 -mt-4" />

          <div v-else-if="selectedGroup">
            <transition name="slide" mode="out-in">
              <ListsShowcasesListing
                v-if="selectedShowcases.length"
                :key="selectedGroup.id"
                :showcases="selectedShowcases"
              />

              <NoShowcaseTour v-else key="empty" :group="selectedGroup" />
            </transition>
          </div>

          <div v-else>
            <transition name="slide" mode="out-in">
              <NoGroupTour
                v-if="!selectedList.groups || !selectedList.groups.length"
                class="-mt-4"
                :list="selectedList"
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
import type { Ref } from 'vue'
import type { User } from '~/types'
import AsideContentTemplate from '@/components/templates/AsideContentTemplate.vue'

const user = useStrapiUser() as Ref<User>

const {
  lists,
  selectedList,
  selectedGroup,
  selectedShowcases,
  sortedLists,
  setSelectedList,
  setSelectedGroup
} = useLists()

if (sortedLists.value[0]) {
  setSelectedList(sortedLists.value[0])
}

if (sortedLists.value[0]?.groups.length) {
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
