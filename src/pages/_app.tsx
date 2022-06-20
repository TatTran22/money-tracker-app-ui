import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { UserProvider } from '@/hooks/AuthUser'
import { theme } from '@/components/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
