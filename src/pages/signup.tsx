import {
  Box,
  Button,
  Container,
  // Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState, createRef } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { Logo } from '~/src/components/Auth/Logo'
// import { OAuthButtonGroup } from '~/src/components/Auth/OAuthButtonGroup'
import { EmailField } from '~/src/components/Auth/EmailField'
import { PasswordField } from '~/src/components/Auth/PasswordField'
import Layout from '@/components/Layout/Layout'
import AuthService from '@/hooks/auth'
import { useUser } from '@/hooks/AuthUser'

const SignUp: NextPage = () => {
  const toast = useToast()
  const { setUser } = useUser()
  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })
  const [name, setName] = useState({
    first: '',
    last: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()
  const passwordConfirmRef = createRef<HTMLInputElement>()

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) => {
    event.preventDefault()
    setIsLoading(true)
    console.log('submit')
    if (emailRef.current && passwordRef.current && passwordConfirmRef.current) {
      const { data, status }: { data: { user?: User; errors?: SignUpError }; status: number } =
        await AuthService.register({
          first_name: name.first,
          last_name: name.last,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmRef.current.value,
        })
      console.log(data)
      if (data.user && status == 201) {
        setUser(data.user)
        toast({
          title: 'Registration Successful',
          status: 'success',
        })
        void Router.push('/')
      } else if (data.errors) {
        let errorMessage = ''
        Object.keys(data.errors)
          .filter((err) => err)
          .forEach((err) => {
            errorMessage += `${err[0]}`
          })
        toast({
          title: 'Registration Failed',
          description: errorMessage,
          status: 'error',
        })
      }
    }
    setIsLoading(false)
  }

  return (
    <Layout title="Sign Up">
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Create an account</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Already have an account?</Text>
                <Link href="/login">
                  <Button variant="link" colorScheme="blue">
                    Log in
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
                <HStack>
                  <FormControl>
                    <FormLabel htmlFor="first-name">First Name</FormLabel>
                    <Input
                      id="first-name"
                      type="text"
                      name="first-name"
                      value={name.first}
                      onChange={(event) => setName({ ...name, first: event.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="last-name">Last Name</FormLabel>
                    <Input
                      id="last-name"
                      type="text"
                      name="last-name"
                      value={name.last}
                      onChange={(event) => setName({ ...name, last: event.target.value })}
                    />
                  </FormControl>
                </HStack>

                <EmailField ref={emailRef} />
                <PasswordField ref={passwordRef} />
                <PasswordField ref={passwordConfirmRef} id="password-confirm" />
              </Stack>

              <Stack spacing="6">
                <Button variant="primary" onClick={onSubmit} isLoading={isLoading}>
                  Sign up
                </Button>
                {/* <HStack hidden>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup  /> */}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default SignUp
