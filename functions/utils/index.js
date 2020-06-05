const axios = require('axios')
const { slugify } = require('./helpers')

// eslint-disable-next-line require-await
exports.getFrameworkMutation = async function (framework, moduleMutation) {
  if (!framework) {
    return null
  }

  return {
    data: {
      slug: slugify(framework.name),
      name: framework.name,
      url: framework.url,
      img_path: framework.imgPath,
      frameworks_modules: {
        data: moduleMutation
      }
    },
    on_conflict: {
      constraint: 'frameworks_slug_key',
      update_columns: 'slug'
    }
  }
}
// eslint-disable-next-line require-await
exports.getModuleMutation = async function (modules) {
  if (!modules) {
    return []
  }

  return modules.map((module) => {
    return {
      module: {
        data: {
          slug: slugify(module.name),
          name: module.name,
          img_path: module.imgPath,
          url: module.url
        },
        on_conflict: {
          constraint: 'modules_slug_key',
          update_columns: 'slug'
        }
      }
    }
  })
}
// eslint-disable-next-line require-await
exports.getPluginMutation = async function (plugins) {
  if (!plugins) {
    return []
  }

  return plugins.map((plugin) => {
    return {
      plugin: {
        data: {
          slug: slugify(plugin.name),
          name: plugin.name,
          url: plugin.url,
          img_path: plugin.imgPath
        },
        on_conflict: {
          constraint: 'plugins_slug_key',
          update_columns: 'slug'
        }
      }
    }
  })
}
// eslint-disable-next-line require-await
exports.getUIMutation = async function (ui) {
  if (!ui) {
    return null
  }

  return {
    data: {
      slug: slugify(ui.name),
      name: ui.name,
      url: ui.url,
      img_path: ui.imgPath
    },
    on_conflict: {
      constraint: 'uis_slug_key',
      update_columns: 'slug'
    }
  }
}
// eslint-disable-next-line require-await
exports.isBlacklisted = async function (hname) {
  const hostnameBlacklist = /((local|dev(elopment)?|stag(e|ing)?|test(ing)?|demo(shop)?|admin|cache)\.|pr(eview)?-[0-9]{1,}|\/admin|\.local|localhost)/
  return hostnameBlacklist.test(hname)
}
exports.hasura = async function (payload) {
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
exports.isOutdated = function (showcase) {
  const weekAgo = 1000 * 60 * 60 * 24 * 7
  const today = new Date()
  const lastDetectedAt = new Date(showcase.last_detected_at)
  const diff = +today - +lastDetectedAt

  return diff >= weekAgo
}
