type WebsiteSchemaParams = {
  baseUrl: string;
  name: string;
  description: string;
}

export default ({ baseUrl, name, description } : WebsiteSchemaParams) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    name,
    description
  }
}
