export const state = () => ({
  hello: 'world',
  twitterLike: false
})

export const mutations = {
  SET_TWITTER_LIKE(state) {
    state.twitterLike = true
  }
}
