<template>
  <div class>
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
      <legend
        class="text-base leading-4 font-bold text-nuxt-lightgreen"
      >
        {{ name }}
      </legend>
      <div v-for="(el, i) in items" :key="`${type}-${i}`" class="mt-3">
        <div class="flex items-start">
          <div class="absolute flex items-center h-5">
            <input
              :id="el.slug"
              v-model="checkedItems"
              type="checkbox"
              :value="el.slug"
              class="form-checkbox h-4 w-4 text-nuxt-lightgreen focus:shadow-outline-green cursor-pointer transition duration-150 ease-in-out"
              @change="handleCheckedItems"
            />
          </div>
          <label :for="el.slug" class="pl-7 text-sm leading-5 flex flex-row items-center cursor-pointer hover:text-nuxt-lightgreen transition ease-in-out duration-150">
            <img
              v-if="el.img_path"
              :src="iconUrl(el.img_path)"
              :alt="el.name"
              class="w-4 h-4 mr-2"
            />
            <span
              class="font-medium text-nuxt-gray select-none"
            >{{ el.name }}</span>
          </label>
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
        return ['frameworks', 'uis', 'plugins'].includes(value)
      }
    },
    name: {
      type: String,
      required: true
    }
  },
  async fetch () {
    const { data } = await this.$hasura({
      query: `
        query {
          ${this.type.toLowerCase()}(order_by: { name: asc } ) {
            slug
            name,
            img_path
          }
        }
      `
    })

    this.items = data ? data[this.type] : []
  },
  data () {
    return {
      checkedItems: [],
      items: []
    }
  },
  methods: {
    handleCheckedItems () {
      this.$emit('checkedItems', this.checkedItems)
    },
    iconUrl (path) {
      return `${process.env.ICONS_URL}${path}`
    }
  }
}
</script>

<style></style>
