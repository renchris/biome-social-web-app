import {
  Box, Heading, Image, Text, useBreakpointValue,
} from '@chakra-ui/react'
import NextJSLink from './NextJSLink'

const NFTCard = ({
  tier,
  hero,
  imagePath,
  href,
}: {
  tier: string;
  hero: string;
  imagePath: string;
  href: string
}) => {
  const headingSize = useBreakpointValue({ base: 'h4', xl: 'h3' })
  return (
    <Box className="container">
      <Box className="card">
        <Box className="imgBx">
          <Image src={imagePath} />
        </Box>
        <Box className="contentBx">
          <h2>{tier}</h2>
          <Box className="size" mt="12px" mb="16px">
            <h3>Hero :</h3>
            <span>{hero}</span>
          </Box>
          <NextJSLink href={href}>View Collection</NextJSLink>
        </Box>
      </Box>
    </Box>
  )
}

export default NFTCard
