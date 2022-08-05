export default ({ image, alt }) => {
  return [
    {
      property: 'og:image',
      content: image
    },
    {
      property: 'og:image:secure_url',
      content: image
    },
    // { property: 'og:image:width', content: '1200' },
    // {  property: 'og:image:height', content: '628' },
    {
      property: 'og:image:alt',
      content: alt
    },
    {
      name: 'twitter:image',
      content: image
    }
  ]
}
