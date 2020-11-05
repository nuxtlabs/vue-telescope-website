<template>
  <div class="max-w-container-max-width px-4 mx-auto py-12">
    <ClientOnly>
      <section v-if="!$strapi.user" class="text-center">
        <h1
          class="mx-auto text-two leading-two text-center md:text-one md:leading-one md:w-1/2 md:mt-16 font-bold-body-weight"
        >
          Try out Vue&nbsp;Telemetry&nbsp;Lists and create your own collections!
        </h1>
        <p
          class="mx-auto text-eight leading-eight text-center mt-8 md:text-seven md:leading-seven md:w-3/4 text-grey-700"
        >
          Log In with GitHub, start creating your lists and bookmark any
          showcases.
        </p>
        <GitHubLogInButton class="mt-12 mb-4" />
      </section>
      <div v-else class="flex">
        <section v-if="lists.length" class="w-1/4 px-4 py-2">
          <List
            v-for="list in lists"
            :key="list.id"
            :selected="selectedList && selectedList.id === list.id"
            :list="list"
            @group-selected="onGroupSelected"
            @list-selected="onListSelected"
          />
          <List />
        </section>
        <section v-if="selectedList" class="w-3/4 flex flex-wrap ml-4">
          <ExploreShowcasesCard
            v-for="showcase in showcases"
            :key="showcase.id"
            :showcase="showcase"
            class="w-full sm:w-1/2 md:w-1/3 mb-4"
          />
        </section>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  fetchOnServer: false,
  async fetch() {
    try {
      if (this.$strapi.user) {
        const lists = await this.$strapi.find('lists')
        this.$store.commit('setLists', lists)
        this.selectedList = lists[0]
      }
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
