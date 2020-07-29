<template>
  <div class="">
    <TheHeader />
    <main class="mt-16">
      <nuxt />
    </main>
    <TheFooter />
    <button
      data-feedback-fish
      class="fixed bottom-0 right-0 m-4 bg-primary-500 text-white font-bold-body-weight px-6 py-2 rounded-full focus:outline-none"
      @click="why"
    >
      Send Feedback
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    why() {
      console.log('work')
    }
  }
}
</script>
