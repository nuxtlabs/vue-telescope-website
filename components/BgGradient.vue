<template>
  <div class="gradient-container" :class="klass">
    <div class="top">
      <div class="line light"></div>
      <div class="line dark"></div>
    </div>
    <div class="bottom">
      <div class="line light"></div>
      <div class="line dark"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BgGradient',
  props: {
    klass: {
      type: String,
      default: '',
      validator(str) {
        return ['hero', 'featured', 'explain'].includes(str)
      }
    }
  }
}
</script>

<style scoped>
.gradient-container {
  background-image: radial-gradient(circle at 70% 70%, #fff, #41b38a);
  position: absolute;
  z-index: -999;
  width: 100%;
}
.top,
.bottom {
  display: none;
}
.line {
  position: absolute;
  height: 1px;
  width: 100%;
  background-image: linear-gradient(217deg, #fff 30%, #41b38a);
}
.dark {
  opacity: 0.8;
}
.light {
  opacity: 0.1;
}
/* hero section */
.hero {
  height: 1000px;
  top: -480px;
  transform: skewY(6deg);
  background-image: radial-gradient(circle at 10% 45%, #fff, #41b38a);
}
.hero .bottom {
  display: block;
}
.hero .bottom .dark {
  transform: rotate(181.5deg);
  bottom: -20px;
}
.hero .bottom .light {
  transform: rotate(180deg);
  bottom: -10px;
}
/* featured section */
.featured {
  top: -14px;
  left: 0;
  width: 100%;
  height: 100%;
  transform: skewY(6deg);
  background-image: none;
}
.featured .top,
.featured .bottom {
  display: block;
}
.featured .top .dark {
  transform: rotate(2.6deg);
  top: -40px;
}
.featured .top .light {
  transform: rotate(1deg);
  top: 1px;
  opacity: 0.4;
}
.featured .bottom .dark {
  transform: rotate(184deg);
  bottom: -42px;
}
.featured .bottom .light {
  transform: rotate(181deg);
  bottom: -1px;
  opacity: 0.4;
}
/* explain section */
.explain {
  top: -200px;
  height: 1090px;
  transform: skewY(11deg);
  background-image: radial-gradient(
    circle at 70% 70%,
    #fff,
    rgba(65, 179, 138, 0.15)
  );
}
</style>
