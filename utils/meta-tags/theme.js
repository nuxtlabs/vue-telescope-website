export default ({ primaryColor, secondaryColor, themeColor }) => {
  return [
    {
      hid: 'theme-color',
      name: 'theme-color',
      content: themeColor || primaryColor
    }, // set color
    // https://technet.microsoft.com/en-us/windows/dn255024(v=vs.60)
    {
      hid: 'msapplication-navbutton-color',
      name: 'msapplication-navbutton-color',
      content: primaryColor
    }, // theme-color for Windows Phones and IE11 on Windows 10
    {
      hid: 'msapplication-TileColor',
      name: 'msapplication-TileColor',
      content: secondaryColor
    },
    // {
    //   hid: 'msapplication-TileImage',
    //   name: 'msapplication-TileImage',
    //   content: '/branding/mstile-150x150.png'
    // },
    {
      hid: 'apple-mobile-web-app-status-bar-style',
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default'
    } // theme-color for iPhone: default, black, black-translucent
    // https://developer.yoast.com/safari-pinned-tab-icon-mask-icon/
    // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/pinnedTabs/pinnedTabs.html
    // { hid: 'mask-icon', rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: secondaryColor },
  ]
}
