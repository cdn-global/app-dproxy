import React from 'react';
import { Link, LinkProps, HStack, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { Layers } from 'react-feather';

interface LogoProps extends LinkProps {}

const Logo: React.FC<LogoProps> = ({ href = '/', ...rest }) => {
  return (
    <Link href={href} _hover={{ textDecoration: 'none' }} {...rest}>
      <HStack spacing={{ base: 1, md: 1 }} align="center" alignItems="center">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxSize={{ base: 16, md: 26 }}
          borderRadius="lg"
          bgGradient="linear(to-br, orange.500, orange.300)"
          color="white"
          boxShadow="lg"
          p={{ base: 3, md: 4 }}
        >
          <Box position="relative" aria-hidden>
            <Layers size={useBreakpointValue({ base: 20, md: 32 })} strokeWidth={3.2} />
          </Box>
        </Box>

        <Box lineHeight={1} color="gray.800" display={{ base: 'block', md: 'flex' }} alignItems="center">
          <Text as="span" fontWeight="600" fontSize={{ base: 'xs', md: 'sm' }} display={{ base: 'block', md: 'inline' }} mr={{ base: 0, md: 1 }}>
            DATA
          </Text>
          <Text as="span" fontWeight="800" fontSize={{ base: 'sm', md: 'lg' }} display={{ base: 'block', md: 'inline' }} color="orange.500" letterSpacing="tighter">
            PROXY
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default Logo;