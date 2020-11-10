<template>
  <div class="max-w-container-max-width px-2 mx-auto pt-4 pb-12">
    <ClientOnly>
      <section v-if="!$strapi.user" class="text-center">
        <h1
          class="mx-auto text-two leading-two text-center md:text-one md:leading-one md:w-1/2 md:mt-16 font-bold-body-weight"
        >
          Try out Vue&nbsp;Telemetry&nbsp;Collections and create your own
          collections!
        </h1>
        <p
          class="mx-auto text-eight leading-eight text-center mt-8 md:text-seven md:leading-seven md:w-3/4 text-grey-700"
        >
          Log In with GitHub, start creating your collections and bookmark any
          showcases.
        </p>
        <GitHubLogInButton class="mt-12 mb-4" />
      </section>
      <div v-else class="flex">
        <section class="w-1/4 px-2 py-4">
          <List
            v-for="list in lists"
            :key="list.id"
            :selected="selectedList && selectedList.id === list.id"
            :list="list"
            :selected-group="
              list.groups.find(
                (group) => selectedGroup && group.id === selectedGroup.id
              )
            "
            :lists-selection="listsSelection"
            @group-selected="onGroupSelected"
            @list-selected="onListSelected"
          />
          <List
            :lists-selection="listsSelection"
            @list-selected="onListSelected"
          />
        </section>
        <section class="w-3/4">
          <div class="flex items-center ml-4 mb-1 font-bold-body-weight">
            <AnimatedNumber :to="showcases.length" :from="0" />
            <span class="font-body-weight text-sm">&nbsp;websites found</span>
          </div>
          <div class="flex flex-wrap">
            <ExploreShowcasesCard
              v-for="showcase in showcases"
              :key="showcase.id"
              :showcase="showcase"
              class="w-full sm:w-1/2 md:w-1/3 mb-4"
            />
          </div>
        </section>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import frontMatter from '@/utils/front-matter'

export default {
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
      return this.lists
        .filter(
          (list) => !this.selectedList || list.id === this.selectedList.id
        )
        .flatMap((list) => list.groups)
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
    listsSelection() {
      return { listId: this.selectedList?.id, groupId: this.selectedGroup?.id }
    }
  },
  watch: {
    lists() {
      if (
        this.selectedList &&
        !this.lists.find((list) => list && list.id === this.selectedList.id)
      ) {
        this.selectedList = null
      }
    }
  },
  methods: {
    onListSelected(list) {
      this.selectedList =
        !this.selectedGroup &&
        list &&
        this.selectedList &&
        list.id === this.selectedList.id
          ? null
          : list
      this.selectedGroup = null
    },
    onGroupSelected(group) {
      this.selectedGroup =
        group && this.selectedGroup && group.id === this.selectedGroup.id
          ? null
          : group
    }
  },
  head() {
    return frontMatter({
      path: this.$route.path,
      title: 'Collections'
    })
  }
}
</script>
