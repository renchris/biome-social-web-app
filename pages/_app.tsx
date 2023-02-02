import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import theme from '../theme'
import '../styles/globals.css'

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThirdwebProvider desiredChainId={activeChainId}>
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </ThirdwebProvider>
)

export default MyApp
