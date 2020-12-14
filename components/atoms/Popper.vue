<template>
  <div
    class="relative z-50"
    :class="[arrow && 'bg-white rounded-md border border-grey-400']"
  >
    <slot :popper-instance="popperInstance"></slot>

    <div v-if="arrow" ref="arrow" class="arrow w-4 h-4 relative">
      <div class="arrow-icon w-full h-full relative">
        <svg
          class="w-full absolute top-0 left-0 text-grey-400"
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

<script>
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

export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
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
      default: 'top',
      validator(value) {
        return placements.includes(value)
      }
    },
    arrow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popperInstance: null
    }
  },
  mounted() {
    console.log('this.offsetY', this.offsetY)
    this.popperInstance = createPopper(this.anchor, this.$el, {
      placement: this.placement,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [this.offsetY, this.offsetX]
          }
        },
        this.arrow
          ? {
              name: 'arrow',
              options: {
                element: this.$refs.arrow
              }
            }
          : {}
      ]
    })
    // console.log('popperInstance', this.popperInstance)
  }
}
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
