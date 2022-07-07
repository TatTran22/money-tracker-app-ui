import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Logo } from '~/src/components/Auth/Logo'
import { EmailField } from '~/src/components/Auth/EmailField'
import Layout from '@/components/Layout/Layout'
import AuthService from '@/hooks/auth'

const ForgotPassword: NextPage = () => {
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(e)
    if (email) {
      const { data, status }: { data: { message: string }; status: number } = await AuthService.forgotPassword({
        email,
      })
      if (status === 202) {
        toast({
          title: 'Password Reset Email Sent',
          description: data.message,
        })
        setIsSuccess(true)
      } else {
        toast({
          title: 'Password Reset Failed',
          description: data.message,
          status: 'error',
        })
      }
    }
    setIsLoading(false)
  }

  return (
    <Layout title="Forgot Password">
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Forgot Password</Heading>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      void onSubmit(e)
                    }
                  }}
                />
              </Stack>
              <Stack spacing="6">
                <Button variant="primary" onClick={(e) => onSubmit(e)} isLoading={isLoading} isDisabled={isSuccess}>
                  {isSuccess ? 'Email Sent' : 'Send Email'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default ForgotPassword
