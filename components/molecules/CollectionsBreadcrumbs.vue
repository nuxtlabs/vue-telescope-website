<template>
  <div class="flex items-center">
    <div v-if="selectedCollection" class="flex items-center">
      <FolderIcon class="w-5 h-5 mr-2" />
      <span class="font-bold-body-weight">{{ selectedCollection.name }}</span>
    </div>
    <div v-if="selectedGroup">
      <ChevronRightIcon class="w-4 h-4 mx-1" />
    </div>
    <div v-if="selectedGroup">{{ selectedGroup.name }}</div>
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
      selectedGroup: (state) => state.collections.selectedGroup
    })
  }
}
</script>
