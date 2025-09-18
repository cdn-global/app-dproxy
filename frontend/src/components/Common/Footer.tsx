import {
    Box,
    Flex,
    Text,
    Link,
    Icon,
    VStack,
} from "@chakra-ui/react";
import { FiPhone, FiMail, FiTwitter, FiGithub, FiGlobe, FiBook } from "react-icons/fi";

const Footer = () => {
    return (
        <Box bg="ui.darkSlate" py={6} px={4} w="100%">
            <Flex
                maxW="1200px"
                mx="auto"
                direction={{ base: "column", md: "row" }}
                align={{ base: "center", md: "center" }}
                justify="space-between"
                gap={{ base: 4, md: 8 }}
                textAlign={{ base: "center", md: "left" }}
                flexWrap={{ base: "wrap", md: "nowrap" }}
            >
                {/* Company Info */}
                <VStack spacing={2} align={{ base: "center", md: "start" }}>
                    <Link
                        href="https://theDATAPROXY.com"
                        isExternal
                        color="ui.light"
                        _hover={{ color: "ui.secondary" }}
                    >
                        
                        
                            theDATAPROXY.com
                    
                    </Link>
                    <Text color="ui.dim" fontSize="xs" maxW="200px">
                        Enterprise proxy and scraping solutions for web data.
                    </Text>
                </VStack>

                {/* Contact Info */}
                <VStack spacing={2} align={{ base: "center", md: "start" }}>
                    <Flex align="center" gap={2}>
                        <Icon as={FiPhone} color="ui.light" />
                        <Text color="ui.light" fontSize="sm">+1-800-123-4567</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Icon as={FiMail} color="ui.light" />
                        <Text color="ui.light" fontSize="sm">support@thedataproxy.com</Text>
                    </Flex>
                </VStack>

                {/* Support Links */}
                <VStack spacing={2} align={{ base: "center", md: "start" }}>
                    <Link
                        href="https://theDATAPROXY.com/resources/faq"
                        isExternal
                        color="ui.light"
                        fontSize="xs"
                        _hover={{ color: "ui.secondary" }}
                    >
                        FAQ
                    </Link>
                    <Link
                        href="https://theDATAPROXY.com/contact"
                        isExternal
                        color="ui.light"
                        fontSize="xs"
                        _hover={{ color: "ui.secondary" }}
                    >
                        Help & Support
                    </Link>
                </VStack>

                {/* Legal Links */}
                <VStack spacing={2} align={{ base: "center", md: "start" }}>
                    <Link
                        href="https://theDATAPROXY.com/privacy"
                        isExternal
                        color="ui.light"
                        fontSize="xs"
                        _hover={{ color: "ui.secondary" }}
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="https://theDATAPROXY.com/terms"
                        isExternal
                        color="ui.light"
                        fontSize="xs"
                        _hover={{ color: "ui.secondary" }}
                    >
                        Terms of Service
                    </Link>
                </VStack>

                {/* Additional Legal Links */}
                <VStack spacing={2} align={{ base: "center", md: "start" }}>
                    <Link
                        href="https://theDATAPROXY.com/cookie"
                        isExternal
                        color="ui.light"
                        fontSize="xs"
                        _hover={{ color: "ui.secondary" }}
                    >
                        Cookie Policy
                    </Link>
                    <Link
                        href="https://theDATAPROXY.com/compliance"
                        isExternal
                        color="ui.light"
                        fontSize="xs"
                        _hover={{ color: "ui.secondary" }}
                    >
                        Compliance
                    </Link>
                </VStack>

                {/* Cobalt Data Section */}
                <VStack spacing={2} align={{ base: "center", md: "start" }}>
                    <Flex gap={3}>
                        <Link href="https://x.com/cobaltdata" isExternal>
                            <Icon
                                as={FiTwitter}
                                color="ui.light"
                                _hover={{ color: "ui.secondary" }}
                                boxSize="1em"
                            />
                        </Link>
                        <Link href="https://github.com/cdn-global" isExternal>
                            <Icon
                                as={FiGithub}
                                color="ui.light"
                                _hover={{ color: "ui.secondary" }}
                                boxSize="1em"
                            />
                        </Link>
                        <Link href="https://cobaltdata.net" isExternal>
                            <Icon
                                as={FiGlobe}
                                color="ui.light"
                                _hover={{ color: "ui.secondary" }}
                                boxSize="1em"
                            />
                        </Link>
                        <Link href="https://docs.theDATAPROXY.com/" isExternal>
                            <Icon
                                as={FiBook}
                                color="ui.light"
                                _hover={{ color: "ui.secondary" }}
                                boxSize="1em"
                            />
                        </Link>
                    </Flex>
                </VStack>
            </Flex>

            {/* Copyright and Links */}
            <Text
                color="ui.light"
                fontSize="xs"
                textAlign="center"
                mt={{ base: 3, md: 2 }}
            >
                © 2025{" "}
                <Link
                    href="https://theDATAPROXY.com"
                    isExternal
                    color="ui.light"
                    _hover={{ color: "ui.secondary" }}
                >
                    theDATAPROXY.com
                </Link>
                ,{" "}
                <Link
                    href="https://tradevaultllc.com/"
                    isExternal
                    color="ui.light"
                    _hover={{ color: "ui.secondary" }}
                >
                    Trade Vault LLC
                </Link>
                . All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;