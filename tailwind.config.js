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
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
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
        50: '#E6EEFA',
        100: '#C1D8FA',
        200: '#9CC1FA',
        300: '#77ABF9',
        400: '#5295F9',
        500: '#2D7FF9',
        600: '#2475EE',
        700: '#1B6BE3',
        800: '#1362D7',
        900: '#0C59CC'
      },
      orange: {
        100: '#fffaf0',
        200: '#feebc8',
        300: '#fbd38d',
        400: '#f6ad55',
        500: '#ed8936',
        600: '#dd6b20',
        700: '#c05621',
        800: '#9c4221',
        900: '#7b341e'
      },
      quasar: {
        base: '#1976D2',
        light: '#E0F0FF'
      },
      'tailwind-css': {
        base: '#38B2AC',
        light: '#D6FFFE'
      },
      element: {
        base: '#409EFF',
        light: '#D7EAFF'
      },
      vuetify: {
        base: '#1867C0',
        light: '#E0EFFF'
      },
      bootstrap: {
        base: '#563D7C',
        light: '#E5D9F9'
      },
      buefy: {
        base: '#7957D5',
        light: '#E6DDFF'
      },
      vue: {
        base: '#41B883',
        light: '#D6F9E9'
      },
      nuxtjs: {
        base: '#00C58E',
        light: '#EAFFF9'
      },
      gridsome: {
        base: '#00A672',
        light: '#D2F8EC'
      }
    },
    extend: {
      fontFamily: {
        display: ['PTRootUI', ...defaultTheme.fontFamily.sans],
        body: ['PTRootUI', ...defaultTheme.fontFamily.sans],
        monospace: [...defaultTheme.fontFamily.mono]
      },
      maxWidth: {
        'container-max-width': '1264px',
        'pretty-wide': '1020px',
        'readable-line-length': '820px'
      },
      spacing: {
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '7': '1.75rem',
        '9': '2.25rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '18': '4.5rem'
      },
      borderRadius: {
        xl: '0.875rem'
      }
    }
  },
  variants: {
    margin: ['responsive', 'last']
  },
  // plugins: [require('@tailwindcss/ui')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
      whitelist: ['bg-nuxtjs-light', 'bg-tailwind-css-light']
    }
  }
}
