export const state = () => ({
  hello: 'world',
  twitterLike: false,
  frameworks: [],
  uis: [],
  plugins: [],
  modules: []
})

export const mutations = {
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
  }
}

export const actions = {
  async INIT_APP({ commit }) {
    for (const t of ['frameworks', 'modules', 'plugins', 'uis']) {
      const technology = await this.$strapi.find(t)
      if (technology.length) {
        commit(
          `SET_${t.toUpperCase()}`,
          technology.sort((a, b) => a.slug.localeCompare(b.slug))
        )
      }
    }
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('INIT_APP')
  }
}
