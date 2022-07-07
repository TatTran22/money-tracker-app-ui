import {
  Box,
  Button,
  Container,
  SkeletonText,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout/Layout'
import AuthService from '@/hooks/auth'

const VerifyEmail: NextPage = () => {
  const router = useRouter()
  const toast = useToast()
  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isVerifyPage, setIsVerifyPage] = useState(false)
  const [isVerifySuccess, setIsVerifySuccess] = useState(false)

  const onResendEmail = async () => {
    setIsLoading(true)
    const { data, status } = await AuthService.resendEmailVerification()
    if (status === 202) {
      setIsSuccess(true)
      toast({
        title: 'Email Verification Sent',
        description: data.message,
        status: 'success',
      })
      return
    }

    toast({
      title: 'Email Verification Failed',
      description: data.message,
      status: 'error',
    })
    setIsLoading(false)
  }

  const onLogout = async () => {
    const { status } = await AuthService.logout()
    if (status === 204) {
      void router.push('/login')
    }
  }

  useEffect(() => {
    if (router.query) {
      const verifyUrl = router.query.verify_url
      if (
        verifyUrl &&
        typeof verifyUrl === 'string' &&
        verifyUrl.includes('verify-email') &&
        verifyUrl.includes('signature') &&
        verifyUrl.includes('expires')
      ) {
        setIsVerifyPage(true)
        const verifyEmail = async ({ id, hash, query }: { id: string; hash: string; query: string }) => {
          setIsLoading(true)
          const { data, status } = await AuthService.verifyEmail({ id, hash, query })
          if (status === 202) {
            setIsVerifySuccess(true)
            toast({
              title: 'Email Verified',
              description: data.message,
              status: 'success',
            })
          } else {
            toast({
              title: 'Email Verification Failed',
              description: data.message ? data.message : 'Email verification failed',
              status: 'error',
            })
          }

          setIsLoading(false)
        }
        const url = new URL(verifyUrl)
        console.log(url)
        console.log(url.search)
        const [id, hash] = url.pathname.split('/verify-email/')[1].split('/')
        verifyEmail({ id, hash, query: url.search }).catch((err) => {
          console.log(err)
        })
      }
    }
  }, [router.query])

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      const { data } = await AuthService.me()
      if (!data.user) {
        void router.push('/login')
      }
      setIsLoading(false)
    }

    fetchUser().catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <Layout title="Verify Email">
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={boxBackgroundVariant}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            {!isVerifyPage ? (
              <Stack spacing="6">
                <Text color="muted">
                  Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                  link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                </Text>
                {isSuccess && (
                  <Text>
                    A new verification link has been sent to the email address you provided during registration.
                  </Text>
                )}
                <Button isLoading={isLoading} onClick={onResendEmail} isDisabled={isSuccess}>
                  Resend Verification Email
                </Button>
                <Button type="button" onClick={onLogout} isLoading={isLoading}>
                  Logout
                </Button>
              </Stack>
            ) : (
              <Stack spacing="6">
                {!isVerifySuccess ? (
                  <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonText mt="4" noOfLines={4} spacing="4" />
                  </Box>
                ) : (
                  <Text>
                    Thanks for signing up! Before getting started, could you verify your email address by clicking on
                    the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                  </Text>
                )}
                <Text color="muted">Thanks for verifying your email address! You can now login to your account.</Text>
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default VerifyEmail
