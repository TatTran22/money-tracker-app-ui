import {
  Box,
  Button,
  Container,
  Flex,
  Link,
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
  const [isVerifyPage, setIsVerifyPage] = useState(false)
  const [isVerifySuccess, setIsVerifySuccess] = useState(false)

  const verifyEmail = async (url: string) => {
    setIsLoading(true)
    const { data, status } = await AuthService.verifyEmail(url)

    if (!data.errors) {
      setIsVerifySuccess(true)
      toast({
        title: data.message,
        status: 'success',
        id: 'verify-email',
      })
    } else {
      if (!toast.isActive('verify-email')) {
        toast({
          title: data.errors.message ? data.errors.message : 'Email verification failed',
          status: 'error',
          id: 'verify-email',
        })
      }

      if (status === 401) {
        const encodedUrl = encodeURIComponent(router.asPath)
        void router.push(`/login?callback=${encodedUrl}`)
      }
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (router.query) {
      const verifyUrl = router.query.verify_url
      if (verifyUrl && typeof verifyUrl === 'string' && verifyUrl.includes('verify-email')) {
        setIsVerifyPage(true)
        if (!isVerifySuccess && !isLoading) {
          verifyEmail(verifyUrl).catch((err) => {
            console.log(err)
          })
        }
        console.log(isVerifyPage)
      }
    }
  }, [router.query])
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
            <Flex justifyContent="center" alignItems="center">
              <Stack spacing="6">
                {!isVerifySuccess ? (
                  <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonText mt="4" noOfLines={4} spacing="4" />
                  </Box>
                ) : (
                  <Text color="muted">Thanks for verifying your email address!</Text>
                )}
                {!isVerifyPage && (
                  <Text color="muted">You are not on the correct page to verify your email address.</Text>
                )}
                <Link href="/">
                  <Button
                    variant="secondary"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    mt="4"
                    mb="4"
                    size="lg"
                    width="100%"
                    onClick={() => {
                      void router.push('/')
                    }}
                  >
                    Back to Home
                  </Button>
                </Link>
              </Stack>
            </Flex>
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default VerifyEmail
