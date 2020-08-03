<template>
  <div
    :class="[checked && 'checked', isHovered && 'hovered']"
    class="inline-flex items-center overflow-hidden cursor-pointer"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
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
        class="radiomark-wrapper w-5 h-5 mr-2 p-5px pointer-events-none text-white rounded-full border transition-colors duration-200 delay-300"
        :class="[
          checked ? 'bg-primary-500 border-primary-500 ' : 'border-grey-300'
        ]"
      >
        <svg
          class="w-full h-auto overflow-visible"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref="radiomark"
            d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z"
            stroke="currentColor"
            stroke-width="3"
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
  data() {
    return {
      isHovered: false
    }
  },
  watch: {
    checked(value) {
      this.animateRadiomark(value)
      if (!value) {
        this.$refs.radiomark.classList.remove('text-primary-500')
      }
    }
  },
  mounted() {
    if (this.checked) {
      this.animateRadiomark(this.checked)
    }
  },
  methods: {
    animateRadiomark(value) {
      if (value) {
        this.$refs.radiomark.classList.add('text-primary-500')
        this.$gsap.fromTo(
          this.$refs.radiomark,
          0.3,
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
