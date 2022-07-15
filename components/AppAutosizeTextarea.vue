<template>
  <textarea
    ref="textarea"
    class="block resize-none overflow-hidden w-full bg-grey-100 focus:outline-none"
    :rows="rows"
    :value="modelValue"
    :placeholder="placeholder"
    @input="emit('update:modelValue', $event.target.value)"
    @keypress.enter.prevent="emit('submit')"
  ></textarea>
</template>

<script setup lang="ts">
import toPx from 'to-px'

const textarea = ref(null)

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
  calculateInputHeight(textarea.value)
})

watch(
  () => props.modelValue,
  () =>
    nextTick(() => {
      calculateInputHeight(textarea.value)
    })
)

onMounted(() => {
  setTimeout(() => {
    textarea.value.focus()
  }, 16)
})

function calculateInputHeight(el) {
  if (!el) return
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
