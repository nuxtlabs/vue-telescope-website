import imageSchema from './imageSchema'

type WebpageSchemaParams = {
  baseUrl?: string;
  canonical: string;
  name: string;
  headline: string;
  description: string;
  imageUrl?: string;
  imageCaption?: string;
  imageWidth?: string;
  imageHeight?: string;
}

export default ({
  baseUrl,
  canonical,
  name,
  headline,
  description,
  imageUrl,
  imageCaption,
  imageWidth,
  imageHeight
} : WebpageSchemaParams) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    '@id': canonical,
    url: canonical,
    name,
    headline,
    description,
    image: imageSchema({
      baseUrl,
      url: imageUrl,
      caption: imageCaption,
      width: imageWidth,
      height: imageHeight,
      description
    })
  }
}
