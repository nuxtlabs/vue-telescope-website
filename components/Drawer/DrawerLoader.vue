<template>
  <div class="flex justify-center items-center w-full h-full">
    <lottie :options="animationFile" class="w-80" />
  </div>
</template>

<script>
import lottie from '@/components/Lottie'
import animationSearch from '@/assets/animations/search.json'

export default {
  name: 'Loader',
  components: {
    lottie
  },
  data () {
    return {
      animationFile: {
        animationData: animationSearch
      }
    }
  }
}
</script>
