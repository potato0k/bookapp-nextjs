import { extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins'

export const colors = {
  brand: {
    primary: 'hsla(32, 100%, 19%, 1)',
    primaryLight: 'hsla(32, 100%, 29%, 1)',
    primaryDark: 'hsla(32, 100%, 9%, 1)'
  }
}

export const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Poppins', sans-serif"
}

export const theme = extendTheme({ colors, fonts })

