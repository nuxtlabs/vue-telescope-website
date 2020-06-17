// Docs: https://tailwindcss.com/docs/configuration
// Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '834px',
      lg: '1024px',
      xl: '1280px'
    },
    fontSize: {
      base: '16px',
      one: '68px',
      two: '54px',
      three: '42px',
      four: '32px',
      five: '28px',
      six: '24px',
      seven: '20px',
      eight: '18px',
      sm: '14px',
      xs: '12px'
    },
    letterSpacing: {
      '-20': 'calc(20 * -0.0125rem)',
      '-15': 'calc(15 * -0.0125rem)',
      '-10': 'calc(10 * -0.0125rem)',
      '-5': 'calc(5 * -0.0125rem)',
      '-4': 'calc(4 * -0.0125rem)',
      '-3': 'calc(3 * -0.0125rem)',
      '-2': 'calc(2 * -0.0125rem)',
      '-1': '-0.0125rem',
      '1': '0.0125rem',
      '2': 'calc(2 * 0.0125rem)',
      '3': 'calc(3 * 0.0125rem)',
      '4': 'calc(4 * 0.0125rem)',
      '5': 'calc(5 * 0.0125rem)',
      '10': 'calc(10 * 0.0125rem)',
      '15': 'calc(15 * 0.0125rem)',
      '20': 'calc(20 * 0.0125rem)'
    },
    lineHeight: {
      base: '24px',
      one: '72px',
      two: '56px',
      three: '48px',
      four: '36px',
      five: '32px',
      six: '32px',
      seven: '28px',
      eight: '24px',
      sm: '20px',
      xs: '16px'
    },
    fontWeight: {
      'body-weight': 400,
      'bold-body-weight': 700,
      'display-weight': 700,
      'mono-weight': 400
    },
    colors: {
      primary: {
        50: '#E8FFF9',
        100: '#B7F8E7',
        200: '#88F1D5',
        300: '#5CEAC3',
        400: '#32E3B2',
        500: '#0BDCA0',
        600: '#09C38D',
        700: '#07A97B',
        800: '#058F68',
        900: '#047555'
      },
      grey: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121'
      },
      red: {
        50: '#F5E5E4',
        100: '#F5C4C1',
        200: '#F5A49E',
        300: '#F4837B',
        400: '#F46359',
        500: '#F44336',
        600: '#E1362A',
        700: '#CD2B1F',
        800: '#B92115',
        900: '#A6180D'
      },
      yellow: {
        50: '#FFFBD9',
        100: '#FFF6AA',
        200: '#FFF38E',
        300: '#FFF073',
        400: '#FFEE57',
        500: '#FFEB3B',
        600: '#E5D227',
        700: '#C0AE16',
        800: '#A09009',
        900: '#807200'
      },
      green: {
        50: '#EBFCEB',
        100: '#C5EDC5',
        200: '#A2DDA3',
        300: '#82CE84',
        400: '#66BE69',
        500: '#4CAF50',
        600: '#37A33B',
        700: '#249728',
        800: '#138B18',
        900: '#05800A'
      },
      blue: {
        50: '#E6F1FA',
        100: '#BEDEF9',
        200: '#96CCF7',
        300: '#6EB9F6',
        400: '#48A8F4',
        500: '#2196F3',
        600: '#178AE5',
        700: '#0F7FD8',
        800: '#0774CA',
        900: '#0069BD'
      }
    },
    extend: {
      fontFamily: {
        display: ['PTRootUI', ...defaultTheme.fontFamily.sans],
        body: ['PTRootUI', ...defaultTheme.fontFamily.sans],
        monospace: [...defaultTheme.fontFamily.mono]
      }
    }
  },
  variants: {
    margin: ['responsive', 'last']
  },
  plugins: [require('@tailwindcss/ui')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
