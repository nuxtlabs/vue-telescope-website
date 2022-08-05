export default ({
  baseUrl,
  canonical,
  title,
  name,
  description,
  locale = 'en', // defaultLocale from API
  social
}) => {
  return [
    {
      property: 'og:site_name',
      content: name
    },
    {
      property: 'og:locale',
      content: locale
    },
    {
      property: 'og:type',
      content: 'website' // 'website', video.movie', 'article'
    },
    {
      property: 'og:url',
      content: `${baseUrl + canonical}`
    },
    { property: 'og:title', content: title },
    {
      property: 'og:description',
      content: description
    },
    social.twitter
      ? {
          name: 'twitter:site',
          content: `@${social.twitter}`
        }
      : {},
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: description
    }
  ]
}
