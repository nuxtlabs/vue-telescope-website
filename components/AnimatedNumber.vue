<template>
  <span>{{ tweenedCount }}</span>
</template>

<script setup lang="ts">
import { animate } from 'motion'

const props = defineProps({
  to: {
    type: Number,
    default: 0
  },
  from: {
    type: Number,
    default: 0
  }
})

const tweenedCount = useState('tweenedCount', () => 0)

onMounted(() => {
  watch(() => props.to, (value) => {
    animate(
      (progress) => {
        tweenedCount.value = Math.round(progress * value)
      },
      { duration: 0.5, easing: 'ease-out' }
    )
  }, { immediate: true })
})

</script>
