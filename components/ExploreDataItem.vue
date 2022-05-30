<template>
  <component
    :is="tag"
    v-if="!label"
    class="mr-4 mb-4 bg-grey-50 has-hover:hover:bg-grey-100 border border-grey-100 rounded-xl"
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
    class="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 px-1 pb-2 max-w-sm m-auto sm:m-0"
  >
    <div class="relative w-full h-full pt-0">
      <div
        :class="[tag === 'a' && 'has-hover:hover:bg-grey-100']"
        class="group flex flex-col items-center justify-between bg-grey-50 rounded-lg pb-2 w-full h-full border border-grey-100 has-hover:hover:border-grey-200 transition-colors duration-200"
      >
        <div
          style="
            border-radius: 0.5rem;
            border-bottom-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0.5rem;
          "
          :class="[tag === 'a' && 'has-hover:group-hover:bg-grey-300']"
          class="self-start bg-grey-100 opacity-50 px-3 text-xs tracking-3 uppercase leading-sm font-bold-body-weight mb-2 transition-colors duration-200"
        >
          {{ label }}
        </div>
        <div class="flex items-center px-4">
          <img v-if="image" class="w-6 h-6 mr-2" :src="image" alt />
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
