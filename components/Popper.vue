<template>
  <div
    ref="el"
    class="relative z-[100]"
    :class="[arrow && 'bg-white rounded-md border border-grey-300']"
  >
    <slot :popper-instance="popperInstance"></slot>

    <div v-if="arrow" ref="arrowEl" class="arrow w-4 h-4 relative">
      <div class="arrow-icon w-full h-full relative">
        <svg
          class="w-full absolute top-0 left-0 text-grey-300"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L9 11L17 1" stroke="currentColor" fill="white" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from '#imports'
import { createPopper } from '@popperjs/core'

const placements = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end'
]

const props = defineProps({
  anchor: {
    default: null
  },
  offsetX: {
    type: Number,
    default: 16
  },
  offsetY: {
    type: Number,
    default: 0
  },
  placement: {
    type: String,
    default: 'top'
    // TODO
    // validator(value) {
    //   return placements.includes(value)
    // }
  },
  arrow: {
    type: Boolean,
    default: false
  }
})

const popperInstance = ref(null)

// refs
const el = ref(null)
const arrowEl = ref(null)

onMounted(() => {
  popperInstance.value = createPopper(props.anchor, el.value, {
    placement: props.placement,
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [props.offsetY, props.offsetX]
        }
      },
      props.arrow
        ? {
            name: 'arrow',
            options: {
              element: arrowEl.value
            }
          }
        : false
    ].filter(Boolean)
  })
})
</script>

<style scoped lang="postcss">
[data-popper-placement^='top'] .arrow {
  bottom: -15px;
  width: 1rem;
  height: 1rem;
  & .arrow-icon {
    /* display: block; */
  }
}
[data-popper-placement^='bottom'] .arrow {
  top: -15px;
  width: 1rem;
  height: 1rem;
  & .arrow-icon {
    transform: rotate(180deg);
  }
}
[data-popper-placement^='right'] .arrow {
  left: -15px;
  & .arrow-icon {
    transform: rotate(90deg);
  }
}
[data-popper-placement^='left'] .arrow {
  right: -15px;
  & .arrow-icon {
    transform: rotate(-90deg);
  }
}
</style>
