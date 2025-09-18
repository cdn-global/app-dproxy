import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Divider,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
// --- Helper function for Billing ---
const fetchBillingPortal = async (token: string) => {
  const response = await fetch("https://api.thedataproxy.com/v2/customer-portal", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch portal: ${response.status}`);
  }
  const data = await response.json();
  if (!data.portal_url) {
    throw new Error("No portal URL received");
  }
  return data.portal_url;
};

// --- Tab Content: BillingTab ---
const BillingTab = () => {
  const [token] = useState<string | null>(localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleBillingClick = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const portalUrl = await fetchBillingPortal(token);
      window.location.href = portalUrl;
    } catch (error) {
      console.error("Error accessing customer portal:", error);
      toast({
        title: "Error",
        description: "Unable to access the billing portal. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Guard clause to match the provided template's pattern
  if (!token) {
    return (
      <Box p={6} width="100%">
        <Alert status="warning">
          <AlertIcon />
          Please log in to manage your billing information.
        </Alert>
      </Box>
    );
  }

  return (
    <Box bg="ui.light" p={6} borderRadius="md" boxShadow="lg">
      <Text fontSize="xl" fontWeight="bold" color="ui.dark" mb={4}>
        Billing Information
      </Text>
      <Divider mb={4} />
      <VStack spacing={4} align="stretch">
        <Text color="ui.dim">
          Manage your billing details and access the customer portal.
        </Text>
        <Button
          bg="ui.main"
          color="ui.light"
          _hover={{ bg: "ui.secondary" }}
          _active={{ bg: "ui.darkSlate" }}
          isLoading={isLoading}
          onClick={handleBillingClick}
        >
          Access Billing Portal
        </Button>
        
      </VStack>
    </Box>
  );
};

export default BillingTab;