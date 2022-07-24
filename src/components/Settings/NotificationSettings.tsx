import {
  Box,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  chakra,
  Button,
  Flex,
  Checkbox,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import { useEffect } from 'react'

interface NotificationSettingsProps {
  user: User
  onSubmit: (user: User) => void
}

const NotificationSettings = (props: NotificationSettingsProps) => {
  useEffect(() => {
    console.log('NotificationSettings', props)
  }, [])

  return (
    <Box mt={[10, 0]}>
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
          <Box px={[4, 0]}>
            <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
              Notifications
            </Heading>
            <Text
              mt={1}
              fontSize="sm"
              color="gray.600"
              _dark={{
                color: 'gray.400',
              }}
            >
              Decide which communications you'd like to receive and how.
            </Text>
          </Box>
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
          >
            <Stack
              px={4}
              py={5}
              p={[null, 6]}
              bg="white"
              _dark={{
                bg: '#141517',
              }}
              spacing={6}
            >
              <chakra.fieldset>
                <Box
                  as="legend"
                  fontSize="md"
                  color="gray.900"
                  _dark={{
                    color: 'gray.50',
                  }}
                >
                  By Email
                </Box>
                <Stack mt={4} spacing={4}>
                  <Flex alignItems="start">
                    <Flex alignItems="center" h={5}>
                      <Checkbox colorScheme="brand" id="comments" rounded="md" />
                    </Flex>
                    <Box ml={3} fontSize="sm">
                      <chakra.label
                        htmlFor="comments"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Comments
                      </chakra.label>
                      <Text
                        color="gray.500"
                        _dark={{
                          color: 'gray.400',
                        }}
                      >
                        Get notified when someones posts a comment on a posting.
                      </Text>
                    </Box>
                  </Flex>
                  <Flex alignItems="start">
                    <Flex alignItems="center" h={5}>
                      <Checkbox colorScheme="brand" id="candidates" rounded="md" />
                    </Flex>
                    <Box ml={3} fontSize="sm">
                      <chakra.label
                        htmlFor="candidates"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Candidates
                      </chakra.label>
                      <Text
                        color="gray.500"
                        _dark={{
                          color: 'gray.400',
                        }}
                      >
                        Get notified when a candidate applies for a job.
                      </Text>
                    </Box>
                  </Flex>
                  <Flex alignItems="start">
                    <Flex alignItems="center" h={5}>
                      <Checkbox colorScheme="brand" id="offers" rounded="md" />
                    </Flex>
                    <Box ml={3} fontSize="sm">
                      <chakra.label
                        htmlFor="offers"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Offers
                      </chakra.label>
                      <Text
                        color="gray.500"
                        _dark={{
                          color: 'gray.400',
                        }}
                      >
                        Get notified when a candidate accepts or rejects an offer.
                      </Text>
                    </Box>
                  </Flex>
                </Stack>
              </chakra.fieldset>
              <chakra.fieldset>
                <Box
                  as="legend"
                  fontSize="md"
                  color="gray.900"
                  _dark={{
                    color: 'gray.50',
                  }}
                >
                  Push Notifications
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    _dark={{
                      color: 'gray.400',
                    }}
                  >
                    These are delivered via SMS to your mobile phone.
                  </Text>
                </Box>
                <RadioGroup
                  fontSize="sm"
                  color="gray.700"
                  _dark={{
                    color: 'gray.50',
                  }}
                  colorScheme="brand"
                  mt={4}
                  defaultValue="1"
                >
                  <Stack spacing={4}>
                    <Radio spacing={3} value="1">
                      Everything
                    </Radio>
                    <Radio spacing={3} value="2">
                      Same as email
                    </Radio>
                    <Radio spacing={3} value="3">
                      No push notifications
                    </Radio>
                  </Stack>
                </RadioGroup>
              </chakra.fieldset>
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

export default NotificationSettings
