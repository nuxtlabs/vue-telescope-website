import Vue from 'vue'

export const state = () => ({
  baseUrl:
    (process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_PRIME_URL) || 'http://localhost:3000',
  isReady: false,
  twitterLike: false,
  showcasesCount: 0,
  frameworks: [],
  uis: [],
  plugins: [],
  modules: [],
  browser: '',
  isMobile: false,
  selectedFilters: {},
  selectedSort: { _sort: 'lastDetectedAt:desc' },
  // selectedSort: 'rank:asc',
  isModal: false,
  showPrivacyAwareModal: false,
  privacyAwarenessCb: null,
  isExtensionInstalled: false,
  lists: []
})

export const mutations = {
  isReady(state) {
    state.isReady = true
  },
  SET_TWITTER_LIKE(state) {
    state.twitterLike = true
  },
  SET_FRAMEWORKS(state, frameworks) {
    state.frameworks = frameworks
  },
  SET_UIS(state, uis) {
    state.uis = uis
  },
  SET_PLUGINS(state, plugins) {
    state.plugins = plugins
  },
  SET_MODULES(state, modules) {
    state.modules = modules
  },
  SET_BROWSER(state, browser) {
    state.browser = browser
  },
  SET_MOBILE(state, isMobile) {
    state.isMobile = isMobile
  },
  SET_FILTERS(state, filters) {
    state.selectedFilters = filters
  },
  RESET_FILTERS(state) {
    state.selectedFilters = {}
  },
  SET_FILTER_KEY(state, { key, value }) {
    // console.log('SET_FILTER_KEY', this)
    Vue.set(state.selectedFilters, key, value)
  },
  DELETE_FILTER_KEY(state, key) {
    // console.log('DELETE_FILTER_KEY')
    Vue.delete(state.selectedFilters, key)
  },
  SET_MODAL(state, isModal) {
    state.isModal = isModal
  },
  setShowcasesCount(state, count) {
    state.showcasesCount = count
  },
  setShowPrivacyAwareModal(state, show) {
    state.showPrivacyAwareModal = show
  },
  setPrivacyAwarenessCb(state, cb) {
    state.privacyAwarenessCb = cb
  },
  setIsExtensionInstalled(state, installed) {
    state.isExtensionInstalled = installed
  },
  setSort(state, sort) {
    state.selectedSort = sort
  },
  setLists(state, lists) {
    state.lists = lists
  },
  addList(state, list) {
    state.lists.push(list)
  },
  updateList(state, list) {
    const index = state.lists.findIndex((item) => item.id === list.id)
    if (index >= 0) Object.assign(state.lists[index], list)
    else state.lists.push(list)
  },
  deleteList(state, list) {
    const index = state.lists.findIndex((item) => item.id === list.id)
    if (index >= 0) state.lists.splice(index, 1)
  },
  addGroup(state, { group, list }) {
    const listIndex = state.lists.findIndex((item) => item.id === list.id)
    if (listIndex >= 0) state.lists[listIndex].groups.push(group)
  },
  updateGroup(state, { group, list }) {
    const listIndex = state.lists.findIndex((item) => item.id === list.id)
    if (listIndex >= 0) {
      const groupIndex = state.lists[listIndex].groups.findIndex(
        (item) => item.id === group.id
      )
      if (groupIndex >= 0) {
        Object.assign(state.lists[listIndex].groups[groupIndex], group)
      } else {
        state.lists[listIndex].groups.push(group)
      }
    }
  },
  deleteGroup(state, { group, list }) {
    const listIndex = state.lists.findIndex((item) => item.id === list.id)
    if (listIndex >= 0) {
      const groupIndex = state.lists[listIndex].groups.findIndex(
        (item) => item.id === group.id
      )
      if (groupIndex >= 0) state.lists[listIndex].groups.splice(groupIndex, 1)
    }
  }
}

export const actions = {
  async INIT_APP({ dispatch, commit }) {
    const entities = ['frameworks', 'modules', 'plugins', 'uis']

    await Promise.all(
      entities.map(async (entity) => {
        // Fetch technologies on Strapi
        let technologies = await this.$strapi.find(entity)

        if (!technologies.length) {
          return
        }
        // Keep only need keys
        technologies = technologies.map(({ slug, name, imgPath, url }) => ({
          slug,
          name,
          imgPath,
          url
        }))
        // Sort alphabetically
        technologies.sort((a, b) => a.name.localeCompare(b.name))
        // Add to state
        commit(`SET_${entity.toUpperCase()}`, technologies)
      })
    )
    await dispatch('GET_SHOWCASES_COUNT')

    commit('isReady')
  },
  async GET_SHOWCASES_COUNT({ commit }) {
    const showcasesCount = await this.$strapi.find('showcases/count')
    commit('setShowcasesCount', showcasesCount)
  },
  PROCESS_PRIVACY_AWARENESS({ state, commit }, cb) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('privacyAware') !== 'true') {
        commit('setPrivacyAwarenessCb', cb)
        commit('setShowPrivacyAwareModal', true)
        resolve(false)
      } else {
        resolve(true)
      }
    })
  },
  async createList({ commit }, { name }) {
    const newList = await this.$strapi.create('lists', {
      name
    })
    commit('addList', newList)
    return newList
  },
  async updateList({ commit }, { name, list }) {
    const updatedList = await this.$strapi.update('lists', list.id, {
      name
    })
    updatedList.groups = list.groups
    commit('updateList', updatedList)
    return updatedList
  },
  async deleteList({ commit }, { list }) {
    await this.$strapi.delete('lists', list.id)
    commit('deleteList', list)
    return list
  },
  async createGroup({ commit }, { name, list }) {
    const newGroup = await this.$strapi.$http.$post(`lists/${list.id}/groups`, {
      name,
      list: list.id
    })
    newGroup.list = list.id
    commit('addGroup', { group: newGroup, list })
    return newGroup
  },
  async updateGroup({ commit }, { name, group, list }) {
    const updatedGroup = await this.$strapi.$http.$put(
      `lists/${list.id}/groups/${group.id}`,
      {
        name
      }
    )
    updatedGroup.list = list.id
    commit('updateGroup', {
      group: updatedGroup,
      list
    })
    return updatedGroup
  },
  async deleteGroup({ commit }, { group, list }) {
    await this.$strapi.$http.$delete(`lists/${list.id}/groups/${group.id}`)
    commit('deleteGroup', {
      group,
      list
    })
    return group
  }
}
