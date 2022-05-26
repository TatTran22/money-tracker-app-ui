import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import type { NextPage } from 'next'

import { Logo } from '~/src/components/Auth/Logo'
import { OAuthButtonGroup } from '~/src/components/Auth/OAuthButtonGroup'
import { PasswordField } from '~/src/components/Auth/PasswordField'
import Layout from '@/components/Layout/Layout'

const SignUp: NextPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })

  return (
    <Layout title="Home">
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Create an account</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Already have an account?</Text>
                <Button variant="link" colorScheme="blue">
                  Log in
                </Button>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={boxBackgroundVariant}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <HStack>
                  <FormControl>
                    <FormLabel htmlFor="first-name">First Name</FormLabel>
                    <Input id="first-name" type="text" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="last-name">Last Name</FormLabel>
                    <Input id="last-name" type="text" />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
                <PasswordField />
                <PasswordField />
              </Stack>

              <Stack spacing="6">
                <Button variant="primary">Sign in</Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default SignUp