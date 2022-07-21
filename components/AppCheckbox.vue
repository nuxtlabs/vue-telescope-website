<template>
  <div
    :class="[checked && 'checked', isHovered && 'hovered']"
    class="inline-flex items-center overflow-hidden"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="relative">
      <input
        :id="id"
        class="absolute opacity-0 w-full h-full cursor-pointer"
        type="checkbox"
        :checked="checked"
        @change="$emit('input', checked)"
      >
      <div
        style="border-radius: 4px"
        :class="[isHovered ? 'border-grey-500' : 'border-grey-300']"
        class="shadow checkmark w-4 h-4 mr-2 p-3px pointer-events-none text-white border transition-colors duration-400"
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
      class="text-base leading-base font-bold-body-weight text-grey-800 cursor-pointer select-none truncate"
    >
      {{ label }}
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
  label: {
    type: String,
    default: 'Default label'
  },
  id: {
    type: String,
    default: 'Default label'
  }
})

defineEmits(['input'])

const isHovered = ref(false)

const checkmark = ref(null)

function animateCheckmark (value) {
  if (value) {
    $gsap.set(checkmark.value, {
      opacity: 1
    })
    $gsap.fromTo(
      checkmark.value,
      0.4,
      {
        drawSVG: '0%'
      },
      {
        drawSVG: '100%'
      }
    )
  } else {
    $gsap.fromTo(
      checkmark.value,
      0.4,
      {
        drawSVG: '0 100%'
      },
      {
        drawSVG: '100% 100%'
      }
    )
  }
}

watch(
  () => props.checked,
  (value) => {
    animateCheckmark(value)
  }
)

onMounted(() => {
  if (props.checked) {
    animateCheckmark(props.checked)
  }
})
</script>

<style scoped lang="postcss">
.checked .checkmark {
  background-color: theme('colors.primary.500');
  border-color: theme('colors.primary.500');
}
.hover .checkmark {
  border-color: theme('colors.primary.500');
}
</style>
