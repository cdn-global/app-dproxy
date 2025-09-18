import React from 'react';
import { Link, LinkProps, HStack, Box, Text } from '@chakra-ui/react';
import { Database } from 'react-feather';

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
      <HStack spacing={3} align="center">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxSize={10}
          borderRadius="md"
          bgGradient="linear(to-br, orange.500, orange.300)"
          color="white"
          boxShadow="sm"
        >
          <Database size={20} strokeWidth={2} />
        </Box>

        <Box lineHeight={1}>
          <Text as="span" fontWeight="600" fontSize="sm" color="gray.700" display="block">
            DATA
          </Text>
          <Text as="span" fontWeight="800" fontSize="lg" color="orange.500" display="block" letterSpacing="wide">
            PROXY
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default Logo;