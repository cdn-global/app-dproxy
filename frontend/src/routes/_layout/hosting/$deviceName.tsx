import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  VStack,
  Heading,
  SimpleGrid,
  Badge,
  IconButton,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

interface Server {
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
  activeSince: string;
  hasRotatingIP: boolean;
  hasBackup: boolean;
  hasMonitoring: boolean;
  hasManagedSupport?: boolean;
  vCPUs?: number;
  ramGB: number;
}

const servers: Server[] = [
  {
    name: "08-NYC-SOH-16core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.100.95.59",
    version: "1.82.0",
    kernel: "Linux 6.8.0-57-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 43.60,
    storageSizeGB: 120,
    activeSince: "2025-07-01",
    hasRotatingIP: false,
    hasBackup: true,
    hasMonitoring: true,
    ramGB: 4,
  },
  {
    name: "09-NYC-TRB-16core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.114.242.51",
    version: "1.86.2",
    kernel: "Linux 6.8.0-57-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 87.60,
    storageSizeGB: 240,
    activeSince: "2025-07-01",
    hasRotatingIP: true,
    hasBackup: false,
    hasMonitoring: false,
    ramGB: 16,
  },
  {
    name: "10-NYC-LES-16core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.91.158.116",
    version: "1.82.5",
    kernel: "Linux 6.8.0-59-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 100.60,
    storageSizeGB: 240,
    activeSince: "2025-08-01",
    hasRotatingIP: true,
    hasBackup: true,
    hasMonitoring: true,
    ramGB: 16,
  },
  {
    name: "11-NYC-EVI-16core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.100.106.3",
    version: "1.80.2",
    kernel: "Linux 6.8.0-55-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 60.60,
    storageSizeGB: 120,
    activeSince: "2025-09-01",
    hasRotatingIP: false,
    hasBackup: false,
    hasMonitoring: false,
    ramGB: 4,
  },
  {
    name: "12-NYC-WVI-16core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.120.30.40",
    version: "1.85.0",
    kernel: "Linux 6.8.0-60-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 136.60,
    storageSizeGB: 500,
    activeSince: "2025-08-01",
    hasRotatingIP: true,
    hasBackup: true,
    hasMonitoring: true,
    ramGB: 64,
  },
  {
    name: "13-NYC-MTW-16core-ssd",
    email: "apis.popov@gmail.com",
    ip: "100.130.40.50",
    version: "1.87.0",
    kernel: "Linux 6.8.0-61-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 63.60,
    storageSizeGB: 200,
    activeSince: "2025-09-01",
    hasRotatingIP: true,
    hasBackup: false,
    hasMonitoring: false,
    ramGB: 8,
  },
];

function DeviceDetailsPage() {
  const { deviceName } = useParams({ from: "/_layout/hosting/$deviceName" });
  const server = servers.find((s) => s.name === deviceName);
  const toast = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} copied!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (!server) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text fontSize="xl" color="ui.main">Server not found</Text>
      </Container>
    );
  }

  const statusColor = server.status === "Connected" ? "green" : "red";

  return (
    <Container maxW="container.xl" py={8}>
      <Flex align="center" justify="space-between" mb={6}>
        <HStack>
          <Heading size="lg" color="ui.dark">Server: {server.name}</Heading>
          <Badge colorScheme={statusColor} fontSize="md" px={2} py={1}>
            {server.status}
          </Badge>
        </HStack>
        <Button
          as={Link}
          to=".."
          bg="ui.main"
          color="ui.light"
          _hover={{ bg: "ui.secondary" }}
          _active={{ bg: "ui.darkSlate" }}
          size="md"
        >
          Back to List
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Basic Information */}
        <Box
          bg="ui.light"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          borderWidth="1px"
        >
          <Heading size="md" mb={4} color="ui.dark">Basic Information</Heading>
          <VStack align="stretch" spacing={3}>
            <Flex justify="space-between" align="center">
              <Text fontWeight="medium" color="ui.dim">Name:</Text>
              <Text color="ui.dark">{server.name}</Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontWeight="medium" color="ui.dim">Email:</Text>
              <HStack>
                <Text color="ui.dark">{server.email}</Text>
                <IconButton
                  aria-label="Copy email"
                  icon={<CopyIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(server.email, "Email")}
                />
              </HStack>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontWeight="medium" color="ui.dim">IP:</Text>
              <HStack>
                <Text color="ui.dark">{server.ip}</Text>
                <IconButton
                  aria-label="Copy IP"
                  icon={<CopyIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(server.ip, "IP")}
                />
              </HStack>
            </Flex>
          </VStack>
        </Box>

        {/* System Specifications */}
        <Box
          bg="ui.light"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          borderWidth="1px"
        >
          <Heading size="md" mb={4} color="ui.dark">System Specifications</Heading>
          <VStack align="stretch" spacing={3}>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Version:</Text>
              <Text color="ui.dark">{server.version}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Kernel:</Text>
              <Text color="ui.dark">{server.kernel}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">vCPUs:</Text>
              <Text color="ui.dark">{server.vCPUs ?? "N/A"}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">RAM:</Text>
              <Text color="ui.dark">{server.ramGB} GB</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Storage Size:</Text>
              <Text color="ui.dark">{server.storageSizeGB} GB</Text>
            </Flex>
          </VStack>
        </Box>

        {/* Credentials */}
        <Box
          bg="ui.light"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          borderWidth="1px"
        >
          <Heading size="md" mb={4} color="ui.dark">Credentials</Heading>
          <VStack align="stretch" spacing={3}>
            <Flex justify="space-between" align="center">
              <Text fontWeight="medium" color="ui.dim">Username:</Text>
              <HStack>
                <Text color="ui.dark">{server.username}</Text>
                <IconButton
                  aria-label="Copy username"
                  icon={<CopyIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(server.username, "Username")}
                />
              </HStack>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontWeight="medium" color="ui.dim">Password:</Text>
              <HStack>
                <Text color="ui.dark">****</Text>
                <IconButton
                  aria-label="Copy password"
                  icon={<CopyIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(server.password, "Password")}
                />
              </HStack>
            </Flex>
          </VStack>
        </Box>

        {/* Billing & Features */}
        <Box
          bg="ui.light"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          borderWidth="1px"
        >
          <Heading size="md" mb={4} color="ui.dark">Billing & Features</Heading>
          <VStack align="stretch" spacing={3}>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Monthly Compute Price:</Text>
              <Text color="ui.dark">${server.monthlyComputePrice.toFixed(2)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Active Since:</Text>
              <Text color="ui.dark">{server.activeSince}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Rotating IP:</Text>
              <Text color="ui.dark">{server.hasRotatingIP ? "Yes" : "No"}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Backup:</Text>
              <Text color="ui.dark">{server.hasBackup ? "Yes" : "No"}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Monitoring:</Text>
              <Text color="ui.dark">{server.hasMonitoring ? "Yes" : "No"}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="medium" color="ui.dim">Managed Support:</Text>
              <Text color="ui.dark">{server.hasManagedSupport ?? "N/A"}</Text>
            </Flex>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

export const Route = createFileRoute("/_layout/hosting/$deviceName")({
  component: DeviceDetailsPage,
});