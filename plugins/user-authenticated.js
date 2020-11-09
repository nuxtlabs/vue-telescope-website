export default function ({ store, $strapi }) {
  if (!$strapi.user) {
    return
  }
  store.commit('setLists', $strapi.user.lists)
}
