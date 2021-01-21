<template>
  <div class="flex flex-col items-start">
    <ul ref="menu">
      <!-- <li class="py-2px">
        <button
          title="Share"
          class="bg-grey-50 border border-grey-200 rounded-md p-1"
        >
          <ShareIcon class="w-4 h-4" />
        </button>
      </li> -->
      <li class="py-2px">
        <button
          title="Rename"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-md p-1 has-hover:hover:scale-110 transform"
          @click="$emit('rename')"
        >
          <EditIcon class="w-4 h-4" />
        </button>
      </li>
      <li class="py-2px">
        <button
          v-if="deleting"
          title="Delete"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-md p-1 has-hover:hover:scale-110 transform text-red-500"
          @click="$emit('delete')"
        >
          <DeleteIcon class="w-4 h-4" />
        </button>
        <button
          v-else
          title="Confirm Delete"
          class="focus:outline-none w-8 h-8 flex items-center justify-center bg-grey-50 rounded-md p-1 has-hover:hover:scale-110 transform"
          @click="deleting = true"
        >
          <DeleteIcon class="w-4 h-4" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// import ShareIcon from '@/assets/icons/share.svg?inline'
import EditIcon from '@/assets/icons/edit.svg?inline'
import DeleteIcon from '@/assets/icons/trash.svg?inline'

export default {
  components: {
    // ShareIcon,
    EditIcon,
    DeleteIcon
  },
  data() {
    return {
      confirmedDeletion: false,
      deleting: false
    }
  },
  mounted() {
    this.$gsap.fromTo(
      this.$refs.menu.children,
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
  }
}
</script>

<style></style>
