<template>
  <component
    :is="tag"
    v-if="!label"
    class="mr-4 mb-4 bg-grey-50 hover:bg-grey-100 border border-grey-100 rounded-xl"
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
        :class="[tag === 'a' && 'hover:bg-grey-100']"
        class="flex flex-col items-center justify-between bg-grey-50 rounded-lg pb-2 w-full h-full border border-grey-100"
      >
        <div
          style="
            border-radius: 0.5rem;
            border-bottom-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0.5rem;
          "
          class="self-start bg-grey-100 opacity-50 px-3 text-xs tracking-3 uppercase leading-sm font-bold-body-weight mb-2"
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

<script>
export default {
  props: {
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
  }
}
</script>

<style></style>
