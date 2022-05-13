<template>
  <div class="lookup-input-molecule relative flex">
    <div
      v-if="errorMessage"
      class="absolute bottom-0 left-0 text-orange-500 text-sm leading-sm -mb-6 ml-2 truncate font-bold-body-weight w-full"
    >
      {{ errorMessage }}
    </div>
    <span
      class="absolute top-0 left-0 h-full flex items-center pl-4 font-bold-body-weight text-grey-400"
      :class="[protocolTextSize]"
      @click="$refs.input.$el.focus()"
    >
      https://
    </span>
    <label class="">
      <span class="absolute opacity-0 pointer-events-none">Lookup</span>
      <AppInput
        ref="input"
        type="url"
        :size="size"
        class="rounded-r-none border-r-0"
        :class="[protocolPadding]"
        :value="url"
        label="Lookup"
        @update:modelValue="formatUrlInput"
        @keypress.enter.native="processAnalyzeWebsite"
      />
    </label>
    <!-- <AppButton
      :size="size"
      appearance="info"
      :class="pending && 'pointer-events-none'"
      class="flex items-center justify-center rounded-l-none border-l-0"
      @click.native="processAnalyzeWebsite"
    >
      <div
        :class="[!pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0']"
        class="transition duration-200 transform ease-in-out"
      >
        Lookup
      </div>
      <div
        :class="[pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0']"
        class="absolute transition duration-200 transform ease-in-out"
      >
        <AppLoader
          class="w-6 h-6"
          background="text-blue-400"
          path="text-blue-200"
        />
      </div>
    </AppButton> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, useNuxtApp } from '#imports'
const EventSourcePolyfill = () => import('event-source-polyfill')

const { $config } = useNuxtApp()

const props = defineProps({
  size: {
    type: String,
    default: 'large'
  }
})

const url = ref('')
const errorMessage = ref('')
const pending = ref(false)

const protocolTextSize = computed(() => {
  if (props.size.value === 'large') {
    return 'text-eight'
  } else if (props.size.value === 'small') {
    return 'text-sm'
  } else {
    return 'text-base'
  }
})

const protocolPadding = computed(() => {
  if (props.size.value === 'large') {
    return 'pl-20'
  } else if (props.size.value === 'small') {
    return 'pl-16'
  } else {
    return 'pl-18'
  }
})

function formatUrlInput(u) {
  console.log('formatUrlInput', u)
  if (!u) return
  url.value = u.includes('://') ? u.split('://')[1] : u
  errorMessage.value = ''
  const parsedURL = new URL('https://' + url.value)
  if (parsedURL.pathname !== '/') {
    errorMessage.value = `Only top-level domains are analyzed: ${parsedURL.origin}`
  }
}

const processAnalyzeWebsite = async () => {
  // const aware = await this.$store.dispatch(
  //   'PROCESS_PRIVACY_AWARENESS',
  //   analyzeWebsite
  // )
  // if (!aware) {
  //   return
  // }
  analyzeWebsite()
}
const analyzeWebsite = async () => {
  if (!window.EventSource) {
    window.EventSource = (await EventSourcePolyfill()).EventSourcePolyfill
  }
  if (!window.EventSource) {
    errorMessage.value = 'EventSource is not supported in your browser :('
    return
  }
  pending.value = true
  const sse = new EventSource(
    `${$config.serviceURL}?url=${url.value}&isPublic=true`
  )
  sse.addEventListener('message', (event) => {
    pending.value = false
    try {
      const res = JSON.parse(event.data)

      if (!res.error && !res.isAdultContent) {
        // this.$store.commit('SET_MODAL', true)
        // this.$router.push({
        //   name: 'explore-website',
        //   params: {
        //     website: res.slug
        //   }
        // })
      } else if (!res.error && res.isAdultContent) {
        errorMessage.value = 'Website has adult content ;)'
      } else {
        errorMessage.value = res.message
      }
      sse.close()
    } catch (err) {
      pending.value = false
      sse.close()
    }
  })
}
</script>
