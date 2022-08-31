<template>
  <FloatingViewModal :fetched="true" compact @close="$emit('close')">
    <div class="space-y-6 p-8">
      <h1 class="text-seven leading-seven font-display-weight">
        {{ `Share "${list.name}" List` }}
      </h1>
      <div>
        <span>Endpoint to request:</span>
        <AppInput
          ref="endpointRef"
          :value="listUrl"
          class="mt-2 cursor-pointer"
          readonly
          @click.native="selectRequest"
        />
      </div>
      <div>
        <span>Usage:</span>
        <pre
          class="flex overflow-auto cursor-pointer bg-grey-200 rounded-2lg p-4 text-sm leading-sm mt-2 focus:outline-none focus:border-grey-300 border-2 border-transparent"
        >
          <code>{{ code }}</code>
        </pre>
      </div>

      <p>Feel free to use Vue Telescope data anywhere in your own app.</p>
    </div>
  </FloatingViewModal>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { List } from '~/types'

const config = useRuntimeConfig().public

defineEmits(['close'])

const endpointRef = ref(null)

const props = defineProps({
  list: {
    type: Object as PropType<List>,
    default: null
  }
})

const listUrl = computed(() => {
  return `${config.strapiURL}/lists/${props.list.id}`
})

const code = computed(() => {
  return `await fetch('${listUrl.value}').then(response => response.json())`
})

function selectRequest () {
  const el = endpointRef.value?.$el
  selectText(el)
}

function selectText (el: HTMLElement) {
  const range = document.createRange()
  range.selectNode(el)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)
}
</script>
