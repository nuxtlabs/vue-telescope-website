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
        ref="radiomarkWrapperEl"
        class="relative shadow radiomark-wrapper w-4 h-4 mr-2 pointer-events-none text-white rounded-full overflow-hidden border transition-colors duration-200"
        :class="[
          checked ? 'border-primary-500 ' : 'border-grey-300',
          isHovered && !checked && 'border-grey-500'
        ]"
      >
        <div
          ref="colorMarkEl"
          class="absolute top-0 left-0 w-full h-full rounded-full"
          :class="[checked ? 'bg-primary-500 ' : 'bg-grey-300']"
        ></div>
        <div
          ref="whiteMarkEl"
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

<script setup lang="ts">
const { $gsap } = useNuxtApp()

const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: 'Default label'
  }
})

defineEmits(['input'])

const isHovered = ref(false)

const radiomarkWrapperEl = ref(null)
const colorMarkEl = ref(null)
const whiteMarkEl = ref(null)

function animateRadiomark(value) {
  if (value) {
    $gsap.fromTo(
      whiteMarkEl.value,
      {
        scale: 1
      },
      {
        scale: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          $gsap.fromTo(
            colorMarkEl.value,
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
    $gsap.to(colorMarkEl.value, 0.2, {
      scale: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        $gsap.to(whiteMarkEl.value, 0.2, {
          scale: 1,
          ease: 'power2.inOut'
        })
      }
    })
  }
}

watch(
  () => props.checked,
  (value) => {
    animateRadiomark(value)
  }
)

onMounted(() => {
  if (props.checked) {
    animateRadiomark(props.checked)
  }
})
</script>
