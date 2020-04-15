<template>
  <div class="relative flex flex-col min-h-screen">
    <div
      v-show="$route.name === 'index'"
      class="absolute top-0 left-0 right-0"
      :style="{ backgroundImage: `url('img/background.png')` }"
      style="background-repeat: no-repeat; height: 855px; z-index: -1;"
    ></div>
    <TheNavbar />
    <div class="flex-1">
      <nuxt />
    </div>
    <TheFooter />
  </div>
</template>
<script>
import TheNavbar from '@/components/TheNavbar'
import TheFooter from '@/components/TheFooter'
export default {
  components: {
    TheNavbar,
    TheFooter
  }
}
</script>

<style></style>
