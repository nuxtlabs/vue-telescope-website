<template>
  <div
    v-click-outside="clickOutsideHandler"
    class="focus:outline-none group flex"
  >
    <span
      class="cursor-pointer flex-1 relative mr-1"
      @click="clickOnNameHandler"
      @keypress.enter="clickOnNameHandler"
    >
      <AppAutosizeTextarea
        v-if="updatingGroup"
        ref="inputRef"
        v-model="newGroupName"
        class="p-1 rounded-md"
        @submit="updateGroup"
        @keydown.esc.native="clearActions"
        @click.stop.native
      />
      <span
        v-else
        style="word-break: break-word"
        class="p-1 inline-flex select-none"
        :class="[isSelected && 'text-primary-500']"
      >
        <span
          ref="deletingScrimRef"
          class="opacity-0 backdrop-blur-sm absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        {{ group.name }}
      </span>
    </span>

    <div class="w-8 h-8 ml-auto">
      <button
        v-if="updatingGroup"
        title="Save"
        class="focus:outline-none bg-grey-50 rounded-md p-2"
        @click.stop="updateGroup"
      >
        <AppLoader
          v-if="loading"
          class="w-4 h-4"
          background="text-grey-400"
          path="text-grey-200"
        />
        <SaveIcon v-else class="w-4 h-4" />
      </button>
      <button
        v-else
        ref="anchorRef"
        class="focus:outline-none has-hover:group-hover:flex has-hover:hover:bg-grey-50 rounded-lg w-full h-full items-center justify-center"
        :class="[openCollapse || showPopup || isSelected ? 'flex' : 'hidden']"
        @click="openPopup"
      >
        <DotsVerticalIcon class="w-5 h-5" />
      </button>
    </div>

    <Popper
      v-if="showPopup"
      :offset-x="4"
      :offset-y="-2"
      placement="right-start"
      :anchor="anchorRef"
    >
      <GroupNavItemPopup
        v-if="!updatingGroup"
        :up="canMoveUp"
        :down="canMoveDown"
        @delete="deleteGroup"
        @rename="initUpdateGroup"
        @up="moveUpGroup"
        @down="moveDownGroup"
      />
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { animate } from 'motion'
import type { PropType } from 'vue'
import type { List, Group } from '~/types'

import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg'
import SaveIcon from '@/assets/icons/save.svg'

const emit = defineEmits(['group-selected'])

const anchorRef = ref(null)
const deletingScrimRef = ref(null)
const inputRef = ref(null)

const {
  selectedGroup,
  updateRemoteGroup,
  deleteRemoteGroup,
  moveUpRemoteGroup,
  moveDownRemoteGroup,
  setSelectedGroup
} = useLists()

const props = defineProps({
  group: {
    type: Object as PropType<Group>,
    default: null
  },
  list: {
    type: Object as PropType<List>,
    default: null
  }
})

const loading = ref(false)
const openCollapse = ref(false)
const showPopup = ref(false)
const newGroupName = ref('')
// const creatingGroup = ref(false)
const updatingGroup = ref(false)
const deletingGroup = ref(false)

const isSelected = computed(() => {
  return selectedGroup.value?.id === props.group.id
})

const canMoveUp = computed(() => {
  // TODO: fix asap
  return isSelected.value && props.list.groups[0].id !== props.group.id
})

const canMoveDown = computed(() => {
  // TODO: fix asap
  return (
    isSelected.value &&
    props.list.groups[props.list.groups.length - 1].id !== props.group.id
  )
})

function clickOutsideHandler () {
  // this.showDropdown = false
  clearActions()
}

function clickOnNameHandler () {
  emit('group-selected', props.group.id)
  showPopup.value = false
  // this.openCollapse = !this.openCollapse
  // this.clearActions()
  // this.creatingGroup = false
}

function openPopup () {
  emit('group-selected', props.group.id)
  showPopup.value = !showPopup.value
}

function clearActions () {
  showPopup.value = false
  newGroupName.value = ''
  updatingGroup.value = false
}

async function updateGroup () {
  try {
    if (!newGroupName.value || loading.value) { return }
    loading.value = true
    await updateRemoteGroup({
      name: newGroupName.value,
      group: props.group,
      list: props.list
    })
    loading.value = false
    clearActions()
  } catch (e) {
    loading.value = false
  }
}

async function deleteGroup () {
  try {
    deletingGroup.value = true
    animate(deletingScrimRef.value, { opacity: 1 }, { duration: 0.25, easing: 'linear' })
    await deleteRemoteGroup({
      group: props.group,
      list: props.list
    })
    deletingGroup.value = false
    setSelectedGroup(props.list.groups[0])
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

function initUpdateGroup () {
  updatingGroup.value = true
  newGroupName.value = props.group.name
  nextTick(() => {
    inputRef.value?.$el.focus()
  })
}

async function moveUpGroup () {
  try {
    loading.value = true
    await moveUpRemoteGroup({
      group: props.group,
      list: props.list
    })
    clearActions()
  } catch (e) {}
  loading.value = false
}

async function moveDownGroup () {
  try {
    loading.value = true
    await moveDownRemoteGroup({
      group: props.group,
      list: props.list
    })
    clearActions()
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
  loading.value = false
}
</script>
