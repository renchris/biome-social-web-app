import {
  Heading, Text, useBreakpointValue,
} from '@chakra-ui/react'
import Section from './Section'

const About = (): JSX.Element => {
  const headingSize = useBreakpointValue({ base: 'h4', xl: 'h3' })
  return (
    <Section textAlign="center">
      <Text
        size="hairline2"
        pt={{ base: '64px', md: '112px', xl: '128px' }}
        pb={{ base: '12px', md: '16px' }}
        color="neutrals.4"

      >
        The New Social Creator Platform
      </Text>
      <Heading
        as="h2"
        size={headingSize}
        pb="8px"
      >
        Biome Social
      </Heading>
    </Section>
  )
}

export default About
