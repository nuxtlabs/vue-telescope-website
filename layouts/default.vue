<template>
  <div class="antialiased relative">
    <!-- <TheNavbar /> -->
    <!-- <div class="flex-1"> -->
      <nuxt />
    <!-- </div> -->
    <!-- <TheFooter /> -->
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600&display=swap');
body {
  font-family: 'Exo 2', sans-serif;
}
</style>
