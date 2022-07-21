<template>
  <div class="flex flex-col items-start">
    <ul ref="menuEl">
      <!-- <li class="py-2px">
        <button
          title="Share"
          class="bg-grey-50 border border-grey-200 rounded-lg p-1"
        >
          <ShareIcon class="w-4 h-4" />
        </button>
      </li> -->
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
      <li v-if="up" class="py-2px">
        <button
          title="Move up"
          class="flex items-center justify-center w-8 h-8 p-1 transform rotate-180 rounded-lg focus:outline-none bg-grey-50 has-hover:hover:scale-110"
          @click="emit('up')"
        >
          <DownIcon class="w-4 h-4" />
        </button>
      </li>
      <li v-if="down" class="py-2px">
        <button
          title="Move down"
          class="flex items-center justify-center w-8 h-8 p-1 transform rounded-lg focus:outline-none bg-grey-50 has-hover:hover:scale-110"
          @click="emit('down')"
        >
          <DownIcon class="w-4 h-4" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// import ShareIcon from '@/assets/icons/share.svg'
import EditIcon from '@/assets/icons/edit.svg'
import DeleteIcon from '@/assets/icons/trash.svg'
import DownIcon from '@/assets/icons/arrow-down.svg'

const { $gsap } = useNuxtApp()

const menuEl = ref(null)

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
  $gsap.fromTo(
    menuEl.value.children,
    {
      opacity: 0,
      scale: 0.8,
      x: -5
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      stagger: 0.075,
      duration: 0.5,
      ease: 'elastic.out(1.5, 0.5)'
    }
  )
})
</script>
