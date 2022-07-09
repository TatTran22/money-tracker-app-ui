import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  Select,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useControllableState,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { countries, getEmojiFlag } from 'countries-list'
import Layout from '~/src/components/Layout/Layout'
import AuthService from '@/hooks/auth'

const Profile = () => {
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifySent, setIsVerifySent] = useState(false)
  const [email, setEmail] = useState('')
  const [userProfile, setUserProfile] = useState<User>()
  const [emailValue, setEmailValue] = useControllableState({
    value: email,
    defaultValue: '',
    onChange: setEmail,
    shouldUpdate: (prev, next) => prev === '' && next !== '' && next !== undefined,
  })
  // const [password, setPassword] = useControllableState({ defaultValue: '' })
  // const [passwordConfirmation, setPasswordConfirmation] = useControllableState({ defaultValue: '' })
  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })
  const [countriesArray, setCountriesArray] = useState<
    {
      code: string
      name: string
      flag: string
    }[]
  >()
  type CountryCodeKeys = keyof typeof countries

  const getUserProfile = async (nickname: string) => {
    const { data }: { data: { user: User; errors?: ErrorResponse } } = await AuthService.getUserProfile(nickname)
    if (!data.errors) {
      console.log(data)
      setUserProfile(data.user)
      setEmailValue(data.user.email)
    }
  }

  const onResendEmail = async () => {
    setIsLoading(true)
    const { data, status } = await AuthService.resendEmailVerification()
    if (status === 202) {
      setIsVerifySent(true)
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

  const onSave = () => {
    console.log('onSave')
  }

  useEffect(() => {
    if (router.query) {
      const nickname = router.query.nickname as string
      if (nickname) {
        getUserProfile(nickname).catch(console.error)
      }
    }
  }, [router.query])

  useEffect(() => {
    const countryCode = Object.keys(countries) as [CountryCodeKeys]
    if (!countriesArray) {
      setCountriesArray(
        countryCode.map((key) => {
          return {
            code: key,
            name: countries[key].name,
            flag: countries[key].emoji,
          }
        })
      )
    }
  }, [countries])

  return (
    <Layout title={userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'Loading'}>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={boxBackgroundVariant}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            {userProfile ? (
              <Stack spacing="6">
                <Stack spacing="5">
                  <HStack spacing="5">
                    <Avatar
                      size="lg"
                      name={`${userProfile.first_name} ${userProfile.last_name}`}
                      src={userProfile.avatar_url || undefined}
                    />
                    <Stack>
                      <Heading as="h2" size="sm" noOfLines={1}>
                        {`${userProfile.country_code ? getEmojiFlag(userProfile.country_code) : ''} ${
                          userProfile.first_name
                        } ${userProfile.last_name}`}
                      </Heading>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold">
                          {userProfile.nickname}
                        </Text>
                        <Text fontSize="sm">Member since {new Date(userProfile.created_at).toLocaleDateString()}</Text>
                      </Box>
                    </Stack>
                  </HStack>
                  <HStack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="first-name">First name</FormLabel>
                      <InputGroup>
                        <Input
                          id="first-name"
                          value={userProfile.first_name}
                          name="first-name"
                          type="text"
                          required
                          onChange={(e) => {
                            setUserProfile({ ...userProfile, first_name: e.target.value })
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="last-name">Last name</FormLabel>
                      <InputGroup>
                        <Input
                          id="last-name"
                          value={userProfile.last_name}
                          name="last-name"
                          type="text"
                          required
                          onChange={(e) => {
                            setUserProfile({ ...userProfile, last_name: e.target.value })
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                  </HStack>
                  <HStack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <InputGroup>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={emailValue}
                          required
                          onChange={(event) => setEmailValue(event.target.value)}
                        />
                        {!userProfile.email_verified_at && (
                          <Button
                            isLoading={isLoading && !isVerifySent}
                            onClick={onResendEmail}
                            ml={2}
                            isDisabled={isVerifySent}
                          >
                            {isVerifySent ? 'Sent' : 'Verify'}
                          </Button>
                        )}
                      </InputGroup>
                      {!userProfile.email_verified_at && (
                        <FormHelperText>You need to verify your email address</FormHelperText>
                      )}
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    {countriesArray && (
                      <Select id="country" placeholder="Select country">
                        {countriesArray.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <FormControl>
                    <Button variant="primary" onClick={onSave}>
                      Save
                    </Button>
                  </FormControl>
                </Stack>
              </Stack>
            ) : (
              <Skeleton></Skeleton>
            )}
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default Profile
