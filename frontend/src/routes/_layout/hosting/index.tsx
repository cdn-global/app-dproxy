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
  useTheme,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { vpsTableStyles } from "../../../theme";

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
  const theme = useTheme();

  return (
    <Container maxW="full" py={9}>
      <Flex align="center" py={6}>
        <Flex direction="column">
          <Text fontSize="3xl" color="ui.dark">VPS Access</Text>
          <Text fontSize="lg" color="ui.dim">Login Configuration for Hosting Infrastructure</Text>
        </Flex>
        <Button
          ml="auto"
          bg="ui.main"
          color="ui.light"
          _hover={{ bg: "ui.secondary" }}
          _active={{ bg: "ui.darkSlate" }}
          as={Link}
          to="billing"
        >
          View Billing
        </Button>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="ui.light">
        <Table variant="simple" size="md" colorScheme="gray" borderWidth="1px" borderColor="gray.200">
          <Thead bg="ui.main">
            <Tr>
              <Th {...vpsTableStyles.header} borderBottomWidth="1px" borderColor="gray.300">Server Name</Th>
              <Th {...vpsTableStyles.header} borderBottomWidth="1px" borderColor="gray.300">IP</Th>
              <Th {...vpsTableStyles.header} borderBottomWidth="1px" borderColor="gray.300">Username</Th>
              <Th {...vpsTableStyles.header} borderBottomWidth="1px" borderColor="gray.300">Password</Th>
              <Th isNumeric {...vpsTableStyles.header} borderBottomWidth="1px" borderColor="gray.300">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {servers.map((server) => (
              <Tr key={server.name} borderBottomWidth="1px" borderColor="gray.200">
                <Td {...vpsTableStyles.cell(theme)}>{server.name}</Td>
                <Td {...vpsTableStyles.cell(theme)}>{server.ip}</Td>
                <Td {...vpsTableStyles.cell(theme)}>{server.username}</Td>
                <Td {...vpsTableStyles.cell(theme)}>****</Td>
                <Td isNumeric>
                  <HStack spacing={2} justify="flex-end">
                    <CopyCell textToCopy={server.username} label="Username" />
                    <CopyCell textToCopy={server.password} label="Password" />
                    <Button
                      size="sm"
                      bg="ui.main"
                      color="ui.light"
                      _hover={{ bg: "ui.secondary" }}
                      _active={{ bg: "ui.darkSlate" }}
                      as={Link}
                      to={server.name}
                    >
                      View Details
                    </Button>
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