import React from 'react';
import { Link, LinkProps, HStack, Box, Text, Icon } from '@chakra-ui/react';
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
          w={{ base: '48px', md: '48px' }}
          h={{ base: '48px', md: '48px' }}
          minW={{ base: '48px', md: '48px' }}
          minH={{ base: '48px', md: '48px' }}
          borderRadius="lg"
          bgGradient="linear(to-br, orange.500, orange.200)"
          color="white"
          boxShadow="lg"
          p={{ base: 1, md: 2 }}

        >
          <Icon as={Layers} boxSize={{ base: '20px', md: '28px' }} aria-hidden />
        </Box>

        <Box lineHeight={1} color="gray.800" display={{ base: 'flex', md: 'flex' }} alignItems="center">
          <Text as="span" fontWeight="600" fontSize={{ base: 'sm', md: 'xl' }} display={{ base: 'inline', md: 'inline' }}>
            DATA
          </Text>
          <Text as="span" fontWeight="800" fontSize={{ base: 'sm', md: 'xl' }} display={{ base: 'inline', md: 'inline' }} color="orange.400" letterSpacing="tighter">
            PROXY
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default Logo;