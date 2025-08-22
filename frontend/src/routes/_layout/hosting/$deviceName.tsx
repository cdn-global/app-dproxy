// src/routes/_layout/hosting/$deviceName.tsx
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";

// Hardcoded devices
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
  },
];

function DeviceDetailsPage() {
  const { deviceName } = useParams({ from: "/_layout/hosting/$deviceName" });
  const device = devices.find((d) => d.name === deviceName);

  if (!device) {
    return <Text>Device not found</Text>;
  }

  return (
    <Container maxW="full" py={9}>
      <Flex align="center" justify="space-between" py={6}>
        <Heading size="xl">Device Details: {device.name}</Heading>
        <Button as={Link} to="/hosting">Back to List</Button>
      </Flex>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <VStack align="start" spacing={4}>
          <Text><strong>Name:</strong> {device.name}</Text>
          <Text><strong>Email:</strong> {device.email}</Text>
          <Text><strong>IP:</strong> {device.ip}</Text>
          <Text><strong>Version:</strong> {device.version}</Text>
          <Text><strong>Kernel:</strong> {device.kernel}</Text>
          <Text><strong>Status:</strong> {device.status}</Text>
          <Text><strong>Type:</strong> {device.type}</Text>
          <Text><strong>OS:</strong> {device.os}</Text>
          <Text><strong>Username:</strong> {device.username}</Text>
          <Text><strong>Password:</strong> {device.password}</Text>
        </VStack>
      </Box>
    </Container>
  );
}

export const Route = createFileRoute("/_layout/hosting/$deviceName")({
  component: DeviceDetailsPage,
});