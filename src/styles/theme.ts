import { extendTheme } from '@chakra-ui/react'
import { mode, Styles } from '@chakra-ui/theme-tools'

import '@fontsource/poppins'

export const colors = {
  brand: {
    primary: 'hsla(32, 100%, 19%, 1)',
    primaryLight: 'hsla(32, 100%, 29%, 1)',
    primaryDark: 'hsla(32, 100%, 9%, 1)'
  }
}

export const styles: Styles = {
  global: props => ({
    body: {
      fontFamily: 'body',
      color: 'gray.800',
      bg: 'white',
      transitionProperty: 'background-color',
      transitionDuration: 'normal',
      lineHeight: 'base'
    },
    '*::placeholder': {
      color: 'gray.400'
    },
    '*, *::before, &::after': {
      borderColor: 'gray.200', 
      wordWrap: 'break-word'
    }
  })
}

// export const styles: Styles = {
//   global: props => ({
//     body: {
//       fontFamily: 'body',
//       color: 'gray.800', 'whiteAlpha.900')(props),
//       bg: mode('white', 'gray.800')(props),
//       transitionProperty: 'background-color',
//       transitionDuration: 'normal',
//       lineHeight: 'base'
//     },
//     '*::placeholder': {
//       color: mode('gray.400', 'whiteAlpha.400')(props)
//     },
//     '*, *::before, &::after': {
//       borderColor: mode('gray.200', 'whiteAlpha.300')(props),
//       wordWrap: 'break-word'
//     }
//   })
// }

export const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Poppins', sans-serif"
}

export const theme = extendTheme({ colors, fonts, styles })
