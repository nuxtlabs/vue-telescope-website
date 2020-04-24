<template>
  <div class="antialiased relative flex flex-col min-h-screen">
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
