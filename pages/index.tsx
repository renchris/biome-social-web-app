import {
  ConnectWallet,
  useAddress,
  useUser,
  Web3Button,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import {
  Flex, Box, Text, Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import * as ethers from 'ethers'
import Container from './components/Container'
import NFTCollectionRender from './components/NFTCollectionRender'
import About from './components/About'
import NFTCard from './components/NFTCard'

const Home: NextPage = () => {
  const address = useAddress()
  const { user, isLoggedIn } = useUser()
  const [secret, setSecret] = useState()
  const [ethBalance, setEthBalance] = useState('0 ETH')
  const [buttonTextStatusOne, setButtonTextStatusOne] = useState('Ready')
  const [buttonTextStatusTwo, setButtonTextStatusTwo] = useState('Ready')
  const [buttonTextStatusThree, setButtonTextStatusThree] = useState('Ready')
  const tokenId = 0
  const quantity = 1
  const getEthBalance = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://flashy-red-road.ethereum-goerli.quiknode.pro/6e8865ffb3a8b97899724c2569fbb9402dd46da4/')
    const balance = await provider.getBalance(
      address || '',
      'latest',
    )
    const balanceString = balance.toString()
    const balanceDigit = (parseInt(balanceString, 10) / 1000000000000000000).toFixed(4)

    setEthBalance(`${balanceDigit} ETH`)
    console.log(balanceDigit)
  }
  const getSecret = async () => {
    const res = await fetch('/api/secrets')
    const data = await res.json()
    getEthBalance()
    setSecret(data.message)
  }

  return (
    <Box>
      <Container alignItems="center">
        <About />
        <Box pt="32px">
          <ConnectWallet />
        </Box>
        <Button onClick={async () => getSecret()}>
          Get Secret
        </Button>
        <Box>
          {ethBalance}
        </Box>
        {/* <NFTCollectionRender /> */}
        <Flex
          justify="space-between"
        >
          <Flex flexDirection="column" alignItems="center">
            <NFTCard
              tier="Tier 1"
              hero="Bunny"
              imagePath="/biome-soical-pioneer-1-bunny-transparent-2x.png"
              href=""
            />
            <Box width="320px" mt="64px">
              <Web3Button
                contractAddress="0x2684b838CA83A04398141bd6B0A1c9dA2f4805E9"
                action={(contract) => contract.erc1155.claim(0, quantity)}
                onSuccess={() => setButtonTextStatusOne('Claimed!')}
                onError={() => setButtonTextStatusOne('Something went wrong')}
              >
                Claim
              </Web3Button>
              <Text
                mt="16px"
                size="hairline2"
                color="neutrals.4"
                textAlign="center"
              >
                {buttonTextStatusOne}
              </Text>
            </Box>
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <NFTCard
              tier="Tier 2"
              hero="Moo"
              imagePath="/biome-social-pioneer-2-moo-transparent-2x.png"
              href=""
            />
            <Box width="320px" mt="64px">
              <Web3Button
                contractAddress="0x2684b838CA83A04398141bd6B0A1c9dA2f4805E9"
                action={(contract) => contract.erc1155.claim(1, quantity)}
                onSuccess={() => setButtonTextStatusTwo('Claimed!')}
                onError={() => setButtonTextStatusTwo('Something went wrong')}
              >
                Claim
              </Web3Button>
              <Text
                mt="16px"
                size="hairline2"
                color="neutrals.4"
                textAlign="center"
              >
                {buttonTextStatusTwo}
              </Text>
            </Box>
          </Flex>
          <Flex flexDirection="column" alignItems="center" />
          <Flex flexDirection="column" alignItems="center">

            <NFTCard
              tier="Tier 3"
              hero="Bee"
              imagePath="/biome-social-piooner-3-bee-transparent-2x.png"
              href=""
            />
            <Box width="320px" mt="64px">
              <Web3Button
                contractAddress="0x2684b838CA83A04398141bd6B0A1c9dA2f4805E9"
                action={(contract) => contract.erc1155.claim(2, quantity)}
                onSuccess={() => setButtonTextStatusThree('Claimed!')}
                onError={() => setButtonTextStatusThree('Something went wrong')}
              >
                Claim
              </Web3Button>
              <Text
                mt="16px"
                size="hairline2"
                color="neutrals.4"
                textAlign="center"
              >
                {buttonTextStatusThree}
              </Text>
            </Box>
          </Flex>
        </Flex>

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
