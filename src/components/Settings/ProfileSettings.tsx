import {
  Box,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  FormControl,
  Stack,
  FormLabel,
  chakra,
  Button,
  Flex,
  FormHelperText,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  VisuallyHidden,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Avatar from './Avatar'
import SimpleSidebar from '~/src/components/Layout/SideBar'

interface ProfileSettingsProps {
  user: User
  onSubmit: (user: Partial<User>) => void
}

const ProfileSettings = ({ user, onSubmit }: ProfileSettingsProps) => {
  const [formState, setFormState] = useState<Partial<User>>({
    website: user.website,
    bio: user.bio,
    avatar_url: user.avatar_url,
  })

  const onAvatarChange = (avatar: string) => {
    setFormState({ ...formState, avatar_url: avatar })
  }

  useEffect(() => {
    console.log('ProfileSettings', user)
  }, [])

  return (
    <Box>
      <SimpleGrid
        display={{
          base: 'initial',
          md: 'grid',
        }}
        columns={{
          md: 3,
        }}
        spacing={{
          md: 6,
        }}
      >
        <GridItem
          colSpan={{
            md: 1,
          }}
        >
          <SimpleSidebar></SimpleSidebar>
        </GridItem>
        <GridItem
          mt={[5, null, 0]}
          colSpan={{
            md: 2,
          }}
        >
          <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, 'md']}
            overflow={{
              sm: 'hidden',
            }}
            onSubmit={(e) => {
              e.preventDefault()
              console.log(e)
              onSubmit({})
            }}
          >
            <Stack
              px={4}
              py={5}
              bg="white"
              _dark={{
                bg: '#141517',
              }}
              spacing={6}
              p={{
                sm: 6,
              }}
            >
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: 'gray.50',
                  }}
                >
                  Photo
                </FormLabel>
                <Avatar
                  user={user}
                  tempAvatarUrl={formState.avatar_url ? formState.avatar_url : ''}
                  onAvatarChange={onAvatarChange}
                />
              </FormControl>
              <SimpleGrid columns={3} spacing={6}>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    Website
                  </FormLabel>
                  <InputGroup size="sm">
                    <InputLeftAddon
                      bg="gray.50"
                      _dark={{
                        bg: 'gray.800',
                      }}
                      color="gray.500"
                      rounded="md"
                    >
                      https://
                    </InputLeftAddon>
                    <Input
                      type="tel"
                      placeholder="www.example.com"
                      focusBorderColor="brand.400"
                      rounded="md"
                      value={formState.website ? formState.website : ''}
                      onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                    />
                  </InputGroup>
                </FormControl>
              </SimpleGrid>

              <Box>
                <FormControl id="email" mt={1}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    About
                  </FormLabel>
                  <Textarea
                    placeholder="you@example.com"
                    mt={1}
                    rows={3}
                    shadow="sm"
                    focusBorderColor="brand.400"
                    fontSize={{
                      sm: 'sm',
                    }}
                    value={formState.bio ? formState.bio : ''}
                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  />
                  <FormHelperText>Brief description for your profile. URLs are hyperlinked.</FormHelperText>
                </FormControl>
              </Box>

              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: 'gray.50',
                  }}
                >
                  Cover photo
                </FormLabel>
                <Flex
                  mt={1}
                  justify="center"
                  px={6}
                  pt={5}
                  pb={6}
                  borderWidth={2}
                  _dark={{
                    color: 'gray.500',
                  }}
                  borderStyle="dashed"
                  rounded="md"
                >
                  <Stack spacing={1} textAlign="center">
                    <Icon
                      mx="auto"
                      boxSize={12}
                      color="gray.400"
                      _dark={{
                        color: 'gray.500',
                      }}
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Icon>
                    <Flex
                      fontSize="sm"
                      color="gray.600"
                      _dark={{
                        color: 'gray.400',
                      }}
                      alignItems="baseline"
                    >
                      <chakra.label
                        htmlFor="file-upload"
                        cursor="pointer"
                        rounded="md"
                        fontSize="md"
                        color="brand.600"
                        _dark={{
                          color: 'brand.200',
                        }}
                        pos="relative"
                        _hover={{
                          color: 'brand.400',
                          _dark: {
                            color: 'brand.300',
                          },
                        }}
                      >
                        <span>Upload a file</span>
                        <VisuallyHidden>
                          <input id="file-upload" name="file-upload" type="file" aria-label="file-upload" />
                        </VisuallyHidden>
                      </chakra.label>
                      <Text pl={1}>or drag and drop</Text>
                    </Flex>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      PNG, JPG, GIF up to 10MB
                    </Text>
                  </Stack>
                </Flex>
              </FormControl>
            </Stack>
            <Box
              px={{
                base: 4,
                sm: 6,
              }}
              py={3}
              bg="gray.50"
              _dark={{
                bg: '#121212',
              }}
              textAlign="right"
            >
              <Button
                type="submit"
                colorScheme="brand"
                _focus={{
                  shadow: '',
                }}
                fontWeight="md"
              >
                Save
              </Button>
            </Box>
          </chakra.form>
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

export default ProfileSettings
