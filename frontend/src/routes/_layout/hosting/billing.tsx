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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

// Hardcoded devices with pricing
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
  activeSince: string; // YYYY-MM-DD
  hasRotatingIP?: boolean;
  hasBackup?: boolean;
  hasCDN?: boolean;
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
    activeSince: "2025-07-01",
    hasRotatingIP: false,
    hasBackup: true,
    hasCDN: false,
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
    activeSince: "2025-07-01",
    hasRotatingIP: true,
    hasBackup: false,
    hasCDN: false,
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
    activeSince: "2025-08-01",
    hasRotatingIP: true,
    hasBackup: true,
    hasCDN: false,
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
    activeSince: "2025-09-01",
    hasRotatingIP: false,
    hasBackup: false,
    hasCDN: true,
  },
  {
    name: "riv5-nyc-mini7",
    email: "apis.popov@gmail.com",
    ip: "100.120.30.40",
    version: "1.85.0",
    kernel: "Linux 6.8.0-60-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 60,
    storageSizeGB: 500,
    activeSince: "2025-08-01",
    hasRotatingIP: true,
    hasBackup: true,
    hasCDN: true,
  },
  {
    name: "riv6-nyc-mini8",
    email: "apis.popov@gmail.com",
    ip: "100.130.40.50",
    version: "1.87.0",
    kernel: "Linux 6.8.0-61-generic",
    status: "Connected",
    type: "VPS",
    os: "ubuntu",
    username: "user",
    password: "5660",
    monthlyComputePrice: 30,
    storageSizeGB: 200,
    activeSince: "2025-09-01",
    hasRotatingIP: true,
    hasBackup: false,
    hasCDN: false,
  },
];

const ELASTIC_IP_FEE_PER_MONTH = 3.6; // $0.005 per hour * 24 * 30 = $3.60 per IP per month
const STORAGE_COST_PER_GB_MONTH = 0.10; // Approximate EBS gp2 cost: $0.10/GB-month
const ROTATING_IP_FEE_PER_MONTH = 10.0;
const BACKUP_FEE_PER_MONTH = 5.0;
const CDN_FEE_PER_MONTH = 20.0;

interface Service {
  name: string;
  getMonthlyCost: (device: Device) => number;
  isUpcharge?: boolean;
}

const services: Service[] = [
  { name: "Compute", getMonthlyCost: (d) => d.monthlyComputePrice },
  { name: "Storage", getMonthlyCost: (d) => d.storageSizeGB * STORAGE_COST_PER_GB_MONTH },
  { name: "Elastic IP", getMonthlyCost: (d) => ELASTIC_IP_FEE_PER_MONTH },
  { name: "Rotating IP", getMonthlyCost: (d) => (d.hasRotatingIP ? ROTATING_IP_FEE_PER_MONTH : 0), isUpcharge: true },
  { name: "Backup", getMonthlyCost: (d) => (d.hasBackup ? BACKUP_FEE_PER_MONTH : 0), isUpcharge: true },
  { name: "CDN", getMonthlyCost: (d) => (d.hasCDN ? CDN_FEE_PER_MONTH : 0), isUpcharge: true },
];

interface Month {
  name: string;
  start: Date;
  end: Date;
}

const months: Month[] = [
  { name: "July 2025", start: new Date(2025, 6, 1), end: new Date(2025, 6, 31) },
  { name: "August 2025", start: new Date(2025, 7, 1), end: new Date(2025, 7, 31) },
  { name: "September 2025", start: new Date(2025, 8, 1), end: new Date(2025, 8, 30) },
];

function calculateTotalsForMonth(month: Month) {
  const activeDevices = devices.filter((d) => new Date(d.activeSince) <= month.end);
  const totals = services.reduce((acc, s) => {
    acc[s.name] = activeDevices.reduce((sum, d) => sum + s.getMonthlyCost(d), 0);
    return acc;
  }, {} as Record<string, number>);
  const grandTotal = Object.values(totals).reduce((sum, cost) => sum + cost, 0);
  return { totals, grandTotal, activeDevices };
}

function BillingPage() {
  const currentMonth = months[months.length - 1];
  const { totals: currentTotals, activeDevices: currentActiveDevices } = calculateTotalsForMonth(currentMonth);

  const history = months.slice(0, -1).map((month) => {
    const { grandTotal } = calculateTotalsForMonth(month);
    return { month, total: grandTotal };
  });

  const allTimeTotal = months.slice(0, -1).reduce((sum, month) => sum + calculateTotalsForMonth(month).grandTotal, 0);
  const averageMonthly = history.length > 0 ? allTimeTotal / history.length : 0;
  const previousMonthTotal = history.length > 0 ? history[history.length - 1].total : 0;
  const monthOverMonthChange = previousMonthTotal > 0 ? ((currentTotals["Compute"] + currentTotals["Storage"] + currentTotals["Elastic IP"] - previousMonthTotal) / previousMonthTotal) * 100 : 0;

  return (
    <Container maxW="full" py={9}>
      <Flex align="center" justify="space-between" py={6}>
        <Text fontSize="3xl" color="black">Billing Portal</Text>
        <Text fontSize="lg" color="gray.600">Detailed billing information and history</Text>
      </Flex>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Current Billing</Tab>
          <Tab>Service Details</Tab>
          <Tab>Billing History</Tab>
          <Tab>Invoices</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading size="md" mb={4}>Estimated Costs for {currentMonth.name}</Heading>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Device Name</Th>
                    <Th>IP</Th>
                    {services.map((s) => (
                      <Th key={s.name} isNumeric>
                        Monthly {s.name} (USD)
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {currentActiveDevices.map((device) => (
                    <Tr key={device.name}>
                      <Td>{device.name}</Td>
                      <Td>{device.ip}</Td>
                      {services.map((s) => (
                        <Td key={s.name} isNumeric>
                          ${s.getMonthlyCost(device).toFixed(2)}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Box mt={6} p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
              <VStack align="stretch" spacing={2}>
                {services.map((s) => (
                  <Flex key={s.name} justify="space-between">
                    <Text fontWeight="bold">Estimated {s.name} Cost:</Text>
                    <Text>${currentTotals[s.name].toFixed(2)}</Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={4}>Service and Upcharge Details for {currentMonth.name}</Heading>
            <Accordion allowMultiple>
              {services.map((s) => {
                const relevantDevices = currentActiveDevices.filter((d) => s.getMonthlyCost(d) > 0);
                const total = currentTotals[s.name];
                return (
                  <AccordionItem key={s.name}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {s.name} {s.isUpcharge ? "(Upcharge)" : ""} - Estimated: ${total.toFixed(2)}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {relevantDevices.length > 0 ? (
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Device Name</Th>
                              <Th isNumeric>Cost (USD)</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {relevantDevices.map((d) => (
                              <Tr key={d.name}>
                                <Td>{d.name}</Td>
                                <Td isNumeric>${s.getMonthlyCost(d).toFixed(2)}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Text>No devices using this service.</Text>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={4}>Billing History</Heading>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Month</Th>
                    <Th isNumeric>Total Cost (USD)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {history.map(({ month, total }) => (
                    <Tr key={month.name}>
                      <Td>{month.name}</Td>
                      <Td isNumeric>${total.toFixed(2)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Box mt={6} p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
              <VStack align="stretch" spacing={2}>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Total Spent to Date:</Text>
                  <Text>${allTimeTotal.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Average Monthly Cost:</Text>
                  <Text>${averageMonthly.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Month-over-Month Change:</Text>
                  <Text>{monthOverMonthChange.toFixed(2)}%</Text>
                </Flex>
              </VStack>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={4}>Invoices</Heading>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Month</Th>
                    <Th isNumeric>Total Cost (USD)</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {history.map(({ month, total }) => (
                    <Tr key={month.name}>
                      <Td>{month.name}</Td>
                      <Td isNumeric>${total.toFixed(2)}</Td>
                      <Td>
                        <Button size="sm" colorScheme="blue">
                          Download Invoice
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button as={ChakraLink} href=".." mt={4}>Back to Hosting</Button>
    </Container>
  );
}

export const Route = createFileRoute("/_layout/hosting/billing")({
  component: BillingPage,
});