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
  isModal: false,
  showPrivacyAwareModal: false,
  privacyAwarenessCb: null,
  isExtensionInstalled: false
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
  }
}
