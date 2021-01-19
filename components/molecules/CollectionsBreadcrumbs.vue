<template>
  <div class="flex items-center">
    <button
      v-if="selectedCollection"
      class="flex items-center focus:outline-none"
      @click="isMobile ? $emit('open-menu') : null"
    >
      <FolderIcon class="w-5 h-5 mr-2" />
      <span class="font-bold-body-weight">{{ selectedCollection.name }}</span>
    </button>
    <div v-if="selectedGroup">
      <ChevronRightIcon class="w-4 h-4 mx-1" />
    </div>
    <button
      v-if="selectedGroup"
      :disabled="isMobile ? false : true"
      @click="isMobile ? $emit('open-menu') : null"
      class="focus:outline-none"
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

<script>
import { mapState } from 'vuex'
import FolderIcon from '@/assets/icons/folder.svg?inline'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?inline'

export default {
  components: {
    FolderIcon,
    ChevronRightIcon
  },
  computed: {
    ...mapState({
      selectedCollection: (state) => state.collections.selectedCollection,
      selectedGroup: (state) => state.collections.selectedGroup,
      isMobile: (state) => state.isMobile
    })
  }
}
</script>
