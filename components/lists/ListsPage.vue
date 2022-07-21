<template>
  <AsideContentTemplate v-if="user">
    <template #aside-content-aside>
      <div>
        <CreateListButton class="mb-2" />

        <!-- ListsNav -->
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
              @close-menu="notWorking"
            />
          </transition-group>
        </span>
      </div>
    </template>

    <template #aside-content-header>
      <MobileListsNav />
      <ListsBreadcrumbs class="ml-4 absolute top-0 -mt-6" />
    </template>

    <template #aside-content-main>
      <div>
        <transition name="slide" mode="out-in">
          <NoListTour v-if="!lists.length" class="mt-0 -mt-4" />

          <div v-else-if="selectedGroup">
            <transition name="slide" mode="out-in">
              <ListShowcaseItem
                v-if="selectedShowcases.length"
                :key="selectedGroup.id"
                :showcases="selectedShowcases"
              />

              <NoShowcaseTour v-else key="empty" :list="selectedGroup" />
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
import AsideContentTemplate from '@/components/templates/AsideContentTemplate.vue'

const user = useStrapiUser()
const { $gsap } = useNuxtApp()

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
if (sortedLists.value[0] && sortedLists.value[0].groups.length) {
  setSelectedGroup(sortedLists.value[0].groups[0])
}

function enterAnimation (el, done) {
  $gsap.fromTo(
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
}
function leaveAnimation (el, done) {
  // this.$gsap.set(el, {
  //   transformOrigin: 'left'
  // })
  $gsap.to(el, {
    height: 0,
    // y: 10,
    opacity: 0,
    duration: 0.25,
    onComplete: done
  })
}

function notWorking () {
  console.log('NOT WORKING')
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
