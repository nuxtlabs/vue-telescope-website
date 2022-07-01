<template>
  <div class="flex flex-wrap mb-8">
    <div class="w-full md:w-1/4 md:pr-8">
      <time
        :datetime="dateToIso(date)"
        class="block w-full text-center md:text-right text-grey-900 mb-4 font-bold-body-weight"
      >
        {{ formatDateByLocale(date) }}</time
      >
    </div>
    <div class="w-full md:w-3/4 rounded-lg" :class="[projectColors.bg]">
      <div
        class="inline-block py-1 px-2 m-5 rounded-md text-xs uppercase font-bold-body-weight"
        :class="[projectColors.labelBg, projectColors.labelText]"
      >
        {{ project }}
      </div>
      <div class="-mt-4 px-6" :class="project">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangelogItem',
  props: {
    project: {
      type: String,
      default: null,
      validator(value) {
        return ['website', 'extension', 'analyzer'].includes(value)
      }
    },
    date: {
      type: String,
      default: null
    }
  },
  computed: {
    projectColors() {
      if (this.project === 'website') {
        return {
          bg: 'bg-blue-50',
          // border: 'border-blue-100',
          labelBg: 'bg-blue-100',
          labelText: 'text-blue-800'
        }
      } else if (this.project === 'extension') {
        return {
          bg: 'bg-green-50',
          // border: 'border-green-200',
          labelBg: 'bg-green-200',
          labelText: 'text-green-800'
        }
      } else {
        return {
          bg: 'bg-yellow-50',
          // border: 'border-yellow-200',
          labelBg: 'bg-yellow-200',
          labelText: 'text-yellow-800'
        }
      }
    }
  },
  methods: {
    formatDateByLocale(d) {
      const currentLocale = 'en'
      const options = { year: 'numeric', month: 'long', day: 'numeric' }

      return new Date(d).toLocaleDateString(currentLocale, options)
    },
    dateToIso(date) {
      return new Date(date).toISOString()
    }
  }
}
</script>

<style scoped>
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