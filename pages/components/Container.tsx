import { Flex, FlexProps } from '@chakra-ui/react'

const Container = (props: FlexProps): JSX.Element => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    bg="neutrals.8"
    color="black"
    _dark={{
      bg: 'neutrals.1',
      color: 'white',
    }}
    transition="all 0.15s ease-out"
    {...props}
  />
)

export default Container
