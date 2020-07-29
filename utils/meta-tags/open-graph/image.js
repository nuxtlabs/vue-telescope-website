export default ({ image, alt }) => {
  return [
    {
      hid: 'og:image',
      property: 'og:image',
      content: image
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: image
    },
    // { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
    // { hid: 'og:image:height', property: 'og:image:height', content: '628' },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: alt
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: image
    }
  ]
}
