// src/routes/_layout/hosting/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
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
  IconButton,
  Text,
  useClipboard,
  useToast,
  HStack,
  Button,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

// Updated devices array with servers data
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
  monthlyComputePrice?: number;
  storageSizeGB?: number;
  activeSince?: string;
  hasRotatingIP?: boolean;
  hasBackup?: boolean;
  hasMonitoring?: boolean;
  hasManagedSupport?: boolean;
  vCPUs?: number;
  ramGB?: number;
}

const devices: Device[] = [
  {
    name: "e-coast-nyc-lower-8core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.100.95.59",
    version: "1.82.0",
    kernel: "Linux 6.8.0-57-generic",
    status: "Connected",
    type: "VPS",
    os: "debian",
    username: "user",
    password: "5660",
    monthlyComputePrice: 11.40,
    storageSizeGB: 120,
    activeSince: "2025-07-01",
    hasRotatingIP: false,
    hasBackup: true,
    hasMonitoring: true,
    hasManagedSupport: false,
    vCPUs: 1,
    ramGB: 2,
  },
  {
    name: "e-coast-nyc-midtown-16core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.140.50.60",
    version: "1.88.0",
    kernel: "Linux 6.8.0-62-generic",
    status: "Connected",
    type: "VPS",
    os: "debian",
    username: "user",
    password: "5660",
    monthlyComputePrice: 449,
    storageSizeGB: 100,
    activeSince: "2025-09-01",
    hasRotatingIP: false,
    hasBackup: false,
    hasMonitoring: false,
    hasManagedSupport: false,
    vCPUs: 16,
    ramGB: 64,
  },
  {
    name: "e-coast-nyc-bk-4core-hdd",
    email: "apis.popov@gmail.com",
    ip: "100.100.95.61",
    version: "1.88.0",
    kernel: "Linux 6.8.0-62-generic",
    status: "Connected",
    type: "VPS",
    os: "debian",
    username: "user",
    password: "5660",
    monthlyComputePrice: 40.1,
    storageSizeGB: 468,
    activeSince: "2025-09-01",
    hasRotatingIP: false,
    hasBackup: false,
    hasMonitoring: false,
    hasManagedSupport: false,
    vCPUs: 4,
    ramGB: 4,
  },
  {
    name: "e-coast-jersey-jersey-4core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.100.95.62",
    version: "1.88.0",
    kernel: "Linux 6.8.0-62-generic",
    status: "Connected",
    type: "VPS",
    os: "debian",
    username: "user",
    password: "5660",
    monthlyComputePrice: 45.3,
    storageSizeGB: 110,
    activeSince: "2025-09-01",
    hasRotatingIP: false,
    hasBackup: false,
    hasMonitoring: false,
    hasManagedSupport: false,
    vCPUs: 4,
    ramGB: 16,
  },
  {
    name: "e-coast-nyc-lower-8core-hdd",
    email: "apis.popov@gmail.com",
    ip: "100.100.95.63",
    version: "1.88.0",
    kernel: "Linux 6.8.0-62-generic",
    status: "Connected",
    type: "VPS",
    os: "debian",
    username: "user",
    password: "5660",
    monthlyComputePrice: 43.1,
    storageSizeGB: 932,
    activeSince: "2025-09-01",
    hasRotatingIP: false,
    hasBackup: false,
    hasMonitoring: false,
    hasManagedSupport: false,
    vCPUs: 8,
    ramGB: 4,
  },
  {
    name: "e-coast-nyc-midtown-2core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.100.95.64",
    version: "1.88.0",
    kernel: "Linux 6.8.0-62-generic",
    status: "Connected",
    type: "VPS",
    os: "debian",
    username: "user",
    password: "5660",
    monthlyComputePrice: 40.1,
    storageSizeGB: 240,
    activeSince: "2025-09-01",
    hasRotatingIP: false,
    hasBackup: false,
    hasMonitoring: false,
    hasManagedSupport: false,
    vCPUs: 2,
    ramGB: 8,
  },
];

// Reusable CopyCell component
const CopyCell = ({ textToCopy, label }: { textToCopy: string; label: string }) => {
  const { onCopy } = useClipboard(textToCopy);
  const toast = useToast();
  const handleCopy = () => {
    onCopy();
    toast({ title: `${label} copied to clipboard!`, status: "success", duration: 2000, isClosable: true });
  };
  return (
    <IconButton
      aria-label={`Copy ${label}`}
      icon={<CopyIcon />}
      size="sm"
      onClick={handleCopy}
    />
  );
};

function HostingIndexPage() {
  return (
    <Container maxW="full" py={9}>
      <Flex align="center" py={6}>
        <Flex direction="column">
          <Text fontSize="3xl" color="black">VPS Credentials</Text>
          <Text fontSize="lg" color="gray.600">Login details for hosting devices</Text>
        </Flex>
        <Button ml="auto" as={Link} to="billing">View Billing</Button>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Device Name</Th>
              <Th>IP</Th>
              <Th>Username</Th>
              <Th>Password</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {devices.map((device) => (
              <Tr key={device.name}>
                <Td>{device.name}</Td>
                <Td>{device.ip}</Td>
                <Td>{device.username}</Td>
                <Td>{device.password}</Td>
                <Td isNumeric>
                  <HStack spacing={2} justify="flex-end">
                    <CopyCell textToCopy={device.username} label="Username" />
                    <CopyCell textToCopy={device.password} label="Password" />
                    <Button size="sm" as={Link} to={device.name}>View Details</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
}

export const Route = createFileRoute("/_layout/hosting/")({
  component: HostingIndexPage,
});