<template>
  <textarea
    ref="textAreaRef"
    class="block resize-none overflow-hidden w-full bg-grey-100 focus:outline-none"
    :rows="rows"
    :value="modelValue"
    :placeholder="placeholder"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    @keypress.enter.prevent="emit('submit')"
  />
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import toPx from 'to-px'

const textAreaRef = ref(null) as Ref<HTMLTextAreaElement>

const emit = defineEmits(['update:modelValue', 'submit'])

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  rows: {
    type: Number,
    default: 1
  },
  placeholder: {
    type: String,
    default: null
  }
})

nextTick(() => {
  calculateInputHeight(textAreaRef.value)
})

watch(
  () => props.modelValue,
  () =>
    nextTick(() => {
      calculateInputHeight(textAreaRef.value)
    })
)

onMounted(() => {
  setTimeout(() => {
    textAreaRef.value?.focus()
  }, 16)
})

function calculateInputHeight (el: HTMLTextAreaElement) {
  if (!el) { return }
  const styles = window.getComputedStyle(el)
  // const fontSize = toPx(styles.fontSize)
  const paddingTop = toPx(styles.paddingTop)
  const paddingBottom = toPx(styles.paddingBottom)
  const borderTopWidth = toPx(styles.borderTopWidth)
  const borderBottomWidth = toPx(styles.borderBottomWidth)
  const lineHeight = toPx(styles.lineHeight)

  el.style.height = '0'
  const height = el.scrollHeight
  const minHeight =
    props.rows * parseFloat(lineHeight) + (paddingTop + paddingBottom)
  el.style.height =
    Math.max(minHeight, height) + (borderTopWidth + borderBottomWidth) + 'px'
}
</script>
