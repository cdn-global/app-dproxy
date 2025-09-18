import React from 'react';
import { Link, LinkProps, HStack, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { Cloud } from 'react-feather';

interface LogoProps extends LinkProps {}

const Logo: React.FC<LogoProps> = ({ href = '/', ...rest }) => {
  return (
    <Link href={href} _hover={{ textDecoration: 'none' }} {...rest}>
      <Box
        display="inline-flex"
        alignItems="center"
        px={{ base: 2, md: 3 }}
        py={{ base: 1, md: 2 }}
        borderRadius="lg"
        bgGradient="linear(to-r, orange.400, orange.200)"
        color="white"
        boxShadow="md"
      >
        <HStack spacing={{ base: 2, md: 3 }} align="center">
          <Box display="inline-flex" alignItems="center" justifyContent="center">
            <Box position="relative" aria-hidden>
              <Cloud size={useBreakpointValue({ base: 14, md: 18 })} strokeWidth={2.2} />
              <Box position="absolute" right={-2} top={-1} boxSize={2} bg="whiteAlpha.700" borderRadius="full" />
              <Box position="absolute" left={-2} bottom={0} boxSize={1.5} bg="whiteAlpha.600" borderRadius="full" />
            </Box>
          </Box>

          <Box lineHeight={1} color="white">
            <Text as="span" fontWeight="500" fontSize={{ base: 'xs', md: 'sm' }} display="block">
              DATA
            </Text>
            <Text as="span" fontWeight="700" fontSize={{ base: 'sm', md: 'md' }} display="block" letterSpacing="wide">
              PROXY
            </Text>
          </Box>
        </HStack>
      </Box>
    </Link>
  );
};

export default Logo;