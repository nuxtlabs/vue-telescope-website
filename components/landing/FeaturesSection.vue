<template>
  <section ref="featuresRef" class="py-24">
    <FeatureTabs />
  </section>
</template>

<script setup lang="ts">
import { animate, scroll } from 'motion'
const featuresRef = ref(null)

onMounted(() => {
  scroll(animate(featuresRef.value, { opacity: [0, 1], y: [-50, 0], scale: [0.9, 1], filter: ['blur(20px)', 'blur(0px)'] }), {
    target: featuresRef.value,
    offset: ['0% 100%', '50% 100%']
  })
})
</script>
