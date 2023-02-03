import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import '../styles/styles.css'
import theme from '../theme'
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli
let thirdwebDomain
let openzeppelinUrl

const MyApp = ({ Component, pageProps }: AppProps) => {
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
  return (
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
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
