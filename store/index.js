export const state = () => ({
  showcases: [],
  currentShowcase: null
})

export const getters = {
  showcases (state) {
    return state.showcases
  },
  currentShowcase (state) {
    return state.currentShowcase
  }
}

export const mutations = {
  SET (state, { key, value }) {
    state[key] = value
  }
}

export const actions = {
  setShowcases ({ commit }, data) {
    commit('SET', { key: 'showcases', value: data })
  },
  setCurrentShowcase ({ commit }, data) {
    commit('SET', { key: 'currentShowcase', value: data })
  }
}
