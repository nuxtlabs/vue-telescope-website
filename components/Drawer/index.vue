<template>
  <div
    class="fixed inset-0 z-40 pointer-events-auto w-30"
    :class="fadeAnimationClass"
    style="background-color: rgba(0, 0, 0, 0.5);"
    @click.self="close"
  >
    <div
      class="fixed top-0 right-0 bottom-0 overflow-hidden z-50 w-full bg-white m-4 rounded-lg"
      :class="slideAnimationClass"
      :style="customStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    panelWidth: {
      type: String,
      default: '600'
    }
  },
  data() {
    return {
      slideAnimationClass: 'slide-in',
      fadeAnimationClass: 'fade-in'
    }
  },
  computed: {
    customStyle() {
      return {
        'max-width': this.panelWidth + 'px'
      }
    }
  },
  methods: {
    // eslint-disable-next-line require-await
    async setClosingAnimationClasses() {
      const self = this
      return new Promise(function (resolve, reject) {
        self.slideAnimationClass = 'slide-out'
        self.fadeAnimationClass = 'fade-out'
        resolve()
      })
    },
    async close() {
      await this.setClosingAnimationClasses().then((_) => {
        setTimeout(() => {
          this.$emit('close')
        }, 200)
      })
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'overflow-hidden'
      }
    }
  }
}
</script>

<style>
.fade-in {
  animation: fade-in 400ms;
}
.fade-out {
  animation: fade-out 440ms;
}
.slide-out {
  animation: slide-out 420ms;
}
.slide-in {
  animation: slide-in 420ms;
}
@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes slide-out {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
