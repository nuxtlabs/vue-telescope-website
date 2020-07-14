<template>
  <div
    :class="[checked && 'checked']"
    class="inline-flex items-center overflow-hidden"
  >
    <div class="relative">
      <input
        :id="id"
        class="absolute opacity-0 w-full h-full cursor-pointer"
        type="checkbox"
        :checked="checked"
        @change="$emit('input', checked)"
      />
      <div
        class="checkmark w-5 h-5 mr-2 p-3px pointer-events-none text-white rounded-md border-2 border-grey-400 transition-colors duration-300"
      >
        <svg
          class="w-full h-full"
          viewBox="0 0 16 13"
          xmlns="http://www.w3.org/2000/svg"
          fill="transparent"
        >
          <path
            ref="checkmark"
            class="opacity-0"
            d="M1 7L5 11L15 1"
            stroke="currentColor"
            stroke-width="2.75"
          />
        </svg>
      </div>
    </div>
    <label
      :for="id"
      class="text-base leading-base font-bold-body-weight text-grey-800 cursor-pointer select-none"
    >
      {{ label }}
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
    label: {
      type: String,
      default: 'Default label'
    },
    id: {
      type: String,
      default: 'Default label'
    }
  },
  watch: {
    checked(value) {
      this.animateCheckmark(value)
    }
  },
  methods: {
    animateCheckmark(value) {
      if (value) {
        this.$gsap.set(this.$refs.checkmark, {
          opacity: 1
        })
        this.$gsap.fromTo(
          this.$refs.checkmark,
          0.25,
          {
            drawSVG: '0%'
          },
          {
            drawSVG: '100%'
          }
        )
      } else {
        this.$gsap.fromTo(
          this.$refs.checkmark,
          0.25,
          {
            drawSVG: '0 100%'
          },
          {
            drawSVG: '100% 100%'
          }
        )
      }
    }
  }
}
</script>

<style scoped>
.checked .checkmark {
  background-color: theme('colors.primary.500');
  border-color: theme('colors.primary.500');
}
.hover .checkmark {
  border-color: theme('colors.primary.500');
}
</style>
