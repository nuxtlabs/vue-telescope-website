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
      backgroundColor: (theme) => ({
        'button-green': '#41B38A',
        'button-green-hover': '#74cdad'
      }),
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')]
}
