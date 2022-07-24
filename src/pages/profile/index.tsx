import { Box, Container, SkeletonCircle, SkeletonText, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AuthService from '~/src/hooks/auth'
import Profile from '~/src/components/Profile'

const ProfilePage = () => {
  const router = useRouter()
  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchUser = async () => {
    setLoading(true)
    const { data } = await AuthService.me()
    if (!data.user) {
      void router.push('/login')
    }
    setCurrentUser(data.user)
    setLoading(false)
  }

  useEffect(() => {
    void fetchUser()
  }, [])

  return (
    <Layout title={currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Loading...'}>
      <Container height="100vh">
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={boxBackgroundVariant}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          {loading || !currentUser ? (
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
          ) : (
            <Profile currentUser={currentUser} />
          )}
        </Box>
      </Container>
    </Layout>
  )
}

export default ProfilePage
