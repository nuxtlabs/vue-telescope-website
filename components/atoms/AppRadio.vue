<template>
  <div
    :class="[checked && 'checked']"
    class="inline-flex items-center overflow-hidden cursor-pointer"
  >
    <div class="relative">
      <input
        :id="id"
        class="absolute opacity-0 w-full h-full cursor-pointer"
        type="radio"
        :checked="checked"
        @change="$emit('input', checked)"
      />
      <div
        ref="radiomark-wrapper"
        class="radiomark-wrapper w-5 h-5 mr-2 p-5px pointer-events-none text-white rounded-full border-2 transition-colors duration-500"
        :class="[
          checked ? 'bg-primary-500 border-primary-500' : 'border-grey-700'
        ]"
      >
        <svg
          class="w-full h-auto overflow-visible"
          :class="[checked && 'text-primary-500']"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref="radiomark"
            d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z"
            stroke="currentColor"
            stroke-width="2"
            fill="white"
          />
        </svg>
      </div>
    </div>

    <label
      :for="id"
      class="text-base leading-base font-bold-body-weight text-grey-800 cursor-pointer select-none"
    >
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'Default label'
    }
  },
  watch: {
    checked(value) {
      this.animateRadiomark(value)
    }
  },
  methods: {
    animateRadiomark(value) {
      if (value) {
        this.$gsap.fromTo(
          this.$refs.radiomark,
          0.25,
          {
            drawSVG: '0%'
          },
          {
            drawSVG: '100%'
          }
        )
      }
    }
  }
}
</script>

<style></style>
