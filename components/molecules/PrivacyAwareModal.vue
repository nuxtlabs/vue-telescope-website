<template>
  <div class="modal-wrapper">
    <div class="w-full h-full py-8 px-4" @click.self="makeChoice(false)">
      <div
        ref="modal-wrapper"
        class="flex flex-col pointer-events-auto h-full relative bg-white m-auto max-w-readable-line-length md:mt-4 rounded-xl overflow-auto md:overflow-hidden overflow-x-hidden"
      >
        <h2 class="text-five leading-five font-display-weight p-4 text-center">
          We Respect Your Privacy
        </h2>
        <div class="p-4 overflow-auto">
          <p class="mb-4">
            Hello, fellow Vue.js developer 👋
          </p>
          <p class="mb-4">
            We started Vue Telemetry project with one goal in mind: provide
            developers the best tool to explore Vue.js ecosystem for
            inspiration, research or analysis.
          </p>
          <p class="mb-4">
            To complete this we need community help and your permission 🙌
          </p>
          <h3 class="text-seven leading-seven font-display-weight mb-1">
            Why we need a permission?
          </h3>
          <p class="mb-4">
            When using Vue Telemetry extension or website we will save websites
            that were analyzed in our database.
          </p>
          <h3 class="text-seven leading-seven font-display-weight mb-1">
            What data is collected?
          </h3>
          <p class="mb-4">
            We only collect websites you visiting.
            <strong>
              This data is completely anonymous, no user ID, system, IP data is
              submitted.
            </strong>
          </p>
          <h3 class="text-seven leading-seven font-display-weight mb-1">
            When is data collected?
          </h3>
          <p class="mb-4">
            Websites are saved when you use Vue Telemetry extension
            (specifically, when you click on extension button). Website will
            also be saved into database if you use Lookup feature on Vue
            Telemetry website.
          </p>
          <h3 class="text-seven leading-seven font-display-weight mb-1">
            What will the collected data be used for?
          </h3>
          <p class="mb-4">
            The only way the collected data will be used for is to showcase such
            websites in Explore section of Vue Telemetry website.
          </p>
          <p class="mb-4">
            We are greatly appreciate your support by using our website and
            extension. Let us remind you, that
            <a
              href="https://github.com/nuxt-company/vue-telemetry-analyzer"
              class="text-primary-500 hover:underline"
              rel="noopener nofollow noreferrer"
              target="_blank"
              >Vue Telemetry analyzer</a
            >
            and
            <a
              href="https://github.com/nuxt-company/vue-telemetry-extensions"
              class="text-primary-500 hover:underline"
              rel="noopener nofollow noreferrer"
              target="_blank"
              >Vue Telemetry extension</a
            >
            is open source, so you are free to explore it and participate in
            it's development. You can also read our
            <NuxtLink
              to="/privacy"
              class="text-primary-500 hover:underline"
              @click.native="
                (e) => {
                  e.preventDefault()
                  makeChoice(false)
                  $router.push('privacy')
                }
              "
            >
              Privacy Policy</NuxtLink
            >.
          </p>
          <p></p>
          <p>
            By clicking Agree & Proceed button you agree with our
            <NuxtLink
              to="/terms"
              class="text-primary-500 hover:underline"
              @click.native="
                (e) => {
                  e.preventDefault()
                  makeChoice(false)
                  $router.push('terms')
                }
              "
            >
              Terms</NuxtLink
            >.
          </p>
        </div>
        <div class="p-4 flex justify-end">
          <AppButton appearance="transparent" @click.native="makeChoice(false)">
            Nope
          </AppButton>
          <AppButton appearance="primary" @click.native="makeChoice(true)">
            Agree & Proceed
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      privacyAwarenessCb: (state) => state.privacyAwarenessCb,
      isModal: (state) => state.isModal
    })
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.makeChoice(false)
      }
    }
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      document.addEventListener('keydown', escapeHandler)
      this.$once('hook:destroyed', () => {
        // eslint-disable-next-line nuxt/no-globals-in-created
        document.removeEventListener('keydown', escapeHandler)
      })
    }
  },
  mounted() {
    if (!this.isModal) {
      document.body.style.overflow = 'hidden'
    }
    this.$gsap.fromTo(
      this.$refs['modal-wrapper'],
      {
        scale: 1.2,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.inOut'
      }
    )
  },
  beforeDestroy() {
    if (!this.isModal) {
      document.body.style.overflow = null
    }
  },
  methods: {
    async makeChoice(choice) {
      if (choice) {
        // if user agrees on Terms
        localStorage.setItem('privacyAware', true)
        this.$store.commit('setShowPrivacyAwareModal', false)
        await this.privacyAwarenessCb()
        this.$store.commit('setPrivacyAwarenessCb', null)
      } else {
        // if not
        localStorage.setItem('privacyAware', false)
        this.$store.commit('setShowPrivacyAwareModal', false)
      }
    }
  }
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.42); */
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  backdrop-filter: blur(18px);
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
