<template>
  <div class="flex flex-col min-h-screen">
    <TheNavbar />
    <div class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nuxt />
      </div>
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
    TheFooter,
  },
}
</script>

<style></style>
