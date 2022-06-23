// import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  Link,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/AuthUser'
import AuthService from '~/src/hooks/auth'
import { DarkModeSwitch } from '@/components/DarkModeSwitch'

export default function NavBar() {
  const router = useRouter()
  const toast = useToast()
  const { user, setUser } = useUser()

  const onLogout = async () => {
    const { status } = await AuthService.logout()
    if (status === 204) {
      setUser(null)
      toast({ title: 'Logout Successful' })
    }
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position="sticky" top={0} zIndex={1}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link href="/">
            <Box>Logo</Box>
          </Link>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <DarkModeSwitch />
              {user ? (
                <Menu>
                  <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                    <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar size={'2xl'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button
                  as={Link}
                  isExternal
                  variant="primary"
                  rounded="button"
                  flexGrow={3}
                  mx={2}
                  width="full"
                  onClick={() => {
                    void router.push('/login')
                  }}
                >
                  Login
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
