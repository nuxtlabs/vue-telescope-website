export default ({ name }) => {
  return [
    // http://w3c-webmob.github.io/installable-webapps/
    // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }, // theme-color for iPhone
    {
      name: 'apple-mobile-web-app-title',
      content: name
    },
    { name: 'application-name', content: name }, // MS
    {
      name: 'format-detection',
      content: 'telephone=no'
    } // Apple fix
  ]
}
