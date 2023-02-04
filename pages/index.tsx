import {
  ConnectWallet,
  useAddress,
  useContract,
  useUser,
  Web3Button,
  ChainId, ThirdwebProvider,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import {
  Flex, Heading, Box, Text, Button, useBreakpointValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import * as ethers from 'ethers'
import Container from './components/Container'
import NFTCollectionRender from './components/NFTCollectionRender'
import About from './components/About'
import NFTCard from './components/NFTCard'
import NextJSLink from './components/NextJSLink'

const Home: NextPage = () => {
  const address = useAddress()
  const { user, isLoggedIn } = useUser()
  const [secret, setSecret] = useState()
  const [hasNft, setHasNft] = useState<boolean | undefined>(false)
  const [hasNft1, setHasNft1] = useState<boolean | undefined>(false)
  const [hasNft2, setHasNft2] = useState<boolean | undefined>(false)
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

  const { contract } = useContract(
    '0x2684b838CA83A04398141bd6B0A1c9dA2f4805E9',
    'edition-drop',
  )
  useEffect(() => {
    if (address) {
      const checkBalance = async () => {
        const balance = await contract?.balanceOf(address, 0/* tokenID */)
        const balance1 = await contract?.balanceOf(address, 1/* tokenID */)
        const balance2 = await contract?.balanceOf(address, 2/* tokenID */)
        setHasNft(balance?.gt(0/* tokenID */))
        setHasNft1(balance1?.gt(1/* tokenID */))
        setHasNft2(balance2?.gt(2/* tokenID */))
        /*
        Can add a React setState to pass the NFT
        */
      }
      checkBalance()
    }
  }, [contract, address])

  const darkblockSrcUrl = 'https://app.darkblock.io/platform/eth-goerli/embed/viewer/0x2684b838ca83a04398141bd6b0a1c9da2f4805e9/0'

  const activeChainId = ChainId.Goerli
  let thirdwebDomain
  let openzeppelinUrl

  if (process.env.secrets) {
    const jsonStr = process.env.secrets.replace(
      /(\w+:)|(\w+ :)/g,
      (matchedStr) => `"${matchedStr.substring(0, matchedStr.length - 1)}":`,
    )
    const secretObject = JSON.parse(jsonStr)
    thirdwebDomain = secretObject.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN
    openzeppelinUrl = secretObject.NEXT_PUBLIC_OPENZEPPELIN_URL
  } else {
    thirdwebDomain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN
    openzeppelinUrl = process.env.NEXT_PUBLIC_OPENZEPPELIN_URL
  }

  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <Box>
      <Box>
        <Container alignItems="center">
          <About />
          <Box pt="32px">
            <ConnectWallet />
          </Box>
          <Button mt="12px" onClick={async () => (isLoggedIn ? getEthBalance() : null)}>
            Get ETH Balance (QuickNode API)
          </Button>
          <Heading
            as="h2"
            size="h4"
            textAlign={{ base: 'center' }}
            w={{ lg: '544px' }}
            m="auto"
            mb={{ base: '20px' }}
          >
            {ethBalance}
          </Heading>
          {/* <NFTCollectionRender /> */}

          <Flex
            justify="space-between"
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <ThirdwebProvider
              desiredChainId={activeChainId}
              authConfig={{
                domain: thirdwebDomain,
                authUrl: '/api/auth',
              }}
              sdkOptions={{
                gasless: {
                  openzeppelin: {
                    relayerUrl: openzeppelinUrl,
                  },
                },
              }}
            >
              <Flex flexDirection="column" alignItems="center" height="100%">
                <NFTCard
                  tier="Tier 1"
                  hero="Bunny"
                  imagePath="/biome-soical-pioneer-1-bunny-transparent-2x.png"
                  href="https://testnets.opensea.io/assets/goerli/0x2684b838ca83a04398141bd6b0a1c9da2f4805e9/0"
                />
                <Flex justify="space-evenly" width="100%">
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    Quantity
                    <br />
                    <br />
                    Unlimited
                  </Text>
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    Price
                    <br />
                    <br />
                    Free
                  </Text>
                </Flex>
                <Box width="320px" mt="32px">
                  <Web3Button
                    contractAddress="0x2684b838CA83A04398141bd6B0A1c9dA2f4805E9"
                    action={(claimContract) => claimContract.erc1155.claim(0, quantity)}
                    onSuccess={() => setButtonTextStatusOne('Claimed!')}
                    onError={() => setButtonTextStatusOne('Something went wrong')}
                  >
                    Claim Tier 1
                  </Web3Button>
                  <Text textAlign="center">
                    {hasNft ? 'You have this NFT already!' : 'You do not have this NFT yet'}
                  </Text>
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    {buttonTextStatusOne}
                  </Text>
                  <Text textAlign="center" mt="12px">
                    Perk: Join Tier-1 Secret Chat in Discord
                  </Text>
                </Box>
              </Flex>
            </ThirdwebProvider>
            <ThirdwebProvider
              desiredChainId={activeChainId}
              authConfig={{
                domain: thirdwebDomain,
                authUrl: '/api/auth',
              }}
            >
              <Flex flexDirection="column" alignItems="center" height="100%">
                <NFTCard
                  tier="Tier 2"
                  hero="Moo"
                  imagePath="/biome-social-pioneer-2-moo-transparent-2x.png"
                  href="https://testnets.opensea.io/assets/goerli/0x2684b838ca83a04398141bd6b0a1c9da2f4805e9/1"
                />
                <Flex justify="space-evenly" width="100%">
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    Quantity
                    <br />
                    <br />
                    10,000
                  </Text>
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    Price
                    <br />
                    <br />
                    0.0001 ETH
                  </Text>
                </Flex>
                <Box width="320px" mt="32px">
                  <Web3Button
                    contractAddress="0x2684b838CA83A04398141bd6B0A1c9dA2f4805E9"
                    action={(claimContract) => claimContract.erc1155.claim(1, quantity)}
                    onSuccess={() => setButtonTextStatusTwo('Claimed!')}
                    onError={() => setButtonTextStatusTwo('Something went wrong')}
                  >
                    Claim Tier 2
                  </Web3Button>
                  <Text textAlign="center">
                    {hasNft1 ? 'You have this NFT already!' : 'You do not have this NFT yet'}
                  </Text>
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    {buttonTextStatusTwo}
                  </Text>
                  <Text textAlign="center" mt="12px">
                    Perk: Join Tier-2 Secret Chat in Discord
                  </Text>
                </Box>
              </Flex>
            </ThirdwebProvider>
            <ThirdwebProvider
              desiredChainId={activeChainId}
              authConfig={{
                domain: thirdwebDomain,
                authUrl: '/api/auth',
              }}
            >
              <Flex flexDirection="column" alignItems="center" height="100%">

                <NFTCard
                  tier="Tier 3"
                  hero="Bee"
                  imagePath="/biome-social-piooner-3-bee-transparent-2x.png"
                  href="https://testnets.opensea.io/assets/goerli/0x2684b838ca83a04398141bd6b0a1c9da2f4805e9/2"
                />
                <Flex justify="space-evenly" width="100%">
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    Quantity
                    <br />
                    <br />
                    100
                  </Text>
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    Price
                    <br />
                    <br />
                    0.1 ETH
                  </Text>
                </Flex>
                <Box width="320px" mt="32px">
                  <Web3Button
                    contractAddress="0x2684b838CA83A04398141bd6B0A1c9dA2f4805E9"
                    action={(claimContract) => claimContract.erc1155.claim(2, quantity)}
                    onSuccess={() => setButtonTextStatusThree('Claimed!')}
                    onError={() => setButtonTextStatusThree('Something went wrong')}
                  >
                    Claim Tier 3
                  </Web3Button>
                  <Text textAlign="center">
                    {hasNft2 ? 'You have this NFT already!' : 'You do not have this NFT yet'}
                  </Text>
                  <Text
                    mt="16px"
                    size="hairline2"
                    color="neutrals.4"
                    textAlign="center"
                  >
                    {buttonTextStatusThree}
                  </Text>
                </Box>
                <Text textAlign="center" mt="12px">
                  Perk: Join Tier-3 Secret Chat in Discord
                </Text>
              </Flex>
            </ThirdwebProvider>
          </Flex>
        </Container>

      </Box>
      <Flex flexDirection="column" mt="24px">
        <Button width="50%" marginX="25%">
          <NextJSLink href="https://discord.gg/heUNsMyk3A">
            <Text>
              Join NFT-gated Discord
            </Text>
          </NextJSLink>
        </Button>
      </Flex>

      <Flex flexDirection="column">
        <Text textAlign="center" mt="12px">
          Tier 1 Special Perk: Claim Closing Party Ticket
        </Text>
        <iframe
          style={{
            border: 'none',
            height: '540px',
            width: '100%',
          }}
          title="darkblock"
          src={darkblockSrcUrl}
        />
      </Flex>
    </Box>
  )
}

export default Home
