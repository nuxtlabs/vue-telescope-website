export default ({ baseUrl, name, description }) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    name,
    description
  }
}
