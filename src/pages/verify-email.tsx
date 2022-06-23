// import { useState } from 'react'
import { Stack, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import AuthService from '@/hooks/auth'

const VerifyEmail = () => {
  const router = useRouter()
  // const [status, setStatus] = useState<string | null>(null)
  const onLogout = async () => {
    const { status } = await AuthService.logout()
    if (status === 204) {
      void router.push('/login')
    }
  }
  return (
    <Layout title="Verify Email">
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Text color="muted">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
            we just emailed to you? If you didn't receive the email, we will gladly send you another.
          </Text>
          {status === 'verification-link-sent' && (
            <Text>A new verification link has been sent to the email address you provided during registration.</Text>
          )}
          <Button>Resend Verification Email</Button>
          <Button type="button" onClick={onLogout}>
            Logout
          </Button>
        </Stack>
      </Container>
    </Layout>
  )
}

export default VerifyEmail
