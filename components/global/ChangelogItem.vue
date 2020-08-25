<template>
  <div class="flex flex-wrap mb-8">
    <div class="w-full md:w-1/4 pr-8">
      <time
        :datetime="dateToIso(date)"
        class="block w-full text-right mt-4 mb-4 font-bold-body-weight"
      >
        {{ formatDateByLocale(date) }}</time
      >
    </div>
    <div
      class="w-full md:w-3/4 rounded-xl border-2"
      :class="[projectColors.bg, projectColors.border]"
    >
      <div
        style="
          border-radius: 0.75rem;
          border-bottom-left-radius: 0;
          border-top-right-radius: 0;
        "
        class="inline-block py-2 px-4 mb-4 rounded-xl rounded-bl-none rounded-tr-none text-xs leading-xs uppercase font-bold-body-weight"
        :class="[projectColors.labelBg, projectColors.labelText]"
      >
        {{ project }}
      </div>

      <!-- <div class="px-4 flex flex-wrap">
        <div
          v-for="tag in tags.split(',')"
          :key="tag"
          :class="[tagColors(tag.trim()).border, tagColors(tag.trim()).text]"
          class="border mr-2 mb-1 py-1 px-3 rounded-full text-xs leading-xs capitalize font-bold-body-weight"
        >
          {{ tag }}
        </div>
      </div> -->

      <div class="-mt-4 px-4">
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
    // tags: {
    //   type: String,
    //   default: null,
    //   validator(values) {
    //     const v = values.split(',').map((i) => i.trim())
    //     return v.every((t) => ['feature', 'fix', 'improvements'].includes(t))
    //   }
    // }
  },
  computed: {
    projectColors() {
      if (this.project === 'website') {
        return {
          bg: 'bg-red-50',
          border: 'border-red-100',
          labelBg: 'bg-red-100',
          labelText: 'text-red-900'
        }
      } else if (this.project === 'extension') {
        return {
          bg: 'bg-green-50',
          border: 'border-green-100',
          labelBg: 'bg-green-100',
          labelText: 'text-green-900'
        }
      } else {
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-100',
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
    }
    // tagColors(tag) {
    //   if (tag === 'improvements') {
    //     return {
    //       bg: 'bg-green-400',
    //       border: 'border-green-300',
    //       text: 'text-green-500'
    //     }
    //   } else if (tag === 'fix') {
    //     return {
    //       bg: 'bg-red-400',
    //       border: 'border-red-300',
    //       text: 'text-red-500'
    //     }
    //   } else {
    //     return {
    //       bg: 'bg-grey-800',
    //       border: 'border-grey-500',
    //       text: 'text-grey-800'
    //     }
    //   }
    // }
  }
}
</script>

<style></style>
