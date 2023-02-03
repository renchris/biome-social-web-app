import { useContract, useNFT, ThirdwebNftMedia } from '@thirdweb-dev/react'

const NFTCollectionRender = () => {
  // Get your NFT Collection using it's contract address
  const { contract } = useContract('0x2684b838CA83A04398141bd6B0A1c9dA2f4805E9')

  // Load (and cache) the metadata for the NFT with token ID 0
  const { data: nft, isLoading } = useNFT(contract, 0)

  console.log('---nft collection render---')
  console.log(nft ? nft.metadata : 'NA')
  console.log('----')

  // Render the NFT metadata using the `ThirdwebNftMedia` component
  return (
    <div>
      {!isLoading && nft ? (
        <ThirdwebNftMedia metadata={nft.metadata} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default NFTCollectionRender
