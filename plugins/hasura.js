export default function ({ $http, env }, inject) {
  const $hasura = $http.create({
    prefixUrl: env.API_HASURA_URL
  })

  $hasura.setHeader('x-hasura-admin-secret', env.HASURA_ADMIN_SECRET_KEY)

  inject('hasura', $hasura)
}
