import React from 'react';
import { Link, LinkProps, HStack, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { Cloud } from 'react-feather';

interface LogoProps extends LinkProps {}

const Logo: React.FC<LogoProps> = ({ href = '/', ...rest }) => {
  return (
    <Link href={href} _hover={{ textDecoration: 'none' }} {...rest}>
      <HStack spacing={1} align="center">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxSize={{ base: 8, md: 10 }}
          borderRadius="md"
          bgGradient="linear(to-br, orange.400, yellow.300)"
          color="white"
          boxShadow="sm"
          p={1}
        >
          <Box position="relative" aria-hidden>
            <Cloud size={useBreakpointValue({ base: 12, md: 16 })} strokeWidth={2.2} />
            <Box position="absolute" right={-1} top={-1} boxSize={2} bg="whiteAlpha.700" borderRadius="full" />
            <Box position="absolute" left={-1} bottom={0} boxSize={1.5} bg="whiteAlpha.600" borderRadius="full" />
          </Box>
        </Box>

        <Box lineHeight={1} color="gray.800">
          <Text as="span" fontWeight="500" fontSize={{ base: 'xs', md: 'sm' }} display="block">
            DATA
          </Text>
          <Text as="span" fontWeight="700" fontSize={{ base: 'sm', md: 'md' }} display="block" color="orange.500" letterSpacing="wide">
            PROXY
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default Logo;