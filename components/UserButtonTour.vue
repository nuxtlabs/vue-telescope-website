<template>
  <div class="fixed top-0 left-0 z-50 w-full h-full">
    <transition name="fade" appear>
      <div
        class="absolute top-0 left-0 w-full h-full"
        style="
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: var(--scrim-filter);
      "
      />
    </transition>

    <div
      id="tour-main-header"
      class="h-16 fixed body-lock-hack top-0 left-0 w-full min-w-body"
    >
      <div
        class="w-full h-full flex justify-end items-center max-w-container m-auto px-4"
      >
        <button
          ref="buttonRef"
          aria-label="Login with GitHub"
          class="rounded-full overflow-hidden focus:outline-none"
        >
          <svg
            class="w-8 h-8"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="#F5F7F6" />
            <rect x="2" y="11" width="2" height="6" fill="#0BDCA0" />
            <rect x="4" y="9" width="2" height="4" fill="#0BDCA0" />
            <rect x="6" y="9" width="2" height="8" fill="#0BDCA0" />
            <rect x="16" y="9" width="2" height="8" fill="#0BDCA0" />
            <rect x="12" y="9" width="2" height="6" fill="#0BDCA0" />
            <rect x="10" y="9" width="2" height="6" fill="#0BDCA0" />
            <rect
              width="2"
              height="4"
              transform="matrix(1 0 0 -1 8 15)"
              fill="#0BDCA0"
            />
            <rect
              width="3"
              height="2"
              transform="matrix(1 0 0 -1 8 19)"
              fill="#0BDCA0"
            />
            <rect
              width="3"
              height="2"
              transform="matrix(1 0 0 -1 13 19)"
              fill="#0BDCA0"
            />
            <rect
              width="2"
              height="4"
              transform="matrix(1 0 0 -1 14 15)"
              fill="#0BDCA0"
            />
            <rect x="6" y="7" width="12" height="2" fill="#0BDCA0" />
            <rect x="8" y="5" width="2" height="2" fill="#0BDCA0" />
            <rect x="14" y="5" width="2" height="2" fill="#0BDCA0" />
            <rect x="16" y="3" width="2" height="2" fill="#0BDCA0" />
            <rect x="6" y="3" width="2" height="2" fill="#0BDCA0" />
            <rect x="18" y="9" width="2" height="4" fill="#0BDCA0" />
            <rect x="20" y="11" width="2" height="6" fill="#0BDCA0" />
          </svg>
        </button>

        <Popper
          v-if="showTooltip"
          arrow
          :offset-y="12"
          placement="bottom-end"
          :anchor="buttonRef"
        >
          <div class="p-4">
            <div class="mb-4 font-bold-body-weight">
              Save websites to your own Lists.
            </div>
            <div class="flex items-center justify-end">
              <button
                aria-label="Not interested button"
                class="mr-4 text-sm leading-sm"
                @click="featureSeenHandler"
              >
                Not interested
              </button>
              <GithubLoginButton size="small" redirect="/lists" />
            </div>
          </div>
        </Popper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const showTooltip = ref(false)

const buttonRef = ref(null)

const { bodyLock, bodyUnlock } = useBodyLock()

onMounted(() => {
  bodyLock()
  setTimeout(() => {
    showTooltip.value = true
  }, 200)
})

function closeTour () {
  bodyUnlock()
  setTimeout(() => {
    emit('close')
  }, 16)
}

function featureSeenHandler () {
  window.localStorage.setItem('listsFeatureSeen', 'true')
  closeTour()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
