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
  monthlyPrice: number;
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
    monthlyPrice: 15,
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
    monthlyPrice: 50,
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
    monthlyPrice: 50,
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
    monthlyPrice: 45,
  },
];

const ELASTIC_IP_FEE_PER_MONTH = 3.6; // $0.005 per hour * 24 * 30 = $3.60 per IP per month

function BillingPage() {
  const totalDeviceCost = devices.reduce((sum, device) => sum + device.monthlyPrice, 0);
  const totalElasticIPCost = devices.length * ELASTIC_IP_FEE_PER_MONTH;
  const grandTotal = totalDeviceCost + totalElasticIPCost;

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
              <Th>Monthly Device Price (USD)</Th>
              <Th>Elastic IP Fee (USD)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {devices.map((device) => (
              <Tr key={device.name}>
                <Td>{device.name}</Td>
                <Td>{device.ip}</Td>
                <Td>${device.monthlyPrice}</Td>
                <Td>${ELASTIC_IP_FEE_PER_MONTH.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <VStack align="start" mt={6} spacing={4}>
        <Heading size="md">Total Device Cost: ${totalDeviceCost}</Heading>
        <Heading size="md">Total Elastic IP Cost: ${totalElasticIPCost.toFixed(2)}</Heading>
        <Heading size="lg">Grand Total: ${grandTotal.toFixed(2)}</Heading>
      </VStack>

      <Button as={ChakraLink} href=".." mt={4}>Back to Hosting</Button>
    </Container>
  );
}

export const Route = createFileRoute("/_layout/hosting/billing")({
  component: BillingPage,
});