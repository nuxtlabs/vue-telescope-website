import Vue from 'vue'

export const state = () => ({
  isReady: false,
  twitterLike: false,
  frameworks: [],
  uis: [],
  plugins: [],
  modules: [],
  browser: '',
  isMobile: true,
  selectedFilters: {}
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
  }
}

export const actions = {
  async INIT_APP({ state, commit }) {
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
    commit('isReady')
  }
}
