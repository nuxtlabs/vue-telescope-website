<template>
  <div class="flex flex-col items-start">
    <ul ref="menu">
      <li class="p-2px">
        <button
          title="Share"
          class="bg-grey-50 border border-grey-200 rounded-md p-1 hover:scale-110 transform transition-transform duration-150"
        >
          <ShareIcon class="w-4 h-4" />
        </button>
      </li>
      <li class="p-2px">
        <button
          title="Rename"
          class="bg-grey-50 border border-grey-100 rounded-md p-1 hover:scale-110 transform transition-transform duration-150"
          @click="$emit('rename')"
        >
          <EditIcon class="w-4 h-4" />
        </button>
      </li>
      <li class="p-2px">
        <button
          title="Delete"
          class="bg-grey-50 border border-grey-100 rounded-md p-1 hover:scale-110 transform transition-transform duration-150"
          @click="$emit('delete')"
        >
          <DeleteIcon class="w-4 h-4" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import ShareIcon from '@/assets/icons/share.svg?inline'
import EditIcon from '@/assets/icons/edit.svg?inline'
import DeleteIcon from '@/assets/icons/trash.svg?inline'

export default {
  components: {
    ShareIcon,
    EditIcon,
    DeleteIcon
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
        stagger: 0.05,
        duration: 0.6,
        ease: 'elastic.out(1.5, 0.5)'
      }
    )
  }
}
</script>

<style></style>
