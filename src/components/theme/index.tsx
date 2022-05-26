import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import * as components from './components'
import * as foundations from './foundations'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

export const theme: ThemeConfig = extendTheme({
  breakpoints,
  ...foundations,
  colors: {
    brand: {
      '50': '#f0faf3',
      '100': '#c2e9d0',
      '200': '#8ad6a5',
      '300': '#40bc6b',
      '400': '#11ab47',
      '500': '#039134',
      '600': '#027a2c',
      '700': '#026224',
      '800': '#02531e',
      '900': '#013c16',
    },
  },
  components: { ...components },
})
