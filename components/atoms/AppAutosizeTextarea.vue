<template>
  <textarea
    ref="textarea"
    class="block resize-none overflow-hidden w-full bg-grey-100 rounded-md focus:outline-none"
    :rows="rows"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @keypress.enter.prevent="$emit('submit')"
  ></textarea>
</template>

<script>
import toPx from 'to-px'

export default {
  props: {
    value: {
      type: String,
      default: null
    },
    rows: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.$nextTick(() => {
      this.$nextTick(() => {
        this.calculateInputHeight(this.$refs.textarea)
      })
    })
    this.$watch('value', () =>
      this.$nextTick(this.calculateInputHeight(this.$refs.textarea))
    )
  },
  methods: {
    calculateInputHeight(el) {
      console.log('CALCULATE')
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
        this.rows * parseFloat(lineHeight) * (paddingTop + paddingBottom)
      el.style.height =
        Math.max(minHeight, height) +
        (borderTopWidth + borderBottomWidth) +
        'px'
    }
  }
}
</script>

<style></style>
