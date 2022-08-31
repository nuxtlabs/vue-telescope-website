<template>
  <button
    class="group flex items-center focus:outline-none w-10 shadow rounded-full transition-colors duration-200 h-4"
    aria-label=""
    :class="[value ? 'bg-primary-500' : 'bg-grey-50 ']"
    @click="processSelection"
  >
    <span
      class="flex w-5 h-5 bg-white rounded-full shadow border transition duration-200"
      :class="[
        value
          ? ' transform translate-x-full border-primary-500'
          : 'border-grey-200 has-hover:group-hover:border-grey-600'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['input'])

function processSelection () {
  emit('input', !props.value)
}
</script>
