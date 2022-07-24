import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
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
type CountryCodeKeys = keyof typeof countries

const Profile = () => {
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifySent, setIsVerifySent] = useState(false)
  const [userProfile, setUserProfile] = useState<User>()
  const [email, setEmail] = useState('')
  const [emailValue, setEmailValue] = useControllableState({
    value: email,
    defaultValue: '',
    onChange: setEmail,
    shouldUpdate: (prev, next) => prev === '' && next !== '' && next !== undefined,
  })
  const [phone, setPhone] = useState('')
  const [phoneNumber, setPhoneNumber] = useControllableState({
    value: phone,
    defaultValue: '',
    onChange: setPhone,
    shouldUpdate: (_prev, next) => /\+|\d|^$/.test(next.slice(-1)),
  })
  // const [password, setPassword] = useControllableState({ defaultValue: '' })
  // const [passwordConfirmation, setPasswordConfirmation] = useControllableState({ defaultValue: '' })
  const boxBackgroundVariant = useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })

  const [countriesArray, setCountriesArray] = useState<
    {
      code: CountryCodeKeys
      name: string
      flag: string
    }[]
  >([])
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

  const onUpdateProfile = () => {
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

    setCountriesArray(
      countryCode.map((key) => {
        return {
          code: key,
          name: countries[key].name,
          flag: countries[key].emoji,
        }
      })
    )
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
                    <FormControl variant="floating">
                      <FormLabel htmlFor="first-name">First name</FormLabel>
                      <InputGroup>
                        <Input
                          id="first-name"
                          placeholder=" "
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
                    <FormControl variant="floating">
                      <FormLabel htmlFor="last-name">Last name</FormLabel>
                      <InputGroup>
                        <Input
                          id="last-name"
                          value={userProfile.last_name}
                          name="last-name"
                          placeholder=" "
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
                    <FormControl isInvalid={!userProfile.email_verified_at} isReadOnly variant="floating">
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <InputGroup>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={emailValue}
                          required
                          isDisabled
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
                      {userProfile.email_verified_at ? (
                        <FormHelperText>
                          {`Verified at: ${new Date(userProfile.email_verified_at).toLocaleDateString()}`}
                        </FormHelperText>
                      ) : (
                        <FormErrorMessage>Email address is not verified.</FormErrorMessage>
                      )}
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel htmlFor="nickname">Nickname</FormLabel>
                    <InputGroup>
                      <Input
                        id="nickname"
                        value={userProfile.nickname}
                        name="nickname"
                        type="text"
                        required
                        onChange={(e) => {
                          setUserProfile((user) => ({ ...user, nickname: e.target.value }))
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="date-of-birth">Date of birth</FormLabel>
                    <InputGroup>
                      <Input
                        id="date-of-birth"
                        value={userProfile.birthday || ''}
                        name="date-of-birth"
                        type="date"
                        required
                        onChange={(e) => {
                          setUserProfile((user) => ({ ...user, birthday: e.target.value }))
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl variant="floating" isRequired>
                    <FormLabel htmlFor="phone-number">Phone number</FormLabel>
                    <InputGroup>
                      <Input
                        id="phone-number"
                        value={phoneNumber}
                        name="phone-number"
                        type="tel"
                        placeholder=" "
                        onChange={({ target }) => {
                          setPhoneNumber(target.value)
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="country-code">Country</FormLabel>
                    <Select
                      id="country-code"
                      placeholder="Select country"
                      name="country"
                      value={userProfile.country_code || ''}
                      onChange={(e) => {
                        setUserProfile({ ...userProfile, country_code: e.target.value })
                      }}
                    >
                      {countriesArray.map((country) => (
                        <option key={country.code} value={country.code}>
                          {`${country.flag} ${country.name}`}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <FormControl>
                    <Button variant="primary" onClick={onUpdateProfile}>
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
