<template>
  <div class="h-10 flex items-center">
    <button
      v-if="selectedList"
      class="flex items-center focus:outline-none"
      @click="isMobile ? $emit('open-menu') : null"
    >
      <FolderIcon class="w-5 h-5 mr-2" />
      <span class="font-bold-body-weight">{{ selectedList.name }}</span>
    </button>
    <div v-if="selectedGroup">
      <ChevronRightIcon class="w-4 h-4 mx-1" />
    </div>
    <button
      v-if="selectedGroup"
      :disabled="isMobile ? false : true"
      class="focus:outline-none"
      @click="isMobile ? $emit('open-menu') : null"
    >
      {{ selectedGroup.name }}
      ({{
        selectedGroup.showcases.length
          ? selectedGroup.showcases.length > 1
            ? `${selectedGroup.showcases.length} showcases`
            : '1 showcase'
          : 'empty'
      }})
    </button>
  </div>
</template>

<script setup lang="ts">
import FolderIcon from '@/assets/icons/folder.svg'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg'

const { selectedList, selectedGroup } = useLists()
const { isMobile } = useUserAgent()

defineEmits(['open-menu'])
</script>
