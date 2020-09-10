import { favicons, appleIcons } from './meta-tags/icons'
import themeTags from './meta-tags/theme'
import msAppleTags from './meta-tags/ms-apple'
import baseOpenGraph from './meta-tags/open-graph/base'
import imageOpenGraph from './meta-tags/open-graph/image'
import websiteSchema from './schema-org/website'
import webpageSchema from './schema-org/webpage'
const config = require('../config.json')
const baseUrl =
  (process.env.CONTEXT === 'production'
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL) || 'http://localhost:3000'

function getCanonical(path) {
  let canonical
  const cleanPath = path.toLowerCase()
  if (cleanPath.charAt(cleanPath.length - 1) === '/') {
    canonical = cleanPath.substr(0, cleanPath.length - 1)
  } else {
    canonical = cleanPath
  }
  return canonical
}

export default ({
  // canonical,
  path = '',
  title = config.title,
  description = config.description,
  seo = config.seo,
  color = config.appearance.color,
  social = config.social,
  image,
  name = config.name,
  lang = 'en',
  noindex = false
}) => {
  const canonical = getCanonical(path)
  return {
    __dangerouslyDisableSanitizers: ['script'],
    htmlAttrs: {
      lang,
      prefix: 'og: http://ogp.me/ns#'
    },
    title: canonical === '' ? name : `${title || config.title} | ${name}`,
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: description || seo.description
      },
      // noindex
      //   ? {
      //       hid: 'robots',
      //       name: 'robots',
      //       content: 'noindex'
      //     }
      //   : {},
      // because of SPA fallback had to use 'all' directive
      // https://developers.google.com/search/reference/robots_meta_tag
      {
        hid: 'robots',
        name: 'robots',
        content: noindex ? 'noindex' : 'all'
      },
      ...themeTags({
        primaryColor: color.primary,
        secondaryColor: color.secondary,
        themeColor: color.primary
      }),
      ...msAppleTags({ name }),
      ...baseOpenGraph({
        name,
        baseUrl,
        canonical,
        title: title || config.title,
        description: description || seo.description,
        social
      }),
      ...imageOpenGraph({
        image: image || `${baseUrl}/branding/og-image.jpg`,
        alt: title || config.title
      })
    ],
    link: [
      {
        hid: 'googleapis-preconnect',
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        hid: 'vuetelemetry-preconnect',
        rel: 'preconnect',
        href: 'https://api.vuetelemetry.com'
      },
      {
        hid: 'usefathom-preconnect',
        rel: 'preconnect',
        href: 'https://img3.usefathom.com'
      },
      { hid: 'canonical', rel: 'canonical', href: `${baseUrl + canonical}` },
      ...favicons,
      ...appleIcons
    ],
    script: [
      process.env.NODE_ENV === 'production'
        ? {
            hid: 'fathom',
            src: 'https://cdn.usefathom.com/script.js',
            spa: 'auto',
            site: 'RLHRHRXN',
            defer: true
          }
        : {},
      // {
      //   src: 'https://feedback.fish/ff.js?pid=dd580ca404b5b7',
      //   defer: true
      // },
      {
        hid: 'website',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(
          websiteSchema({
            baseUrl,
            name,
            description: seo.description
          })
        )
      },
      {
        hid: 'webpage',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(
          webpageSchema({
            baseUrl,
            canonical: baseUrl + canonical,
            name: title || config.title,
            headline: title || config.title,
            description,
            social,
            sitename: name
          })
        )
      }
    ]
  }
}
