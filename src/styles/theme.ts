import { extendTheme } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'

import '@fontsource/poppins'

export const theme = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: false,

  colors: {
    brand: {
      primary: '#8c8c8c',
      primaryLight: '#f2f2f2',
      primaryDark: '#1a1a1a'
    },
    secondary: '#009400',
    text: {
      dark: '#000',
      light: '#fff'
    },
    icon: '#ffd700'
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif"
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('', '')(props)
      },
      tr: {
        _hover: { bg: mode('#f2f2f2', '#1a1a1a')(props) }
      }
    })
  }
})

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
