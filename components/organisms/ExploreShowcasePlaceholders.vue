<template>
  <div
    class="max-w-readable-line-length xl:max-w-container-max-width m-auto mt-10"
  >
    <ContentPlaceholders rounded :animated="false">
      <div class="flex flex-col">
        <ContentPlaceholdersText class="custom h-3 w-32 mb-2" :lines="1" />
        <ContentPlaceholdersText
          class="custom h-8 w-2/3 xl:w-1/3 mb-4"
          :lines="1"
        />
        <ContentPlaceholdersText
          class="custom h-4 w-full xl:w-2/3 mb-5"
          :lines="1"
        />
      </div>
      <div class="flex flex-wrap">
        <div class="w-full xl:w-1/2 mb-4">
          <ContentPlaceholdersText
            class="custom relative h-full w-full rounded-xl overflow-hidden"
            :lines="1"
            style="padding-bottom: 75%"
          />
        </div>

        <div class="opacity-0 xl:opacity-100 w-full xl:w-1/2 pl-10">
          <ContentPlaceholdersText class="custom h-6 w-32 mb-4" :lines="1" />
          <div class="flex flex-wrap mb-10">
            <ContentPlaceholdersText
              v-for="i in 6"
              :key="i"
              class="custom h-20 w-1/3 pr-5 pb-2"
              :lines="1"
            />
          </div>
          <ContentPlaceholdersText class="custom h-6 w-32 mb-4" :lines="1" />
          <div class="flex flex-wrap mb-10">
            <ContentPlaceholdersText
              v-for="i in 4"
              :key="i"
              class="custom h-12 w-24 pr-5 pb-2"
              :lines="1"
            />
          </div>
          <ContentPlaceholdersText class="custom h-6 w-32 mb-4" :lines="1" />
          <div class="flex flex-wrap mb-10">
            <ContentPlaceholdersText
              v-for="i in 6"
              :key="i"
              class="custom h-12 w-28 pr-5 pb-2"
              :lines="1"
            />
          </div>
        </div>
      </div>
    </ContentPlaceholders>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
