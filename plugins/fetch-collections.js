export default function ({ store, $strapi }) {
  if (!$strapi.user) {
    return
  }
  store.commit('collections/setCollections', $strapi.user.lists)
}
