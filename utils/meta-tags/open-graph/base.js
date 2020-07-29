export default ({
  baseUrl,
  canonical,
  title,
  name,
  description,
  locale,
  twitter
}) => {
  return [
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: name
    },
    {
      hid: 'og:locale',
      property: 'og:locale',
      content: locale || 'en' // defaultLocale from API
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website' // 'website', video.movie', 'article'
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: `${baseUrl + canonical}`
    },
    { hid: 'og:title', property: 'og:title', content: title },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description
    },
    twitter
      ? {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: `@${twitter}`
        }
      : {},
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: title
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    }
  ]
}
