import { useState } from 'react'
import { Stack, Text, Button } from '@chakra-ui/react'
import { Container } from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import { useAuth } from '@/hooks/auth'

const VerifyEmail = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
  })
  const [status, setStatus] = useState<string | null>(null)

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
          <Button onClick={() => resendEmailVerification({ setStatus })}>Resend Verification Email</Button>
          <Button type="button" onClick={logout}>
            Logout
          </Button>
        </Stack>
      </Container>
    </Layout>
  )
}

export default VerifyEmail
