import imageSchema from './image'

export default ({
  baseUrl,
  canonical,
  name,
  headline,
  description,
  social,
  imageUrl,
  imageCaption,
  imageWidth,
  imageHeight,
  sitename
}) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    '@id': canonical,
    url: canonical,
    name,
    headline,
    description,
    ...(imageUrl
      ? {
          image: imageSchema({
            url: imageUrl,
            ...(imageCaption ? { caption: imageCaption } : {}),
            ...(imageWidth ? { width: imageWidth } : {}),
            ...(imageHeight ? { height: imageHeight } : {})
          })
        }
      : {
          image: imageSchema({
            url: `${baseUrl}/branding/1200x675-logo.png`,
            width: 1200,
            height: 675
          })
        })
  }
}
