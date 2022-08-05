type ImageSchemaParams = {
  baseUrl: string;
  url?: string;
  width?: string;
  height?: string;
  caption?: string;
  description?: string;
  name?: string;
  author?: string;
}

export default ({ baseUrl, url, width, height, caption, description, name, author } : ImageSchemaParams) => {
  return {
    '@type': 'ImageObject',
    contentUrl: url || `${baseUrl}/branding/1200x675-logo.jpg`, // default image fallback
    url: url || `${baseUrl}/branding/1200x675-logo.jpg`, // default image fallback
    ...(name ? { name } : {}),
    ...(author ? { author } : {}),
    ...(caption ? { caption } : {}),
    ...(description ? { description } : {}),
    ...(width && url ? { width } : !width && url ? {} : { width: '1200' }), // default image width fallback
    ...(height && url ? { height } : !height && url ? {} : { height: '675' }) // default image height fallback
  }
}
