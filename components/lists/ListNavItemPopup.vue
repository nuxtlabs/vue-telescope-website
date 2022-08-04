<template>
  <div class="flex flex-col items-start">
    <ul ref="menuEl">
      <li class="py-2px">
        <button
          title="Share"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-md p-1 has-hover:hover:scale-110 transform transition-transform duration-150"
          @click="$emit('share')"
        >
          <ShareIcon class="w-4 h-4" />
        </button>
      </li>
      <li class="py-2px">
        <button
          title="Rename"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-md p-1 has-hover:hover:scale-110 transform transition-transform duration-150"
          @click="$emit('rename')"
        >
          <EditIcon class="w-4 h-4" />
        </button>
      </li>
      <li class="py-2px">
        <button
          v-if="deleting"
          title="Delete"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-md p-1 has-hover:hover:scale-110 transform transition-transform duration-150 text-red-500"
          @click="$emit('delete')"
        >
          <DeleteIcon class="w-4 h-4" />
        </button>
        <button
          v-else
          title="Confirm Delete"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-md p-1 has-hover:hover:scale-110 transform transition-transform duration-150"
          @click="deleting = true"
        >
          <DeleteIcon class="w-4 h-4" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ShareIcon from '@/assets/icons/share.svg'
import EditIcon from '@/assets/icons/edit.svg'
import DeleteIcon from '@/assets/icons/trash.svg'

defineEmits(['share', 'rename', 'delete'])

const { $gsap } = useNuxtApp()

const deleting = ref(false)

const menuEl = ref(null)

onMounted(() => {
  $gsap.fromTo(
    menuEl.value?.children,
    {
      opacity: 0,
      scale: 0.8,
      x: -5
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: 'elastic.out(1.5, 0.5)'
    }
  )
})
</script>
