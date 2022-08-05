export default ({ primaryColor, secondaryColor, themeColor }) => {
  return [
    {
      name: 'theme-color',
      content: themeColor || primaryColor
    }, // set color
    // https://technet.microsoft.com/en-us/windows/dn255024(v=vs.60)
    {
      name: 'msapplication-navbutton-color',
      content: primaryColor
    }, // theme-color for Windows Phones and IE11 on Windows 10
    {
      name: 'msapplication-TileColor',
      content: secondaryColor
    },
    // {
    //   name: 'msapplication-TileImage',
    //   content: '/branding/mstile-150x150.png'
    // },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default'
    } // theme-color for iPhone: default, black, black-translucent
    // https://developer.yoast.com/safari-pinned-tab-icon-mask-icon/
    // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/pinnedTabs/pinnedTabs.html
    // { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: secondaryColor },
  ]
}
