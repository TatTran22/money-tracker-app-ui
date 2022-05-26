import { Fragment, ReactNode } from 'react'
import Head from './Head'
import Footer from './Footer'
import Navbar from './Navbar'
import { Flex, Grid } from '@chakra-ui/react'

interface Props {
  children?: ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <Fragment>
      <Head title={title} />
      <Flex minH="100vh" flexDirection={'column'}>
        <Navbar />
        <Grid minH={'100%'} padding={'1.5rem'} as={'main'} flexGrow={1}>
          {children}
        </Grid>
        <Footer />
      </Flex>
    </Fragment>
  )
}

export default Layout
