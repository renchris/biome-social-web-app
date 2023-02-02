import NextLink from 'next/link'
import {
  Link, LinkProps, forwardRef,
} from '@chakra-ui/react'

const NextJSLink = forwardRef<LinkProps, 'a'>((props, ref) => (
  <NextLink href={props.href || ''} passHref legacyBehavior>
    <Link
      ref={ref}
      _hover={{
        textDecor: 'none',
      }}
      {...props}
    />
  </NextLink>
))

export default NextJSLink
