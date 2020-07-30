<template>
  <button
    data-feedback-fish
    class="fixed bottom-0 right-0 z-50 m-4 bg-primary-500 text-white font-bold-body-weight px-6 py-2 rounded-full focus:outline-none"
  >
    Send Feedback
  </button>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          src: 'https://feedback.fish/ff.js?pid=dd580ca404b5b7',
          defer: true
        }
      ]
    }
  }
}
</script>

<style></style>
