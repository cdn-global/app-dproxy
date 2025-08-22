import { createFileRoute, Link, useParams } from "@tanstack/react-router";
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
  VStack,
  Heading,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

// Hardcoded devices
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
      <Flex align="center" justify="space-between" py={6}>
        <Text fontSize="3xl" color="black">Web Hosting Credentials</Text>
        <Text fontSize="lg" color="gray.600">Login details for hosting devices</Text>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Device Name</Th>
              <Th>Type</Th>
              <Th>OS</Th>
              <Th>Username</Th>
              <Th>Password</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {devices.map((device) => (
              <Tr key={device.name}>
                <Td>{device.name}</Td>
                <Td>{device.type}</Td>
                <Td>{device.os}</Td>
                <Td>{device.username}</Td>
                <Td>{device.password}</Td>
                <Td isNumeric>
                  <HStack spacing={2} justify="flex-end">
                    <CopyCell textToCopy={device.username} label="Username" />
                    <CopyCell textToCopy={device.password} label="Password" />
                    <Button size="sm" as={Link} to={`/hosting/${device.name}`}>View Details</Button>
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

function DeviceDetailsPage() {
  const params = useParams({ from: "/_layout/hosting/$deviceName" });
  const device = devices.find((d) => d.name === params.deviceName);

  if (!device) {
    return <Text>Device not found</Text>;
  }

  return (
    <Container maxW="full" py={9}>
      <Flex align="center" justify="space-between" py={6}>
        <Heading size="xl">Device Details: {device.name}</Heading>
        <Button as={Link} to="/hosting/">Back to List</Button>
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

export const IndexRoute = createFileRoute("/_layout/hosting/")({
  component: HostingIndexPage,
});

export const DetailsRoute = createFileRoute("/_layout/hosting/$deviceName")({
  component: DeviceDetailsPage,
});