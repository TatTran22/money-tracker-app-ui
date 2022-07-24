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
  Select,
  Button,
  Input,
} from '@chakra-ui/react'
import { useEffect } from 'react'

interface PersonalInfoSettingsProps {
  user: User
  onSubmit: (user: Partial<User>) => void
}

const PersonalInfoSettings = (props: PersonalInfoSettingsProps) => {
  useEffect(() => {
    console.log('PersonalInfoSettings', props)
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
              Personal Information
            </Heading>
            <Text
              mt={1}
              fontSize="sm"
              color="gray.600"
              _dark={{
                color: 'gray.400',
              }}
            >
              Use a permanent address where you can receive mail.
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
              <SimpleGrid columns={6} spacing={6}>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="first_name"
                    fontSize="sm"
                    fontWeight="md"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    First name
                  </FormLabel>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="last_name"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    Last name
                  </FormLabel>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 4]}>
                  <FormLabel
                    htmlFor="email_address"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    Email address
                  </FormLabel>
                  <Input
                    type="text"
                    name="email_address"
                    id="email_address"
                    autoComplete="email"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="country"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    Country / Region
                  </FormLabel>
                  <Select
                    id="country"
                    name="country"
                    aria-label="country"
                    autoComplete="country"
                    placeholder="Select option"
                    title="Select option"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </Select>
                </FormControl>

                <FormControl as={GridItem} colSpan={6}>
                  <FormLabel
                    htmlFor="street_address"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    Street address
                  </FormLabel>
                  <Input
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                  <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    City
                  </FormLabel>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                  <FormLabel
                    htmlFor="state"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    State / Province
                  </FormLabel>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="state"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                  <FormLabel
                    htmlFor="postal_code"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    ZIP / Postal
                  </FormLabel>
                  <Input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    autoComplete="postal-code"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>
              </SimpleGrid>
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
                onClick={() => {
                  props.onSubmit('aa')
                }}
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

export default PersonalInfoSettings
