<template>
  <span>{{ animatedNumber }}</span>
</template>

<script setup lang="ts">
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

const { $gsap } = useNuxtApp()

const tweenedCount = ref(0)

const animatedNumber = computed(() => tweenedCount.value.toFixed(0))

onMounted(() => {
  watch(() => props.to, (newValue) => {
    $gsap.to(tweenedCount, { duration: 0.5, value: newValue })
  }, { immediate: true })
})
</script>
