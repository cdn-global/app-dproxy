import React from 'react';
import { Link, LinkProps, HStack, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { Cloud } from 'react-feather';

interface LogoProps extends LinkProps {}

const Logo: React.FC<LogoProps> = ({ href = '/', ...rest }) => {
  return (
    <Link href={href} _hover={{ textDecoration: 'none' }} {...rest}>
      <HStack spacing={{ base: 1, md: 1 }} align="center">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxSize={{ base: 14, md: 22 }}
          borderRadius="lg"
          bgGradient="linear(to-br, orange.500, orange.300)"
          color="white"
          boxShadow="lg"
          p={{ base: 2, md: 3 }}
        >
          <Box position="relative" aria-hidden>
            <Cloud size={useBreakpointValue({ base: 18, md: 26 })} strokeWidth={3} />
          </Box>
        </Box>

        <Box lineHeight={1} color="gray.800" display={{ base: 'block', md: 'flex' }} alignItems="center">
          <Text as="span" fontWeight="600" fontSize={{ base: 'sm', md: 'xl' }} display={{ base: 'block', md: 'inline' }} mr={{ base: 0, md: 1 }}>
            DATA
          </Text>
          <Text as="span" fontWeight="800" fontSize={{ base: 'md', md: 'xl' }} display={{ base: 'block', md: 'inline' }} color="orange.500" letterSpacing="tighter">
            PROXY
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default Logo;