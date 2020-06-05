import gql from 'graphql-tag'

export const QUERY_SHOWCASES = (args) => {
  const query = `
    query {
      total: showcases_aggregate { aggregate { count } }
      showcases: showcases_aggregate(limit: ${args.limit}, offset: ${args.offset}) {
        aggregate {
          count
        }
        nodes {id slug url hostname domain screenshot_url ui { name url img_path } framework { name url img_path } }
      }
      ${args.slug ? 'previews: showcases(where: {slug: {_eq:' + JSON.stringify(args.slug) + ' }}) { id slug domain hostname url is_static has_ssr screenshot_url vue_version ui { name url img_path } framework { name url img_path } showcases_plugins { plugin { name url img_path } } showcase_modules { module { name url img_path } } }' : ''}
    }
  `
  return gql(query)
}

export const QUERY_SHOWCASE = gql`
  query($id: uuid!) {
    showcase: showcases_by_pk(id: $id) {
      id
      slug
      domain
      hostname
      url
      is_static
      has_ssr
      screenshot_url
      vue_version
      ui {
        name
        url
        img_path
      }
      framework {
        name
        url
        img_path
      }
      showcases_plugins {
        plugin {
          name
          url
          img_path
        }
      }
      showcase_modules {
        module {
          name
          url
          img_path
        }
      }
    }
  }
`
export const QUERY_FILTERED_SHOWCASES = ({ limit, offset, where }) => {
  const query = `
    query {
      total: showcases_aggregate(
        where: {
          ${where.frameworks ? 'framework: { slug: { _in: ' + JSON.stringify(where.frameworks) + ' } }' : ''}
          ${where.uis ? 'ui: { slug: { _in: ' + JSON.stringify(where.uis) + ' } }' : ''}
          ${where.plugins ? 'showcases_plugins: { plugin: { slug: { _in: ' + JSON.stringify(where.plugins) + ' } } }' : ''}
        }
      ) {
        aggregate { count }
      }
      showcases: showcases_aggregate(
        limit: ${limit}
        ${offset ? 'offset: ' + offset : ''}
        where: {
          ${where.frameworks ? 'framework: { slug: { _in: ' + JSON.stringify(where.frameworks) + ' } }' : ''}
          ${where.uis ? 'ui: { slug: { _in: ' + JSON.stringify(where.uis) + ' } }' : ''}
          ${where.plugins ? 'showcases_plugins: { plugin: { slug: { _in: ' + JSON.stringify(where.plugins) + ' } } }' : ''}
        }
      ) {
        aggregate {
          count
        }
        nodes {
          id
          slug
          url
          hostname
          domain
          screenshot_url
          ui {
            name
            url
            img_path
          }
          framework {
            name
            url
            img_path
          }
        }
      }
    }`
  return gql(query)
}

export const QUERY_SEARCH_SHOWCASES = gql`
  query($limit: Int, $offset: Int, $q: String) {
    total: search_showcases_aggregate(args: { search: $q }) {
      aggregate {
        count
      }
    }
    showcases: search_showcases_aggregate(args: { search: $q }, limit: $limit, offset: $offset) {
      aggregate {
        count
      }
      nodes {
        id
        slug
        url
        hostname
        domain
        screenshot_url
        ui {
          name
          url
          img_path
        }
        framework {
          name
          url
          img_path
        }
      }
    }
  }
`