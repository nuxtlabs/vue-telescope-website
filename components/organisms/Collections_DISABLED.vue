<template>
  <div class="flex flex-wrap sm:flex-no-wrap space-y-4 sm:space-y-0">
    <section class="w-full sm:w-1/4 px-2 py-2 sm:py-4 space-y-2">
      <CollectionsList
        v-for="collection in collections"
        :key="collection.id"
        :selected="
          selectedCollection && selectedCollection.id === collection.id
        "
        :collection="collection"
        :selected-group="
          collection.groups.find(
            (group) => selectedGroup && group.id === selectedGroup.id
          )
        "
        :collections-selection="collectionsSelection"
        @group-selected="onGroupSelected"
        @collection-selected="onCollectionSelected"
      />
      <CollectionsList
        :collections-selection="collectionsSelection"
        @collection-selected="onCollectionSelected"
      />
    </section>
    <section class="w-full sm:w-3/4">
      <div class="flex items-center ml-4 mb-1 font-body-weight text-sm">
        <AnimatedNumber
          class="font-bold-body-weight text-md"
          :to="showcases.length"
          :from="0"
        />
        <span v-if="selectedCollection && selectedGroup"
          >&nbsp;websites on
          <span
            class="hover:underline cursor-pointer"
            @click="selectedGroup = null"
            >{{ selectedCollection.name }}</span
          >
          &gt; {{ selectedGroup.name }}</span
        >
        <span v-else-if="selectedCollection"
          >&nbsp;websites found on {{ selectedCollection.name }}</span
        >
        <span v-else>&nbsp;websites on all collections</span>
      </div>
      <div class="flex flex-wrap">
        <ShowcaseCard
          v-for="showcase in showcases"
          :key="showcase.id"
          :showcase="showcase"
          class="w-full sm:w-1/2 md:w-1/3 mb-4"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCollection: null,
      selectedGroup: null
    }
  },
  computed: {
    collections() {
      return this.$store.state.collections.collections
    },
    showcases() {
      return this.collections
        .filter(
          (collection) =>
            !this.selectedCollection ||
            collection.id === this.selectedCollection.id
        )
        .flatMap((collection) => collection.groups)
        .filter(
          (group) => !this.selectedGroup || group.id === this.selectedGroup.id
        )
        .flatMap((group) => group.showcases)
        .filter((showcase, index, self) => {
          return (
            showcase &&
            index === self.findIndex((obj) => obj.id === showcase.id)
          )
        })
    },
    collectionsSelection() {
      return {
        collectionId: this.selectedCollection?.id,
        groupId: this.selectedGroup?.id
      }
    }
  },
  watch: {
    collections() {
      if (
        this.selectedCollection &&
        !this.collections.find(
          (collection) =>
            collection && collection.id === this.selectedCollection.id
        )
      ) {
        this.selectedCollection = null
      }
    }
  },
  methods: {
    onCollectionSelected(collection) {
      this.selectedCollection =
        !this.selectedGroup &&
        collection &&
        this.selectedCollection &&
        collection.id === this.selectedCollection.id
          ? null
          : collection
      this.selectedGroup = null
    },
    onGroupSelected(group) {
      this.selectedGroup =
        group && this.selectedGroup && group.id === this.selectedGroup.id
          ? null
          : group
    }
  }
}
</script>

<style></style>
