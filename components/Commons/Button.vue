<template>
  <a href="#" class="inline-block ml-2 text-base leading-6 font-medium rounded-full focus:outline-none hover:shadow transition ease-in-out duration-150" :class="colors[color]">
    <span class="flex items-center justify-center h-12 px-6">
      <slot/>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'emerald'
    }
  },
  computed: {
    colors () {
      return {
        white: 'bg-emerald text-black hover:bg-emerald-700',
        emerald: 'bg-emerald text-black',
        black: 'bg-black text-white'
      }
    }
  }
}
</script>
