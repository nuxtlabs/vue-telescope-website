<template>
  <div class="max-w-container-max-width px-4 mx-auto py-12">
    <div class="flex">
      <div v-if="lists.length" class="w-1/4 px-4 py-2">
        <List
          v-for="list in lists"
          :key="list.id"
          :selected="selectedList.id === list.id"
          :list="list"
          @group-selected="onGroupSelected"
          @list-selected="onListSelected"
        />
        <List />
      </div>
      <div v-if="selectedList" class="w-3/4 flex flex-wrap ml-4">
        <ExploreShowcasesCard
          v-for="showcase in showcases"
          :key="showcase.id"
          :showcase="showcase"
          class="w-full sm:w-1/2 md:w-1/3 mb-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  fetchOnServer: false,
  async fetch() {
    try {
      const lists = await this.$strapi.find('lists')
      this.$store.commit('setLists', lists)
      this.selectedList = lists[0]
    } catch (e) {}
  },
  data() {
    return {
      selectedList: null,
      selectedGroup: null
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists
    },
    showcases() {
      return this.selectedGroup
        ? this.selectedList.groups.find(
            (group) => group.id === this.selectedGroup.id
          )?.showcases
        : this.selectedList.groups
            .flatMap((group) => group.showcases)
            .filter((showcase, index, self) => {
              return (
                showcase &&
                index === self.findIndex((obj) => obj.id === showcase.id)
              )
            })
    }
  },
  methods: {
    onListSelected(list) {
      this.selectedList = list
      this.selectedGroup = null
    },
    onGroupSelected(group) {
      this.selectedGroup = group
    }
  }
}
</script>
