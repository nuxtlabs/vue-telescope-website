<template>
  <header class="h-16 fixed top-0 left-0 w-full z-50 overflow-hidden">
    <MagicHeader
      v-for="({ appearance, trigger }, i) in [
        { appearance: 'white', trigger: '#hero' },
        { appearance: 'emerald', trigger: '#welcome' },
        { appearance: 'black', trigger: '#featured' }
      ]"
      :key="appearance + i"
      :index="-Math.abs(i)"
      :appearance="appearance"
      :trigger="trigger"
    />
    <!-- <div class="magic absolute top-0 left-0 z-20 overflow-hidden w-full h-full bg-white flex items-center px-4">
      <MagicLogo class="h-12" appearance="white" />
    </div>
    <div class="magic absolute top-0 left-0 z-10 overflow-hidden w-full h-full bg-emerald flex items-center px-4">
      <MagicLogo class="h-12" appearance="emerald" />
    </div>
    <div class="magic absolute top-0 left-0 z-0 overflow-hidden w-full h-full bg-black flex items-center px-4">
      <MagicLogo class="h-12" appearance="black" />
    </div> -->
  </header>
</template>

<script>
export default {}
</script>

<style></style>
