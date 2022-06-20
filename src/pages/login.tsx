import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  useToast,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState, createRef } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Logo } from '~/src/components/Auth/Logo'
// import { OAuthButtonGroup } from '~/src/components/Auth/OAuthButtonGroup'
import { PasswordField } from '~/src/components/Auth/PasswordField'
import { EmailField } from '~/src/components/Auth/EmailField'
import Layout from '@/components/Layout/Layout'
import AuthService from '@/hooks/auth'
import { useUser } from '@/hooks/AuthUser'
import Router from 'next/router'

const Login: NextPage = () => {
  const toast = useToast()
  const [rememberMe, setRememberMe] = useState(true)
  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })
  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()
  const { setUser } = useUser()

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) => {
    event.preventDefault()
    console.log('submit')
    if (emailRef.current && passwordRef.current) {
      const { data, status }: { data: Token & { user: User }; status: number } = await AuthService.login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      if (status === 200) {
        setUser(data.user)
        toast({
          title: 'Login Successful',
        })
        void Router.push('/')
      } else {
        toast({
          title: 'Login Failed',
          description: 'Please check your credentials',
          status: 'error',
        })
      }
    }
  }

  return (
    <Layout title="Login">
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Log in to your account</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <Link href="/signup">
                  <Button variant="link" colorScheme="blue">
                    Sign up
                  </Button>
                </Link>
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
                <EmailField
                  ref={emailRef}
                  placeholder="Enter your email"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      void onSubmit(e)
                    }
                  }}
                />
                <PasswordField
                  ref={passwordRef}
                  placeholder="Enter your password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      void onSubmit(e)
                    }
                  }}
                />
              </Stack>
              <HStack justify="space-between">
                <Checkbox
                  id="rememberMe"
                  isChecked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked)
                  }}
                >
                  Remember me
                </Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button variant="primary" onClick={onSubmit}>
                  Sign in
                </Button>
                <HStack hidden>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                {/* <OAuthButtonGroup /> */}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default Login
