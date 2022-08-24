<template>
  <div class="relative flex flex-col overflow-hidden">
    <div v-click-outside="clickOutsideHandler" class="relative flex group">
      <div
        ref="nameRef"
        class="focus:outline-none flex flex-1 cursor-pointer py-2"
        tabindex="0"
        @click="clickOnNameHandler"
        @keypress.enter="clickOnNameHandler"
      >
        <FolderIcon
          v-if="!openCollapse"
          class="w-5 mr-1 my-1"
          :class="[isSelected && 'text-primary-500']"
        />
        <OpenedFolderIcon
          v-else
          class="w-5 mr-1 my-1"
          :class="[isSelected && 'text-primary-500']"
        />
        <span class="relative flex flex-1 text-eight leading-eight">
          <AppAutosizeTextarea
            v-if="updatingList"
            ref="inputRef"
            v-model="newListName"
            class="font-bold-body-weight p-1 rounded-md mr-1"
            @submit="updateList"
            @keydown.esc.native="clearActions"
            @click.stop.native
            @keypress.enter.stop.native
          />
          <span
            v-else
            style="word-break: break-word"
            class="font-bold-body-weight p-1 inline-flex select-none mr-1"
            :class="[isSelected && 'text-primary-500']"
          >
            {{ list.name }}
          </span>
        </span>
      </div>

      <div class="w-8 h-8 ml-auto my-2">
        <button
          v-if="!updatingList"
          ref="anchorRef"
          class="focus:outline-none has-hover:group-hover:flex items-center justify-center rounded-lg w-full h-full"
          :class="[
            openCollapse || showPopup ? 'flex' : 'hidden',
            showPopup ? 'bg-grey-50' : 'has-hover:hover:bg-grey-50'
          ]"
          @click="openDropdown"
        >
          <DotsVerticalIcon />
        </button>

        <button
          v-else
          title="Save"
          class="focus:outline-none bg-grey-50 rounded-md p-2"
          @click.stop="updateList"
        >
          <AppLoader
            v-if="loading"
            class="w-4 h-4"
            background="text-grey-400"
            path="text-grey-200"
          />
          <SaveIcon v-else class="w-4 h-4" />
        </button>
      </div>

      <Popper
        v-if="showPopup"
        :offset-x="4"
        :offset-y="-2"
        placement="right-start"
        :anchor="anchorRef"
      >
        <ListNavItemPopup
          v-if="!updatingList"
          @delete="deleteList"
          @rename="initUpdateList"
          @share="shareList = true"
        />
      </Popper>
    </div>

    <teleport to="body">
      <LazyShareListModal
        v-if="shareList"
        :list="list"
        @close="shareList = false"
      />
    </teleport>

    <!-- Group Collapsible -->
    <transition :css="false" @enter="enter" @leave="leave">
      <div v-if="openCollapse">
        <!-- <div> -->
        <GroupNavItem
          v-for="group in reversedListGroups"
          :key="group.id"
          :group="group"
          :list="list"
          tabindex="0"
          class="pl-6"
          @group-selected="groupSelectionHandler($event, group)"
        />

        <CreateGroupButton :list="list" @cleanup="clearActions" />
        <!-- </div> -->
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { animate, timeline } from 'motion'
import type { PropType } from 'vue'
import type { List } from '~/types'

import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg'
import FolderIcon from '@/assets/icons/folder.svg'
import OpenedFolderIcon from '@/assets/icons/opened-folder.svg'
import SaveIcon from '@/assets/icons/save.svg'

const emit = defineEmits(['close-menu'])

const nameRef = ref(null)
const inputRef = ref(null)
const anchorRef = ref(null)

const {
  selectedList,
  setSelectedList,
  setSelectedGroup,
  deleteRemoteList,
  updateRemoteList
} = useLists()
const { isMobile } = useUserAgent()

const loading = ref(false)
// const clicked = 0
const openCollapse = ref(false)
const showPopup = ref(false)
const newListName = ref('')
const updatingList = ref(false)
const shareList = ref(false)

const props = defineProps({
  list: {
    type: Object as PropType<List>,
    default: null
  }
})

const isSelected = computed(() => {
  return selectedList.value?.id === props.list.id
})

const reversedListGroups = computed(() => {
  const r = [...props.list.groups]
  return r.sort(
    (a, b) =>
      a.position - b.position || new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
})

watch(selectedList, (newValue) => {
  if (newValue && newValue.id !== props.list.id && openCollapse.value) {
    openCollapse.value = false
  } else if (selectedList.value?.id === props.list.id) {
    openCollapse.value = true
  }
}, { immediate: true })

function openDropdown () {
  showPopup.value = !showPopup.value
}

function clickOutsideHandler () {
  showPopup.value = false
  clearActions()
}

function clickOnNameHandler () {
  setSelectedList(props.list)
  setSelectedGroup(props.list.groups[0])
  if (!openCollapse.value) {
    openCollapse.value = true
  }

  // // more nice behaviour
  // if (!openCollapse.value) {
  //   openCollapse.value = true
  // } else {
  //   if (this.clicked === 0) {
  //     this.clicked++
  //   } else if (this.clicked === 1) {
  //     openCollapse.value = !openCollapse.value
  //     this.clicked = 0
  //   } else {
  //     this.clicked = 0
  //   }
  // }
  clearActions()
  // this.clicked = 0
}

function clearActions () {
  showPopup.value = false
  newListName.value = ''
  updatingList.value = false
}

async function deleteList () {
  try {
    showPopup.value = false
    await deleteRemoteList({
      list: props.list
    })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

function initUpdateList () {
  // popperInstance.forceUpdate()
  updatingList.value = true
  newListName.value = props.list.name
  nextTick(() => {
    inputRef.value?.$el.focus()
  })
}

async function updateList () {
  try {
    if (!newListName.value || loading.value) { return }
    loading.value = true
    await updateRemoteList({
      name: newListName.value,
      list: props.list
    })
    loading.value = false
    clearActions()
    nameRef.value.focus()
  } catch (e) {
    loading.value = false
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

function groupSelectionHandler ($event, group) {
  setSelectedGroup($event ? group : null)
  setSelectedList($event ? props.list : null)
  if (isMobile.value) {
    emit('close-menu')
  }
}

function enter (el, done) {
  nextTick(() => {
    const h = el.offsetHeight
    timeline([
      [el, { height: '0px', opacity: 0 }, { duration: 0 }],
      [el, { height: `${h}px`, opacity: 1 }, { duration: 0.25, easing: 'linear' }]
    ])
    // TODO: complete event
    // Weird timing because of Safari bug
    setTimeout(() => {
      animate(el, { height: 'auto' }, { duration: 0 })
      done && done()
    }, 266)
  })
}

function leave (el, done) {
  timeline([
    [el, { height: `${el.offsetHeight}px`, opacity: 0 }, { duration: 0.25, easing: 'linear' }],
    [el, { height: '0px' }, { duration: 0 }]
  ])
  // TODO: complete event
  setTimeout(() => {
    done()
  }, 250)
}
</script>
