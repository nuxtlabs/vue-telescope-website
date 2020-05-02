<template>
  <div
    class="rounded-lg bg-white flex justify-center items-center self-center w-full h-full"
  >
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <lottie-player
      src="https://assets8.lottiefiles.com/packages/lf20_N1ffOJ.json"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px;"
      loop
      autoplay
    ></lottie-player>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    loaderWidth: {
      type: String,
      default: '600'
    }
  }
}
</script>
