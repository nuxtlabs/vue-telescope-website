/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        '7xl': '6rem'
      },
      colors: {
        nuxt: {
          gray: '#243746',
          lightgreen: '#41B38A',
          green: '#158876'
        }
      },
      borderRadius: {
        xl: '1rem'
      },
      zIndex: {
        '-1': '-1',
        '-10': '-10',
        '-20': '-20',
        '-30': '-30'
      },
      spacing: {
        18: '4.5rem'
      }
    }
  },
  variants: {
    margin: ['responsive', 'last']
  },
  plugins: [require('@tailwindcss/ui')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: true,
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
