export const state = () => ({
  showcases: [],
})

export const getters = {
  showcases(state) {
    return state.showcases
  },
}

export const mutations = {
  SET(state, { key, value }) {
    state[key] = value
  },
}

export const actions = {
  setShowcases({ commit }, data) {
    commit('SET', { key: 'showcases', value: data })
  },
}
