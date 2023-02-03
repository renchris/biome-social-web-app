import {
  ConnectWallet,
  useAddress,
  useUser,
  Web3Button,
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
  const [buttonTextStatus, setButtonTextStatus] = useState('')
  const getSecret = async () => {
    const res = await fetch('/api/secrets')
    const data = await res.json()
    setSecret(data.message)
  }
  const tokenId = 0
  const quantity = 1
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
        <Web3Button
          contractAddress="0x66B2e6750baE1271Bc4C9bdaDEcaD846582320C7"
          action={(contract) => contract.erc1155.claim(tokenId, quantity)}
          onSuccess={() => setButtonTextStatus('Claimed!')}
          onError={() => setButtonTextStatus('Something went wrong')}
        >
          Claim
        </Web3Button>
        <Text>
          {buttonTextStatus}
        </Text>
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
