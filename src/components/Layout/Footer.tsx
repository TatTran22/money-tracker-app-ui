import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

import SocialButton from '@/components/SocialButton'
import siteMeta from '@/data/siteMetadata'

export default function Footer() {
  return (
    <Box bg={useColorModeValue('lightGreen.100', 'gray.900')} color={useColorModeValue('darkGreen.200', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>{`© ${siteMeta.title} ${new Date().getFullYear()} - All rights reserved`}</Text>
        <Stack direction={'row'} spacing={6} hidden>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
