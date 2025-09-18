import React from 'react';
import { Link, LinkProps, HStack, Box, Text } from '@chakra-ui/react';
import { Layers, Database } from 'react-feather';

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
          bgGradient="linear(to-br, orange.400, yellow.300)"
          color="white"
          boxShadow="sm"
        >
          <Box position="relative">
            <Layers size={18} strokeWidth={2.2} />
            <Database size={10} strokeWidth={2} style={{ position: 'absolute', right: -6, bottom: -6, opacity: 0.9 }} />
          </Box>
        </Box>

        <Box lineHeight={1}>
          <Text as="span" fontWeight="700" fontSize="lg" color="gray.800" display="block">
            DATA
          </Text>
          <Text as="span" fontWeight="600" fontSize="sm" color="orange.400" display="block" letterSpacing="wide">
            PROXY
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default Logo;