<template>
  <div class="h-full flex justify-center items-center">
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
