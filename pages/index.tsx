import {
  ConnectWallet,
  useAddress,
  useUser,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import {
  Heading, Box, Text, Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Container from './components/Container'

const Home: NextPage = () => {
  const address = useAddress()
  const { user, isLoggedIn } = useUser()
  const [secret, setSecret] = useState()
  const getSecret = async () => {
    const res = await fetch('/api/secrets')
    const data = await res.json()
    setSecret(data.message)
  }
  return (
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
        <Button onClick={async () => getSecret()}>
          Get Secret
        </Button>
        <Text>
          Connected Wallet:
          {' '}
          {address}
        </Text>
        <Text pb="14px">
          isLoggedIn:
          {' '}
          {isLoggedIn ? 'true' : 'false'}
        </Text>
        <Text>
          User:
          {' '}
          {JSON.stringify(user?.address, undefined, 2) || 'N/A'}
        </Text>
        <Text>
          Secret:
          {' '}
          {secret || 'N/A'}
        </Text>
      </Container>
    </Box>
  )
}

export default Home
