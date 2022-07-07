import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useControllableState,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { EmailField } from '~/src/components/Auth/EmailField'
import { PasswordField } from '~/src/components/Auth/PasswordField'
import Layout from '~/src/components/Layout/Layout'
import AuthService from '@/hooks/auth'

const PasswordReset = () => {
  const router = useRouter()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [emailValue, setEmailValue] = useControllableState({
    value: email,
    defaultValue: '',
    onChange: setEmail,
    shouldUpdate: (prev, next) => prev === '' && next !== '' && next !== undefined,
  })
  const [token, setToken] = useControllableState({ defaultValue: '' })
  const [password, setPassword] = useControllableState({ defaultValue: '' })
  const [passwordConfirmation, setPasswordConfirmation] = useControllableState({ defaultValue: '' })

  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { data, status } = await AuthService.resetPassword({
      email: emailValue,
      token,
      password,
      password_confirmation: passwordConfirmation,
    })
    if (status === 202) {
      toast({
        title: data.message,
      })
      void router.push('/login')
    }
    if (data.errors) {
      toast({
        title: 'Error',
        description: data.errors.message,
      })
    }
  }

  useEffect(() => {
    if (router.query) {
      setEmailValue(router.query.email as string)
      setToken(router.query.token as string)
    }
  }, [router.query])

  useEffect(() => {
    console.log(email)
  }, [email])

  return (
    <Layout title="Reset Password">
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={boxBackgroundVariant}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                {/* Email Address */}
                <FormControl>
                  <EmailField
                    id="email"
                    type="email"
                    value={emailValue}
                    onChange={(event) => setEmailValue(event.target.value)}
                    isDisabled={token ? true : false}
                    isRequired
                  />
                </FormControl>

                {/* Password */}
                <FormControl>
                  <PasswordField
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    isRequired
                  />
                </FormControl>

                {/* Confirm Password */}
                <FormControl>
                  <PasswordField
                    id="password-confirm"
                    value={passwordConfirmation}
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <FormControl>
                  <Button variant="primary" onClick={handleSubmit}>
                    Reset Password
                  </Button>
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default PasswordReset
