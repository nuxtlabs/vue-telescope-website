import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

const QUERY_SHOWCASE = gql`
  query($slug: String!) {
    showcases(where: { slug: { _eq: $slug } }) {
      id
      slug
      domain
      url
      is_static
      has_ssr
      screenshot_url
      vue_version
      ui {
        name
      }
      framework {
        name
      }
      showcases_plugins {
        plugin {
          name
        }
      }
      showcase_modules {
        module {
          name
        }
      }
    }
  }
`

export default async function (context) {
  const slug = context.route.query.preview
  if (slug) {
    const { data } = await context.app.$hasura({
      query: print(QUERY_SHOWCASE),
      variables: {
        slug
      }
    })
    context.app.store.dispatch(
      'setCurrentShowcase',
      data ? data.showcases[0] : null
    )
  }
}
