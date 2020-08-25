<template>
  <div class="flex flex-wrap mb-8">
    <div class="w-full md:w-1/4 pr-8">
      <time
        :datetime="dateToIso(date)"
        class="block w-full text-right mt-8 mb-4"
      >
        {{ formatDateByLocale(date) }}</time
      >
    </div>
    <div class="w-full md:w-3/4 p-8 rounded-xl" :class="[projectColors.bg]">
      <div
        class="inline-block py-2 px-4 rounded-xl text-xs leading-xs uppercase font-bold-body-weight mb-4"
        :class="[projectColors.labelBg, projectColors.labelText]"
      >
        {{ project }}
      </div>
      <div class="tags flex flex-wrap">
        <div
          v-for="tag in tags.split(',')"
          :key="tag"
          :class="[tagColors(tag.trim()).bg, tagColors(tag.trim()).text]"
          class="tag mr-2 mb-1 py-1 px-4 rounded-full text-xs leading-xs capitalize"
        >
          {{ tag }}
        </div>
      </div>
      <slot />
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
    },
    tags: {
      type: String,
      default: null,
      validator(values) {
        const v = values.split(',').map((i) => i.trim())
        return v.every((t) => ['feature', 'fix', 'improvements'].includes(t))
      }
    }
  },
  computed: {
    projectColors() {
      if (this.project === 'website') {
        return {
          bg: 'bg-red-50',
          labelBg: 'bg-red-100',
          labelText: 'text-red-900'
        }
      } else if (this.project === 'extension') {
        return {
          bg: 'bg-green-50',
          labelBg: 'bg-green-100',
          labelText: 'text-green-900'
        }
      } else {
        return {
          bg: 'bg-yellow-50',
          labelBg: 'bg-yellow-100',
          labelText: 'text-yellow-900'
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
      const d = new Date(date)
      return d.toISOString()
    },
    tagColors(tag) {
      console.log(tag)
      if (tag === 'improvements') {
        return {
          bg: 'bg-green-400',
          text: 'text-white'
        }
      } else if (tag === 'fix') {
        return {
          bg: 'bg-red-400',
          text: 'text-white'
        }
      } else {
        return {
          bg: 'bg-grey-800',
          text: 'text-white'
        }
      }
    }
  }
}
</script>

<style></style>
