// src/routes/_layout/hosting/[deviceName].tsx
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

// Hardcoded devices (duplicated for simplicity; consider sharing via a separate file if needed)
interface Device {
  name: string;
  type: string;
  os: string;
  username: string;
  password: string;
}

const devices: Device[] = [
  { name: "riv1-nyc-mini5", type: "VPS", os: "ubuntu", username: "user", password: "5660" },
  { name: "riv2-sf-mini5", type: "VPS", os: "ubuntu", username: "user", password: "5660" },
  { name: "riv3-lon-mini5", type: "VPS", os: "ubuntu", username: "user", password: "5660" },
  { name: "riv4-tok-mini5", type: "VPS", os: "ubuntu", username: "user", password: "5660" },
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
        <Button as={Link} to="..">Back to List</Button>
      </Flex>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <VStack align="start" spacing={4}>
          <Text><strong>Name:</strong> {device.name}</Text>
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