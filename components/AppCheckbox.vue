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
        class="checkmark w-4 h-4 mr-2 p-3px pointer-events-none text-white border transition-colors duration-400"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <path
            ref="checkmarkRef"
            d="M10 108.558L77.6243 170.215L190 29"
            pathLength="1"
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
import { animate } from 'motion'

const draw = progress => ({
  // This property makes the line "draw" in when animated
  strokeDashoffset: 1 - progress,
  // Each line will be hidden until it starts drawing
  // to fix a bug in Safari where the line can be
  // partially visible even when progress is at 0
  visibility: 'visible'
})

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

const checkmarkRef = ref(null)

function animateCheckmark (value: boolean) {
  if (value) {
    animate(
      checkmarkRef.value,
      draw(1), { duration: 0.4 }
    )
  } else {
    animate(
      checkmarkRef.value,
      draw(0), { duration: 0.4 }
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

svg path {
  fill: transparent;
  stroke: white;
  stroke-width: 30px;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  visibility: hidden;
}

</style>
