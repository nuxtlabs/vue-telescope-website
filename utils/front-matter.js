import { favicons, appleIcons } from '@/utils/meta-tags/icons'
import themeTags from '@/utils/meta-tags/theme'
import msAppleTags from '@/utils/meta-tags/ms-apple'
import baseOpenGraph from '@/utils/meta-tags/open-graph/base'
import imageOpenGraph from '@/utils/meta-tags/open-graph/image'
import websiteSchema from '@/utils/schema-org/website'
import webpageSchema from '@/utils/schema-org/webpage'
const config = require('@/config.json')
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
      noindex
        ? {
            hid: 'robots',
            name: 'robots',
            content: 'noindex'
          }
        : {},
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
      { hid: 'canonical', rel: 'canonical', href: `${baseUrl + canonical}` },
      ...favicons,
      ...appleIcons
    ],
    script: [
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
