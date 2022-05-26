import { Link as ChakraLink, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Container } from './Container'

export const CTA = () => {
  const router = useRouter()

  return (
    <Container flexDirection="row" width="full" maxWidth="3xl" py={3} height={'max'}>
      <Button
        as={ChakraLink}
        isExternal
        variant="secondary"
        color="green"
        rounded="button"
        flexGrow={1}
        mx={2}
        width="full"
        onClick={() => {
          void router.push('/signup')
        }}
      >
        Sign up
      </Button>
      <Button
        as={ChakraLink}
        isExternal
        variant="primary"
        rounded="button"
        flexGrow={3}
        mx={2}
        width="full"
        onClick={() => {
          void router.push('/login')
        }}
      >
        Login
      </Button>
    </Container>
  )
}
