import React from 'react';
import { Link, LinkProps, HStack, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { Cloud } from 'react-feather';

interface LogoProps extends LinkProps {}

const Logo: React.FC<LogoProps> = ({ href = '/', ...rest }) => {
  return (
    <Link href={href} _hover={{ textDecoration: 'none' }} {...rest}>
      <HStack spacing={{ base: 2, md: 3 }} align="center">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxSize={{ base: 10, md: 14 }}
          borderRadius="md"
          bgGradient="linear(to-br, orange.400, yellow.300)"
          color="white"
          boxShadow="sm"
          p={{ base: 1, md: 2 }}
        >
          <Box position="relative" aria-hidden>
            <Cloud size={useBreakpointValue({ base: 14, md: 20 })} strokeWidth={2.6} />
          </Box>
        </Box>

        <Box lineHeight={1} color="gray.800" display={{ base: 'block', md: 'flex' }} alignItems="baseline">
          <Text as="span" fontWeight="600" fontSize={{ base: 'sm', md: 'md' }} display={{ base: 'block', md: 'inline' }} mr={{ base: 0, md: 3 }}>
            DATA
          </Text>
          <Text as="span" fontWeight="800" fontSize={{ base: 'md', md: 'lg' }} display={{ base: 'block', md: 'inline' }} color="orange.500" letterSpacing="wide">
            PROXY
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default Logo;