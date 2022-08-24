import websiteSchema from './useFrontMatter/websiteSchema'
import webpageSchema from './useFrontMatter/webpageSchema'
import faviconsMeta from './useFrontMatter/faviconsMeta'
import appleIconsMeta from './useFrontMatter/appleIconsMeta'
import themeMeta from './useFrontMatter/themeMeta'
import msAppleMeta from './useFrontMatter/msAppleMeta'
import baseOpenGraph from './useFrontMatter/baseOpenGraph'
import imageOpenGraph from './useFrontMatter/imageOpenGraph'

import config from '@/config.json'

function getCanonical (path: string) {
  let canonical: string
  const cleanPath = path.toLowerCase()
  if (cleanPath.charAt(cleanPath.length - 1) === '/') {
    canonical = cleanPath.substr(0, cleanPath.length - 1)
  } else {
    canonical = cleanPath
  }
  return canonical
}

type FrontMatterParams = {
  path?: string;
  title?: string;
  description?: string;
  seo?: {
    description?: string
  };
  color?: {
    primary: string;
    secondary: string;
  };
  social?: {
    twitter: string;
    facebook: string;
  };
  image?: string;
  name?: string;
  lang?: string;
  noindex?: boolean
}

export const useFrontMatter = ({
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
}: FrontMatterParams = {}) => {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const baseUrl = runtimeConfig.baseUrl

  if (!path) {
    path = route.path
  }

  const canonical = getCanonical(path)

  useHead({
    htmlAttrs: {
      lang,
      prefix: 'og: http://ogp.me/ns#'
    },
    title: canonical === '' ? name : `${title || config.title} | ${name}`,
    viewport: 'width=device-width, initial-scale=1',
    charset: 'utf-8',
    meta: [
      {
        name: 'description',
        content: description || seo.description
      },
      {
        name: 'robots',
        content: noindex ? 'noindex' : 'all'
      },
      ...themeMeta({
        primaryColor: color.primary,
        secondaryColor: color.secondary,
        themeColor: color.secondary
      }),
      ...msAppleMeta({ name }),
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
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://api.vuetelescope.com'
      },
      {
        rel: 'preconnect',
        href: 'https://img3.usefathom.com'
      },
      { rel: 'canonical', href: `${baseUrl + canonical}` },
      ...faviconsMeta,
      ...appleIconsMeta
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(
          websiteSchema({
            baseUrl,
            name,
            description: seo.description
          })
        )
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(
          webpageSchema({
            baseUrl,
            canonical: baseUrl + canonical,
            name: title || config.title,
            headline: title || config.title,
            description
          })
        )
      }
    ]
  })

  return { }
}
