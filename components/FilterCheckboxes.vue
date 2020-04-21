<template>
  <div>
    <div v-if="$fetchState.pending">
      <content-loader width="190" height="160" :speed="2">
        <rect x="0" y="0" rx="2" ry="2" width="120" height="16" />
        <template v-for="i in 4">
          <rect
            :key="`checkbox-${i}`"
            x="28"
            :y="34 * i"
            rx="2"
            ry="2"
            width="75"
            height="16"
          />
          <rect
            :key="`label-${i}`"
            x="0"
            :y="34 * i"
            rx="2"
            ry="2"
            width="16"
            height="16"
          />
        </template>
      </content-loader>
    </div>
    <fieldset v-else>
      <legend class="text-sm leading-4 font-medium text-gray-900 uppercase">
        {{ type }}
      </legend>
      <div v-for="(el, i) in items" :key="`${type}-${i}`" class="mt-4">
        <div class="flex items-start">
          <div class="absolute flex items-center h-5">
            <input
              :id="el.slug"
              v-model="checkedItems"
              type="checkbox"
              :value="el.slug"
              class="form-checkbox h-4 w-4 text-green-400 cursor-pointer transition duration-150 ease-in-out"
              @change="handleCheckedItems"
            />
          </div>
          <div class="pl-7 text-sm leading-5 flex flex-1">
            <label
              :for="el.slug"
              class="font-medium text-gray-700 flex-1 cursor-pointer select-none capitalize"
              >{{ el.name }}</label
            >
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => {
        return ['frameworks', 'uis'].includes(value)
      }
    }
  },
  async fetch() {
    const res = await this.$hasura.post('', {
      query: `
        query {
          ${this.type} {
            slug
            name
          }
        }
      `
    })
    const { data } = await res.json()
    this.items = data[this.type]
  },
  data() {
    return {
      checkedItems: [],
      items: []
    }
  },
  methods: {
    handleCheckedItems() {
      this.$emit('checkedItems', this.checkedItems)
    }
  }
}
</script>

<style></style>
