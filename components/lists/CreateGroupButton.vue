<template>
  <div class="pl-6">
    <button
      v-if="!creatingGroup"
      class="focus:outline-none group w-full flex items-center py-1"
      @click="initGroupCreation"
    >
      <PlusIcon
        class="w-4 h-4 mr-2 opacity-50 has-hover:group-hover:opacity-100 transition-opacity duration-200"
      />
      <span
        class="opacity-25 has-hover:group-hover:opacity-100 transition-opacity duration-200"
      >
        Create Group
      </span>
    </button>

    <div v-if="creatingGroup" class="flex">
      <div class="flex-1 mr-1 relative">
        <AppAutosizeTextarea
          ref="inputRef"
          v-model="newGroupName"
          v-click-outside="() => (creatingGroup = false)"
          class="p-1 rounded-md"
          @submit="createGroup"
          @keydown.esc.native="clearActions"
          @click.stop.native
        />
        <button
          v-if="newGroupName"
          class="focus:outline-none absolute top-0 right-0 z-10 p-1 m-1 bg-grey-100 bg-opacity-80 rounded-md"
          @click="clearInput"
        >
          <XmarkIcon class="w-4 h-4" />
        </button>
      </div>

      <div class="w-8 h-8">
        <button
          v-if="creatingGroup && newGroupName"
          title="Save"
          class="focus:outline-none border-2 border-transparent bg-grey-50 rounded-lg p-1"
          @click.stop="createGroup"
        >
          <AppLoader
            v-if="loading"
            class="w-5 h-5"
            background="text-grey-400"
            path="text-grey-200"
          />
          <SaveIcon v-else class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { List } from '~/types'

import PlusIcon from '@/assets/icons/plus-circle.svg'
import XmarkIcon from '@/assets/icons/xmark.svg'
import SaveIcon from '@/assets/icons/save.svg'

const { setSelectedList, createRemoteGroup } = useLists()

const inputRef = ref(null)

const emit = defineEmits(['cleanup'])

const props = defineProps({
  list: {
    type: Object as PropType<List>,
    default: null
  }
})

const loading = ref(false)
const newGroupName = ref('')
const creatingGroup = ref(false)

function clearActions () {
  newGroupName.value = ''
  emit('cleanup')
}

function initGroupCreation () {
  setSelectedList(props.list)
  creatingGroup.value = true
  nextTick(() => {
    inputRef.value?.$el.focus()
  })
}

function clearInput () {
  newGroupName.value = ''
  inputRef.value?.$el.focus()
}

async function createGroup () {
  try {
    if (!newGroupName.value || loading.value) { return }
    loading.value = true
    await createRemoteGroup({
      name: newGroupName.value,
      list: props.list
    })
    loading.value = false
    clearActions()
    creatingGroup.value = false
  } catch (e) {
    loading.value = false
  }
}
</script>
