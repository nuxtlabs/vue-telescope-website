<template>
  <div class="overlay" :class="fadeAnimationClass" @click.self="close">
    <div class="panel" :class="slideAnimationClass" :style="customStyle">
      <div class="navigation">
        <div class="button" @click="close">X</div>
      </div>
      <div class="body">
        <div class="content">
          <slot></slot>
        </div>
      </div>
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
        width: this.panelWidth + 'px'
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
    close() {
      //
    }
  }
}
</script>

<style scoped>
.overlay {
  bottom: 0px;
  left: 0px;
  pointer-events: initial;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 1000;
  background-color: rgba(9, 30, 66, 0.5);
}
.fade-in {
  animation: fade-in 200ms;
}
.fade-out {
  animation: fade-out 440ms;
}
.slide-out {
  animation: slide-out 220ms;
}
.slide-in {
  animation: slide-in 220ms;
}
.panel {
  background-color: #fff;
  display: flex;
  height: 100vh;
  right: 0px;
  position: fixed;
  top: 0px;
  z-index: 1001;
  overflow: hidden;
}
.button {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-bottom: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 100ms ease-in;
}
.button:hover {
  background-color: rgba(9, 30, 66, 0.08);
}
.navigation {
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  color: rgb(66, 82, 110);
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 16px;
  padding-top: 24px;
  width: 64px;
}
.body {
  margin-top: 24px;
  flex: 1 1 0%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow-y: scroll;
  padding: 0 36px 0 0;
}
.footer {
  margin: 24px 0;
}
@keyframes slide-in {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
}
@keyframes slide-out {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
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
