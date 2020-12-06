// function extractName(pathMatch) {
//   return pathMatch.split('/').filter((i) => i)[0]
// }
// function extractParams(pathMatch) {
//   return pathMatch.split('/').filter((i) => i)[1]
// }
// function maxPathLevel(pathMatch, max) {
//   if (pathMatch.split('/').filter((i) => i).length > max) {
//     return false
//   } else {
//     return true
//   }
// }

const allowedWildcardNames = ['exxxplore', 'colllections']

export default function ({ app, store, route }) {
  app.router.afterEach((to, from) => {
    if (route.name === 'wildcard') {
      const wildcardName = route.params.wildcard

      if (allowedWildcardNames.includes(wildcardName)) {
        store.commit('setWildcardName', wildcardName)
      }
    } else if (route.name === 'wildcard-params') {
      const wildcardName = route.params.wildcard
      const wildcardParams = route.params.params

      if (allowedWildcardNames.includes(wildcardName)) {
        store.commit('setWildcardName', wildcardName)
        store.commit('setWildcardParams', wildcardParams)
      }
    }
  })
}
