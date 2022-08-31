<template>
  <AppButton
    ref="buttonRef"
    class="group w-auto sm:w-1/3 flex items-center justify-center"
    @click.native="lazyLoadShowcases"
  >
    <div
      :class="[!pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0']"
      class="transition duration-200 transform ease-in-out"
    >
      Load More
    </div>
    <div
      :class="[pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0']"
      class="absolute transition duration-200 transform ease-in-out"
    >
      <AppLoader
        class="w-6 h-6"
        background="text-grey-100 has-hover:group-hover:text-grey-300 transition-colors duration-200"
        path="text-grey-400"
      />
    </div>
  </AppButton>
</template>

<script setup lang="ts">
defineProps({
  pending: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update'])
const buttonRef = ref(null)

function lazyLoadShowcases () {
  buttonRef.value?.$el.blur()
  emit('update') // this.currentPage++
}
</script>
