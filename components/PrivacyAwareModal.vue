<template>
  <div class="modal-wrapper fixed top-0 left-0 w-full h-full z-[1000]">
    <div class="w-full h-full pb-4 md:pb-8 pt-12 px-4" @click.self="makeChoice(false)">
      <div
        ref="modalWrapperRef"
        class="flex flex-col pointer-events-auto h-full relative bg-white m-auto max-w-readable rounded-xl overflow-auto md:overflow-hidden overflow-x-hidden"
      >
        <h2 class="text-five leading-five font-display-weight p-4 text-center">
          We Respect Your Privacy
        </h2>
        <div class="flex-1 p-4 overflow-auto">
          <p class="mb-4">
            Hello, fellow Vue.js developer 👋
          </p>
          <p class="mb-4">
            We started Vue Telescope project with one goal in mind: provide
            developers the best tool to explore Vue.js ecosystem for
            inspiration, research or analysis.
          </p>
          <p class="mb-4">
            To complete this we need community help and your permission.
          </p>
          <h3 class="text-seven leading-seven font-display-weight mb-1">
            Why we need a permission?
          </h3>
          <p class="mb-4">
            When using Vue Telescope extension or website we could save websites
            that were analyzed in our database. Saved website becomes public in
            listing only after you agree to submit it (by clicking the Lookup
            button on website or Save button in extension)
          </p>
          <h3 class="text-seven leading-seven font-display-weight mb-1">
            What data is collected?
          </h3>
          <p class="mb-4">
            We only collect website url's.
            <strong>
              This data is completely anonymous, no user ID, system, IP data is
              submitted.
            </strong>
          </p>
          <h3 class="text-seven leading-seven font-display-weight mb-1">
            When is data collected?
          </h3>
          <p class="mb-4">
            Websites are saved when you use Vue Telescope extension. Website
            will also be saved into database if you use Lookup feature on Vue
            Telescope website. Those websites will not appear publicly in
            Explore section listing until you click Submit button fron extension
            or website
          </p>
          <h3 class="text-seven leading-seven font-display-weight mb-1">
            What will the collected data be used for?
          </h3>
          <p class="mb-4">
            The only way the collected data will be used for is to showcase such
            websites in Explore section of Vue Telescope website.
          </p>
          <p class="mb-4">
            We are greatly appreciate your support by using our website and
            extension. Let us remind you, that
            <a
              href="https://github.com/nuxt-company/vue-telescope-analyzer"
              class="text-primary-500 has-hover:hover:underline"
              rel="noopener nofollow noreferrer"
              target="_blank"
            >Vue Telescope analyzer</a>
            and
            <a
              href="https://github.com/nuxt-company/vue-telescope-extensions"
              class="text-primary-500 has-hover:hover:underline"
              rel="noopener nofollow noreferrer"
              target="_blank"
            >Vue Telescope extension</a>
            is open source, so you are free to explore it and participate in
            it's development. You can also read our
            <NuxtLink
              to="/privacy"
              class="text-primary-500 has-hover:hover:underline"
              @click.native="
                (e) => {
                  e.preventDefault()
                  makeChoice(false)
                  $router.push('privacy')
                }
              "
            >
              Privacy Policy
            </NuxtLink>.
          </p>
          <p />
          <p>
            By clicking Agree & Proceed button you agree with our
            <NuxtLink
              to="/terms"
              class="text-primary-500 has-hover:hover:underline"
              @click.native="
                (e) => {
                  e.preventDefault()
                  makeChoice(false)
                  $router.push('terms')
                }
              "
            >
              Terms
            </NuxtLink>.
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

<script setup lang="ts">
import { timeline } from 'motion'

const { privacyAwarenessCb, setPrivacyAwarenessCb } = usePrivacyAwareness()
const { isModal } = useModal()

const modalWrapperRef = ref(null)

useEsc(() => makeChoice(false))

onMounted(() => {
  if (!isModal.value) {
    document.body.style.overflow = 'hidden'
    // TODO: bug?
    // setModal(true)
  }
  timeline([
    [modalWrapperRef.value, { scale: 1.2, opacity: 0 }, { duration: 0 }],
    [modalWrapperRef.value, { scale: 1, opacity: 1 }, { duration: 0.5, easing: 'ease-in-out' }]
  ])
})

onBeforeUnmount(() => {
  if (!isModal.value) {
    document.body.style.overflow = null
    // TODO: bug?
    // setModal(false)
  }
})

async function makeChoice (choice) {
  if (choice) {
    // if user agrees on Terms
    localStorage.setItem('privacyAware', 'true')
    await privacyAwarenessCb.value()
    setPrivacyAwarenessCb(null)
  } else {
    // if not
    localStorage.setItem('privacyAware', 'false')
    setPrivacyAwarenessCb(null)
  }
}
</script>

<style scoped>
.modal-wrapper {
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: var(--scrim-filter);
}
</style>
