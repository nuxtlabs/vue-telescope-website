<template>
  <div v-click-outside="() => $emit('close')">
    <div
      ref="scrimRef"
      class="bg-white absolute top-0 left-0 w-full h-full"
    />
    <!-- <div
      v-if="!compact"
      ref="bg"
      style="opacity: 0"
      class="absolute top-0 left-0 w-full h-full xl:rounded-xl"
    ></div> -->

    <div
      v-if="showLists"
      class="absolute top-0 left-0 w-full h-full overflow-auto cursor-default"
    >
      <div
        v-if="user"
        class="w-full h-full"
        :class="compact ? 'p-3' : 'p-8'"
        @click.stop.prevent
      >
        <div v-if="listsWithGroups.length">
          <!-- <div
              class="font-bold-body-weight"
              :class="[
                compact
                  ? 'text-base leading-base mb-1'
                  : 'text-six leading-six mb-4'
              ]"
            >
              Save to:
            </div> -->

          <div class="label">
            <div
              :class="[
                compact
                  ? 'text-sm leading-sm mb-1'
                  : 'text-eight leading-eight mb-2'
              ]"
              class="flex items-center font-display-weight text-primary-500 uppercase"
            >
              <SaveIcon class="h-5 mr-2 opacity-50" />Save
            </div>
          </div>

          <ul class="ml-1">
            <li
              v-for="list in listsWithGroups"
              :key="list.id"
              class="root w-full flex flex-col mb-2"
            >
              <div class="flex items-center mb-1">
                <OpenedFolderIcon
                  class="mr-2 mt-1"
                  :class="[
                    compact ? 'w-4 h-4' : 'w-5 h-5',
                    isBookmarkedList(list) && 'text-primary-500'
                  ]"
                />
                <span
                  class="font-bold-body-weight"
                  :class="[
                    isBookmarkedList(list) && 'text-primary-500',
                    compact ? '' : 'text-seven leading-seven'
                  ]"
                >
                  {{ list.name }}
                </span>
              </div>
              <ul>
                <li
                  v-for="(group, i) in list.groups"
                  :key="group.id"
                  class="flex items-center"
                >
                  <!-- <span>
                {{ list.groups.length === i + 1 ? 'last' : 'regular' }}
              </span> -->
                  <span
                    class="inline-flex text-grey-200 mr-2"
                    :class="[compact ? 'w-4 h-5' : 'w-6 h-6']"
                  >
                    <svg
                      v-if="list.groups.length === i + 1"
                      preserveAspectRatio="none"
                      class="w-full h-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0V12H24"
                        stroke="currentColor"
                        vector-effect="non-scaling-stroke"
                      />
                    </svg>
                    <svg
                      v-else
                      preserveAspectRatio="none"
                      class="w-full h-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0V12M12 12H24M12 12V24"
                        stroke="currentColor"
                        vector-effect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                  <button
                    class="focus:outline-none text-left text-base"
                    :class="[
                      isBookmarked(group)
                        ? 'text-primary-500 has-hover:hover:text-primary-200'
                        : 'has-hover:hover:text-grey-400',
                      compact
                        ? 'text-sm leading-sm'
                        : 'text-base leading-base'
                    ]"
                    @click.stop.prevent="onBookmarkClicked(list, group)"
                  >
                    <span>{{ group.name }}</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div
          v-else
          class="w-full h-full p-4 flex items-center justify-center"
        >
          <div
            :class="[
              compact
                ? 'text-eight leading-eight'
                : 'text-seven leading-seven md:text-six md:leading-six'
            ]"
            class="text-center"
          >
            To save website into List you need to
            <NuxtLink to="/lists" class="text-primary-500">
              create a List
            </NuxtLink>
          </div>
        </div>
      </div>

      <div
        v-else
        class="w-full h-full p-3 flex flex-col items-center justify-center"
        @click.stop.prevent
      >
        <div
          class="text-center"
          :class="[
            compact
              ? 'text-sm leading-sm mb-2'
              : 'text-seven leading-seven sm:text-five sm:leading-five mb-4'
          ]"
        >
          Register with one click <br>to save websites into Lists
        </div>
        <GithubLoginButton
          :size="compact ? 'small' : 'base'"
          redirect="/lists"
          text="Login"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref, PropType } from 'vue'
import { timeline } from 'motion'
import type { User, Showcase, List, Group } from '~/types'

import OpenedFolderIcon from '@/assets/icons/opened-folder.svg'
import SaveIcon from '@/assets/icons/save.svg'
// import UnorderedListIcon from '@/assets/icons/unordered-list.svg'

const { lists, bookmarkRemoteShowcase, unbookmarkRemoteShowcase } = useLists()
const user = useStrapiUser() as Ref<User>

const scrimRef = ref(null)

defineEmits(['close'])

const props = defineProps({
  showcase: {
    type: Object as PropType<Showcase>,
    default: null
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const showLists = ref(false)

const listsWithGroups = computed(() => {
  return lists.value.filter(list => list.groups.length)
})

onMounted(() => {
  setTimeout(() => {
    showLists.value = true
  }, 200)

  timeline([
    [scrimRef.value, { scaleY: 0, transformOrigin: 'top' }, { duration: 0 }],
    [scrimRef.value, { scaleY: 1 }, { duration: 0.4 }]
  ])
})

function isBookmarkedList (list: List) {
  return Boolean(list.groups.map(g => isBookmarked(g)).filter(Boolean).length)
}

function isBookmarked (group: Group) {
  return group.showcases.find(s => s.id === props.showcase.id)
}

function onBookmarkClicked (list: List, group: Group) {
  group.showcases?.find(s => s.id === props.showcase.id)
    ? unbookmark(list, group)
    : bookmark(list, group)
}

async function bookmark (list: List, group: Group) {
  try {
    await bookmarkRemoteShowcase({
      showcase: props.showcase,
      group,
      list
    })
  } catch (e) {}
}

async function unbookmark (list: List, group: Group) {
  try {
    await unbookmarkRemoteShowcase({
      showcase: props.showcase,
      group,
      list
    })
  } catch (e) {}
}
</script>
<!--
<style lang="postcss" scoped>
.root {
  & ul {
    margin-left: 1.5rem;
    & li {
      position: relative;
    }
    & li:before {
      position: absolute;
      left: -1rem;
      top: 0%;
      content: '';
      display: block;
      border-left: 1px solid theme('colors.grey.100');
      height: 50%;
      border-bottom: 1px solid theme('colors.grey.100');
      width: 10px;
    }
    & li:after {
      position: absolute;
      left: -1rem;
      bottom: -7px;
      content: '';
      display: block;
      border-left: 1px solid theme('colors.grey.100');
      height: 100%;
    }
    & li:last-child:after {
      display: none;
    }
  }
}
</style> -->
