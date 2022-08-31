<template>
  <AsideContentTemplate v-if="user">
    <template #aside-content-aside>
      <div class="pt-8">
        <CreateListButton class="mb-2" />

        <span>
          <transition-group
            :css="false"
            @enter="enterAnimation"
            @leave="leaveAnimation"
          >
            <ListNavItem
              v-for="list in sortedLists"
              :key="list.id"
              class="px-2"
              :list="list"
            />
          </transition-group>
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
import { timeline } from 'motion'
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

function enterAnimation (el, done) {
  timeline([
    [el, { opacity: 0, y: -10 }, { duration: 0 }],
    [el, { opacity: 1, y: 0 }, { duration: 0.25, easing: 'linear' }]
  ])
  // TODO: complete event
  setTimeout(() => {
    // Fix bug with Popup positioning
    el.style.transform = null
    done()
  }, 250)
}
function leaveAnimation (el: HTMLElement, done) {
  timeline([
    [el, { height: `${el.offsetHeight}px`, opacity: 1 }, { duration: 0 }],
    [el, { height: '0px', opacity: 0 }, { duration: 0.25, easing: 'linear' }]
  ])
  // TODO: complete event
  setTimeout(() => {
    done()
  }, 250)
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
