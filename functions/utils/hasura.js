const axios = require('axios')

module.exports = async function hasura(payload) {
  const { data } = await axios({
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET_KEY // TODO: secure it
    },
    url: process.env.API_HASURA_URL,
    method: 'post',
    data: {
      query: payload.query,
      variables: payload.variables
    }
  })
  return data
}
