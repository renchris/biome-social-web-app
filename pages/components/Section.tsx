import { Box, BoxProps } from '@chakra-ui/react'

const Section = (props: BoxProps) => (
  <Box
    as="section"
    margin="auto"
    w="100%"
    maxW={{ xl: '1440px' }}
    px={['16px', null, '40px', null, '80px', null]}
    overflow="hidden"
    // bg={['red.100', 'orange.100', 'green.100', 'blue.100', 'teal.100', 'pink.100']}
    {...props}
  />
)

export default Section
