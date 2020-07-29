export default ({ name }) => {
  return [
    // http://w3c-webmob.github.io/installable-webapps/
    // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
    {
      hid: 'apple-mobile-web-app-capable',
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }, // theme-color for iPhone
    {
      hid: 'apple-mobile-web-app-title',
      name: 'apple-mobile-web-app-title',
      content: name
    },
    { hid: 'application-name', name: 'application-name', content: name }, // MS
    {
      hid: 'format-detection',
      name: 'format-detection',
      content: 'telephone=no'
    } // Apple fix
  ]
}
