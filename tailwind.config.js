const defaultTheme = require('tailwindcss/defaultTheme')
// const breakpoints = require('./utils/styles/breakpoints')

const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '834px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

module.exports = {
  theme: {
    screens: {
      ...breakpoints,
      'has-hover': { raw: '(hover: hover)' }
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
      1: '0.0125rem',
      2: 'calc(2 * 0.0125rem)',
      3: 'calc(3 * 0.0125rem)',
      4: 'calc(4 * 0.0125rem)',
      5: 'calc(5 * 0.0125rem)',
      10: 'calc(10 * 0.0125rem)',
      15: 'calc(15 * 0.0125rem)',
      20: 'calc(20 * 0.0125rem)'
    },
    lineHeight: {
      none: '1',
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
        50: '#E6FCF6',
        100: '#C5FBEC',
        200: '#72F4CF',
        300: '#4FEEC1',
        400: '#29E4AF',
        500: '#0BDCA0',
        600: '#06C58E',
        700: '#08A678',
        800: '#058B65',
        900: '#056D50'
      },
      grey: {
        50: '#F5F7F6',
        100: '#E7E9E8',
        200: '#DADEDD',
        300: '#C4C9C8',
        400: '#9CA4A2',
        500: '#7B8482',
        600: '#636D6A',
        700: '#4F5956',
        800: '#36403D',
        900: '#1E2422'
      },
      red: {
        50: '#FCF1ED',
        100: '#F2CDC0',
        200: '#F1A184',
        300: '#F37B4F',
        400: '#E85C29',
        500: '#DC430B',
        600: '#C23C0B',
        700: '#AA370D',
        800: '#922C07',
        900: '#6D2004'
      },
      yellow: {
        50: '#FCFBDC',
        100: '#FBF7AA',
        200: '#F4EF82',
        300: '#F4EC57',
        400: '#F0E846',
        500: '#EADF0E',
        600: '#D8CE0D',
        700: '#B7AE0D',
        800: '#8E8807',
        900: '#6F6A05'
      },
      green: {
        50: '#F3FBE9',
        100: '#D0F5A2',
        200: '#B8F26F',
        300: '#AAEE54',
        400: '#9AE73A',
        500: '#80DC0B',
        600: '#72C805',
        700: '#64AF04',
        800: '#508D02',
        900: '#386400'
      },
      blue: {
        50: '#EBF6FC',
        100: '#ACDBF7',
        200: '#74C4F3',
        300: '#4EB1EB',
        400: '#2DA1E3',
        500: '#0B8FDC',
        600: '#0D85CA',
        700: '#0774B2',
        800: '#086093',
        900: '#02446A'
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
      purple: {
        500: '#9F7AEA'
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
      vuepress: {
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
      },
      github: {
        base: '#24292e',
        400: '#2d3339'
      }
    },
    extend: {
      fontFamily: {
        // @ts-expect-error
        display: ['PTRootUI', ...defaultTheme.fontFamily.sans],
        // @ts-expect-error
        body: ['PTRootUI', ...defaultTheme.fontFamily.sans],
        // @ts-expect-error
        monospace: [...defaultTheme.fontFamily.mono]
      },
      maxWidth: {
        '24rem': '24rem',
        container: '1264px',
        'pretty-wide': '1020px',
        readable: '820px'
      },
      maxHeight: {
        72: '18rem'
      },
      minWidth: {
        body: '320px'
      },
      opacity: {
        10: '0.1'
      },
      spacing: {
        header: 'var(--header-height)',
        'top-position': 'var(--top-position)',
        '(full-header)': 'calc(100% - var(--header-height))',
        '(screen-header)': 'calc(100vh - var(--header-height))',
        '(full-top-position)': 'calc(100% - var(--top-position))',
        '(screen-top-position)': 'calc(100vh - var(--top-position))',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '12px': '12px',
        '18px': '18px',
        7: '1.75rem',
        9: '2.25rem',
        13: '3.25rem',
        14: '3.5rem',
        18: '4.5rem',
        28: '7rem',
        96: '24rem',
        128: '32rem'
      },
      borderRadius: {
        '2lg': '0.625rem',
        '3lg': '0.75rem',
        xl: '0.875rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem'
      },
      transitionDuration: {
        400: '400ms'
      },
      transitionTimingFunction: {
        'ease-in-material': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out-material': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out-material': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in-out-material-sharp': 'cubic-bezier(0.4, 0, 0.6, 1)'
      },
      zIndex: {
        '-1': '-1'
      },
      backgroundSize: {
        100: '100%'
      },
      inset: {
        '1/2': '50%'
      },
      boxShadow: {
        inner: 'inset 0px 0px 5px rgba(0, 0, 0, 0.2)',
        '1dp':
          '0 1px 1px 0 rgba(0,0,0,0.13), 0 2px 1px -1px rgba(0,0,0,0.11), 0 1px 3px 0 rgba(0,0,0,0.10)',
        '2dp':
          '0 2px 2px 0 rgba(0,0,0,0.13), 0 3px 1px -2px rgba(0,0,0,0.11), 0 1px 5px 0 rgba(0,0,0,0.10)',
        '3dp':
          '0 3px 4px 0 rgba(0,0,0,0.13), 0 3px 3px -2px rgba(0,0,0,0.11), 0 1px 8px 0 rgba(0,0,0,0.10)',
        '4dp':
          '0 4px 5px 0 rgba(0,0,0,0.13), 0 1px 10px 0 rgba(0,0,0,0.11), 0 2px 4px -1px rgba(0,0,0,0.10)',
        '6dp':
          '0 6px 10px 0 rgba(0,0,0,0.13), 0 1px 18px 0 rgba(0,0,0,0.11), 0 3px 5px -1px rgba(0,0,0,0.10)',
        '8dp':
          '0 8px 10px 1px rgba(0,0,0,0.13), 0 3px 14px 2px rgba(0,0,0,0.11), 0 5px 5px -3px rgba(0,0,0,0.10)',
        '12dp':
          '0 12px 17px 2px rgba(0,0,0,0.13), 0 5px 22px 4px rgba(0,0,0,0.11), 0 7px 8px -4px rgba(0,0,0,0.10)',
        '16dp':
          '0 16px 24px 2px rgba(0,0,0,0.13), 0 6px 30px 5px rgba(0,0,0,0.11), 0 8px 10px -5px rgba(0,0,0,0.10)',
        '24dp':
          '0 24px 38px 3px rgba(0,0,0,0.13), 0 9px 46px 8px rgba(0,0,0,0.11), 0 11px 15px -7px rgba(0,0,0,0.10)'
      },
      stroke: theme => ({
        primary: theme('colors.primary.500')
      }),
      fill: theme => ({
        primary: theme('colors.primary.500')
      })
    }
  },
  variants: {
    margin: ['responsive', 'last'],
    display: ['responsive', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderColor: ['responsive', 'hover', 'focus', 'group-hover']
  },
  safelist: [
    'bg-nuxtjs-light',
    'bg-nuxtjs-base',
    'text-nuxtjs-base',
    'bg-quasar-base',
    'text-quasar-base',
    'bg-gridsome-base',
    'text-gridsome-base',
    'bg-vuepress-base',
    'text-vuepress-base',
    'bg-vue-base',
    'text-vue-base',
    'bg-tailwind-css-light'
  ]
}
