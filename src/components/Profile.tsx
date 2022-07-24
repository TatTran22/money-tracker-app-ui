import { Box, Divider } from '@chakra-ui/react'
import { useEffect } from 'react'
import ProfileSettings from './Settings/ProfileSettings'
import PersonalInfoSettings from './Settings/PersonalInfoSettings'
import NotificationSettings from './Settings/NotificationSettings'
interface ProfileProps {
  currentUser: User
}
const Profile = (props: ProfileProps) => {
  const onSubmit = (user: Partial<User>) => {
    console.log('onSubmit', user)
  }

  useEffect(() => {
    console.log(props)

    return () => {}
  }, [])

  return (
    <Box p={10}>
      <ProfileSettings user={props.currentUser} onSubmit={onSubmit} />
      <Divider
        my="5"
        borderColor="gray.300"
        _dark={{
          borderColor: 'whiteAlpha.300',
        }}
        visibility={{
          base: 'hidden',
          sm: 'visible',
        }}
      />

      <PersonalInfoSettings user={props.currentUser} onSubmit={onSubmit} />

      <Divider
        my="5"
        borderColor="gray.300"
        _dark={{
          borderColor: 'whiteAlpha.300',
        }}
        visibility={{
          base: 'hidden',
          sm: 'visible',
        }}
      />

      <NotificationSettings user={props.currentUser} onSubmit={onSubmit} />
    </Box>
  )
}

export default Profile
