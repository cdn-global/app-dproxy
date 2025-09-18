import React from 'react';
import { Link, LinkProps, HStack, Box, Text } from '@chakra-ui/react';
import { Cloud } from 'react-feather';

interface LogoProps extends LinkProps {}

const Logo: React.FC<LogoProps> = ({ href = '/', ...rest }) => {
  return (
    <Link
      href={href}
      display="inline-flex"
      alignItems="center"
      transition="color 0.2s ease-in-out"
      _hover={{ textDecoration: 'none', color: 'orange.300' }}
      {...rest}
    >
      <HStack spacing={2} align="center">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxSize={9}
          borderRadius="md"
          bgGradient="linear(to-br, orange.400, yellow.300)"
          color="white"
          boxShadow="sm"
        >
          <Cloud size={18} strokeWidth={2.2} />
        </Box>

        <Box lineHeight={1}>
          <Text as="span" fontWeight="600" fontSize="sm" color="gray.700" display="block">
            DATA
          </Text>
          <Text as="span" fontWeight="700" fontSize="md" color="orange.500" display="block" letterSpacing="wide">
            PROXY
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default Logo;