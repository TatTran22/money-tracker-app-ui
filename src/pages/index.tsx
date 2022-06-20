import { Text } from '@chakra-ui/react'

import { Hero } from '@/components/Hero'
import { Container } from '@/components/Container'
import { Main } from '@/components/Main'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import Layout from '@/components/Layout/Layout'
import siteMeta from '@/data/siteMetadata'
import AuthUser from '@/hooks/AuthUser'

const Index = () => {
  const user = AuthUser()

  return (
    <Layout title="Home">
      <Container height="100vh">
        <Hero title={siteMeta.title} />
        <Main>{user ? <Text>Hello {user.email}</Text> : <CTA />}</Main>
        <Footer>
          <Text>Next ❤️ Chakra</Text>
        </Footer>
      </Container>
    </Layout>
  )
}

export default Index
