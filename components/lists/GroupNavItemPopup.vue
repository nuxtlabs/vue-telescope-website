<template>
  <div class="flex flex-col items-start">
    <ul ref="menuRef">
      <!-- <li class="py-2px">
        <button
          title="Share"
          class="bg-grey-50 border border-grey-200 rounded-lg p-1"
        >
          <ShareIcon class="w-4 h-4" />
        </button>
      </li> -->
      <li v-if="up" class="py-2px">
        <button
          title="Move up"
          class="flex items-center justify-center w-8 h-8 p-1 transform rotate-180 rounded-lg focus:outline-none bg-grey-50 has-hover:hover:scale-110"
          @click="emit('up')"
        >
          <DownIcon class="w-3 h-3" />
        </button>
      </li>
      <li v-if="down" class="py-2px">
        <button
          title="Move down"
          class="flex items-center justify-center w-8 h-8 p-1 transform rounded-lg focus:outline-none bg-grey-50 has-hover:hover:scale-110"
          @click="emit('down')"
        >
          <DownIcon class="w-3 h-3" />
        </button>
      </li>
      <li class="py-2px">
        <button
          title="Rename"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-lg p-1 has-hover:hover:scale-110 transform"
          @click="emit('rename')"
        >
          <EditIcon class="w-4 h-4" />
        </button>
      </li>
      <li class="py-2px">
        <button
          v-if="deleting"
          title="Delete"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-lg p-1 has-hover:hover:scale-110 transform text-red-500"
          @click="emit('delete')"
        >
          <DeleteIcon class="w-4 h-4" />
        </button>
        <button
          v-else
          title="Confirm Delete"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-lg p-1 has-hover:hover:scale-110 transform"
          @click="deleting = true"
        >
          <DeleteIcon class="w-4 h-4" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { timeline, stagger } from 'motion'
// import ShareIcon from '@/assets/icons/share.svg'
import EditIcon from '@/assets/icons/edit.svg'
import DeleteIcon from '@/assets/icons/trash.svg'
import DownIcon from '@/assets/icons/arrow-down.svg'

const menuRef = ref(null)

const emit = defineEmits(['rename', 'delete', 'up', 'down'])

defineProps({
  up: {
    type: Boolean,
    default: false
  },
  down: {
    type: Boolean,
    default: false
  }
})

const deleting = ref(false)

onMounted(() => {
  timeline([
    [menuRef.value?.children, { opacity: 0, scale: 0.8, x: -5 }, { duration: 0 }],
    // TODO: spring does not work
    [menuRef.value?.children, { opacity: 1, scale: 1, x: 0 }, { duration: 0.3, delay: stagger(0.05), easing: [0.16, 1, 0.3, 1] }]
  ])
})
</script>
