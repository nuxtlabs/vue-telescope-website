<template>
  <div class="flex flex-wrap mt-5">
    <div
      v-for="showcasePlaceholder in isMobile ? 3 : showcasesPerPage"
      :key="showcasePlaceholder"
      class="w-full sm:w-1/2 md:w-1/3 mb-16 px-5"
    >
      <ContentPlaceholders rounded :animated="false">
        <ContentPlaceholdersText
          class="custom relative h-full w-full mb-4 rounded-lg overflow-hidden"
          :lines="1"
          style="padding-bottom: 75%"
        />
        <div class="flex justify-between">
          <ContentPlaceholdersText class="custom h-4 w-2/3" :lines="1" />
          <div class="flex">
            <ContentPlaceholdersText
              class="custom rounded-full overflow-hidden h-4 w-4 mr-1"
              :lines="1"
            />
            <ContentPlaceholdersText
              class="custom rounded-full overflow-hidden h-4 w-4"
              :lines="1"
            />
          </div>
        </div>
      </ContentPlaceholders>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    showcasesPerPage: {
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.isMobile
    })
  }
}
</script>
