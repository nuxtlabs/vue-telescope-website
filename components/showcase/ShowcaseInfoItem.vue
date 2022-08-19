<template>
  <component
    :is="tag"
    v-if="!label"
    class="mr-4 mb-4 bg-grey-50 has-hover:hover:bg-grey-100 rounded-lg"
  >
    <slot>
      <span class="block font-bold-body-weight px-4 py-2">
        {{ text }}
      </span>
    </slot>
  </component>

  <component
    :is="tag"
    v-else
    class="flex flex-col items-center w-full max-w-sm m-auto sm:m-0"
  >
    <div class="relative w-full h-full pt-0">
      <div
        :class="[tag === 'a' && 'has-hover:hover:bg-grey-100']"
        class="group flex flex-col items-center justify-between bg-grey-50 rounded-lg pb-2 w-full h-full"
      >
        <div
          :class="[tag === 'a' && 'has-hover:group-hover:bg-grey-300']"
          class="rounded -mt-2 ml-2 self-start bg-grey-100 text-grey-600 px-3 text-xs tracking-3 uppercase leading-sm font-bold-body-weight mb-2"
        >
          {{ label }}
        </div>
        <div class="flex items-center px-4 min-h-[2rem]">
          <img v-if="image" class="w-6 h-6 mr-2" :src="image">
          <div class="text-eight font-bold-body-weight leading-none truncate">
            {{ text }}
          </div>
        </div>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: 'div'
  },
  image: {
    type: String,
    default: ''
  }
})
</script>
