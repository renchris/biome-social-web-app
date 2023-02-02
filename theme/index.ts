import { extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins'
import '@fontsource/dm-sans'
import components from './components'

const fonts = {
  heading: '\'DM Sans\', sans-serif',
  body: '\'Poppins\', sans-serif',
}

const breakpoints = {
  sm: '375px', // 23.4375 em
  md: '768px', // 48 em
  lg: '1024px', // 64 em
  xl: '1440px', // 90 em
  '2xl': '1536px', // 96 em
}

const config = {
  disableTransitionOnChange: false,
  initialColorMode: 'system',
  useSystemColorMode: false,
}

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#23262F', // neutrals.2
        _dark: '#FCFCFD', // neutrals.8
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
    radii: {
      button: '12px',
    },
  },
  colors: {
    black: '#16161D',
    neutrals: {
      1: '#141416',
      2: '#23262F',
      3: '#353945',
      4: '#777E90',
      5: '#B1B5C3',
      6: '#E6E8EC',
      7: '#F4F5F6',
      8: '#FCFCFD',
    },
    button: {
      50: 'pink',
      100: 'pink',
      200: '#3B71FE', // dark mode - non-active - primary.1
      300: '#2955BF', // dark mode - hover - variant
      400: '#2955BF', // dark mode - active - variant
      500: '#3B71FE', // non-active - primary.1
      600: '#2955BF', // hover - primary.1 - variant
      700: '#2955BF', // active - primary.1 - variant
      800: 'yellow',
      900: 'yellow',
    },
    primary: {
      1: '#3B71FE',
      2: '#8BC5E5',
      3: '#92A5EF',
      4: '#58C27D',
    },
    secondary: {
      4: '#FA8F54',
    },
  },
  zIndices: {
    raised: 5,
  },
  fonts,
  breakpoints,
  components,
  config,
})

export default theme
