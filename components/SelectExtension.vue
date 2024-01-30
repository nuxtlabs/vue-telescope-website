
<script lang="ts" setup>
interface Extension {
  label: string,
  icon: string,
  href: string
}

const extensions = [
  { label: 'Chrome Extension', icon: 'i-simple-icons-googlechrome', href: 'https://chrome.google.com/webstore/detail/vue-telescope/neaebjphlfplgdhedjdhcnpjkndddbpd' },
  { label: 'Firefox Extension', icon: 'i-simple-icons-firefox', href: 'https://addons.mozilla.org/en-GB/firefox/addon/vue-telescope/' },
] as Extension[]

const selected = ref(extensions[0])

const onChange = async (value: Extension) => {
  await navigateTo(value.href, {
  open: {
    target: '_blank'
  }
})
}
</script>

<template>
  <USelectMenu v-model="selected" :options="extensions" size="lg" class="w-60" :selected-icon="''" @change="onChange">
    <UButton color="gray"
      class="justify-between flex-1 bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent"
      :icon="selected.href" :leading-icon="selected.icon" size="lg">
      <span class="w-full ml-2 text-left">{{ selected.label }}</span>

      <div class="absolute flex items-center h-full p-2 border-l border-gray-700 end-0">
        <UIcon name="i-ph-caret-down-light" class="w-5 h-5 text-gray-400 transition-transform dark:text-gray-500" />
      </div>
    </UButton>
  </USelectMenu>
</template>
