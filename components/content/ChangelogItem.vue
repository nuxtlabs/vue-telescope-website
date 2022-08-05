<template>
  <div class="flex flex-wrap mb-8">
    <div class="w-full md:w-1/4 md:pr-8">
      <time
        :datetime="dateToIso(date)"
        class="block w-full text-center md:text-right text-grey-900 mb-4 font-bold-body-weight"
      >
        {{ formatDateByLocale(date) }}</time>
    </div>
    <div class="w-full md:w-3/4 rounded-lg" :class="[projectColors.bg]">
      <div
        class="inline-block py-1 px-2 m-5 rounded-md text-xs uppercase font-bold-body-weight border"
        :class="[projectColors.border, projectColors.labelText]"
      >
        {{ project }}
      </div>
      <div class="-mt-4 px-6" :class="project">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  project: {
    type: String,
    default: null,
    validator (value: string) {
      return ['website', 'extension', 'analyzer'].includes(value)
    }
  },
  date: {
    type: String,
    default: null
  }
})

const projectColors = computed(() => {
  if (props.project === 'website') {
    return {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      // labelBg: 'bg-blue-100',
      labelText: 'text-blue-500'
    }
  } else if (props.project === 'extension') {
    return {
      bg: 'bg-green-50',
      border: 'border-green-200',
      // labelBg: 'bg-green-200',
      labelText: 'text-green-700'
    }
  } else {
    return {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      // labelBg: 'bg-yellow-200',
      labelText: 'text-yellow-700'
    }
  }
})

function formatDateByLocale (date: string) {
  const currentLocale = 'en'
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

  return new Date(date).toLocaleDateString(currentLocale, options)
}

function dateToIso (date: string) {
  return new Date(date).toISOString()
}
</script>

<style scoped lang="postcss">
.website a {
  @apply text-blue-600;
}
.extension a {
  @apply text-green-600;
}
.analyzer a {
  @apply text-orange-500;
}
</style>
