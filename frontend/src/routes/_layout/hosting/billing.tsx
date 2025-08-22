// src/routes/_layout/hosting/billing.tsx
import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Container,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  Heading,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";

// Hardcoded devices with pricing (shared or duplicated)
interface Device {
  name: string;
  email: string;
  ip: string;
  version: string;
  kernel: string;
  status: string;
  type: string;
  os: string;
  username: string;
  password: string;
  monthlyComputePrice: number;
  storageSizeGB: number;
}

const devices: Device[] = [
  {
    name: "riv1-nyc-mini5",
    email: "apis.popov@gmail.com",
    ip: "100.100.95.59",
    version: "1.82.0",
    kernel: "Linux 6.8.0-57-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 15,
    storageSizeGB: 120,
  },
  {
    name: "riv2-nyc-mini5",
    email: "apis.popov@gmail.com",
    ip: "100.114.242.51",
    version: "1.86.2",
    kernel: "Linux 6.8.0-57-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 50,
    storageSizeGB: 240,
  },
  {
    name: "riv3-nyc-mini6",
    email: "apis.popov@gmail.com",
    ip: "100.91.158.116",
    version: "1.82.5",
    kernel: "Linux 6.8.0-59-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 50,
    storageSizeGB: 240,
  },
  {
    name: "riv4-nyc-mini5",
    email: "apis.popov@gmail.com",
    ip: "100.100.106.3",
    version: "1.80.2",
    kernel: "Linux 6.8.0-55-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 45,
    storageSizeGB: 120,
  },
];

const ELASTIC_IP_FEE_PER_MONTH = 3.6; // $0.005 per hour * 24 * 30 = $3.60 per IP per month
const STORAGE_COST_PER_GB_MONTH = 0.10; // Approximate EBS gp2 cost: $0.10/GB-month

function BillingPage() {
  const totalComputeCost = devices.reduce((sum, device) => sum + device.monthlyComputePrice, 0);
  const totalElasticIPCost = devices.length * ELASTIC_IP_FEE_PER_MONTH;
  const totalStorageCost = devices.reduce((sum, device) => sum + (device.storageSizeGB * STORAGE_COST_PER_GB_MONTH), 0);
  const grandTotal = totalComputeCost + totalElasticIPCost + totalStorageCost;

  return (
    <Container maxW="full" py={9}>
      <Flex align="center" justify="space-between" py={6}>
        <Text fontSize="3xl" color="black">Billing Information</Text>
        <Text fontSize="lg" color="gray.600">Monthly costs for hosting devices</Text>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Device Name</Th>
              <Th>IP</Th>
              <Th isNumeric>Monthly Compute Price (USD)</Th>
              <Th isNumeric>Storage Size (GB)</Th>
              <Th isNumeric>Monthly Storage Cost (USD)</Th>
              <Th isNumeric>Elastic IP Fee (USD)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {devices.map((device) => (
              <Tr key={device.name}>
                <Td>{device.name}</Td>
                <Td>{device.ip}</Td>
                <Td isNumeric>${device.monthlyComputePrice.toFixed(2)}</Td>
                <Td isNumeric>{device.storageSizeGB}</Td>
                <Td isNumeric>${(device.storageSizeGB * STORAGE_COST_PER_GB_MONTH).toFixed(2)}</Td>
                <Td isNumeric>${ELASTIC_IP_FEE_PER_MONTH.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box mt={6} p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
        <VStack align="stretch" spacing={2}>
          <Flex justify="space-between">
            <Text fontWeight="bold">Total Compute Cost:</Text>
            <Text>${totalComputeCost.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text fontWeight="bold">Total Storage Cost:</Text>
            <Text>${totalStorageCost.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text fontWeight="bold">Total Elastic IP Cost:</Text>
            <Text>${totalElasticIPCost.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between" fontSize="lg" fontWeight="bold" borderTopWidth="1px" pt={2}>
            <Text>Grand Total:</Text>
            <Text>${grandTotal.toFixed(2)}</Text>
          </Flex>
        </VStack>
      </Box>

      <Button as={ChakraLink} href=".." mt={4}>Back to Hosting</Button>
    </Container>
  );
}

export const Route = createFileRoute("/_layout/hosting/billing")({
  component: BillingPage,
});
