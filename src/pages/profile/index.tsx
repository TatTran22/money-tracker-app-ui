import { Box, Container, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react'
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AuthService from '~/src/hooks/auth'

const Profile = () => {
  const router = useRouter()
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
        {loading || !currentUser ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <Box padding="6" boxShadow="lg" bg="white">
            <Text>{currentUser.email}</Text>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default Profile
