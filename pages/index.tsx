import { ConnectWallet } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import { Heading, Box, Text } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import Container from './components/Container'

const Home: NextPage = () => (
  <Box className={styles.container}>
    <Container alignItems="center">
      <Heading as="h1">
        Welcome to
        ThirdWeb (NextJS TypeScript Chakra) Starter
      </Heading>
      <Text pt="32px">
        Get started by configuring your desired network in file!
      </Text>
      <Box pt="32px">
        <ConnectWallet />
      </Box>
    </Container>
  </Box>
)

export default Home
