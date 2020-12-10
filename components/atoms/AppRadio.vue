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
        class="relative radiomark-wrapper w-5 h-5 mr-2 pointer-events-none text-white rounded-full overflow-hidden border transition-colors duration-200"
        :class="[
          checked ? 'border-primary-500 ' : 'border-grey-300',
          isHovered && !checked && 'border-grey-500'
        ]"
      >
        <div
          ref="color-mark"
          class="absolute top-0 left-0 w-full h-full rounded-full"
          :class="[checked ? 'bg-primary-500 ' : 'bg-grey-300']"
        ></div>
        <div
          ref="white-mark"
          class="absolute top-0 left-0 bg-white w-full h-full rounded-full"
        ></div>
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
        this.$gsap.fromTo(
          this.$refs['white-mark'],
          {
            scale: 1
          },
          {
            scale: 0,
            duration: 0.2,
            ease: 'power2.inOut',
            onComplete: () => {
              this.$gsap.fromTo(
                this.$refs['color-mark'],
                {
                  scale: 1
                },
                {
                  scale: 0.5,
                  // delay: 0.1,
                  duration: 0.2,
                  ease: 'expo.inOut'
                }
              )
            }
          }
        )
      } else {
        this.$gsap.to(this.$refs['color-mark'], 0.2, {
          scale: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            this.$gsap.to(this.$refs['white-mark'], 0.2, {
              scale: 1,
              ease: 'power2.inOut'
            })
          }
        })
      }
    }
  }
}
</script>

<style></style>
