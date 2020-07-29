export default ({ url, width, height, caption, description, name, author }) => {
  return {
    '@type': 'ImageObject',
    contentUrl: url,
    url,
    ...(name ? { name } : {}),
    ...(author ? { author } : {}),
    ...(caption ? { caption } : {}),
    ...(description ? { description } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {})
  }
}
