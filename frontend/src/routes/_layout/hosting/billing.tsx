import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Container,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
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
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";

// Hardcoded servers with pricing
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
  activeSince: string; // YYYY-MM-DD
  hasRotatingIP?: boolean;
  hasBackup?: boolean;
  hasMonitoring?: boolean;
}

const servers: Server[] = [
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
    hasMonitoring: true,
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
    hasMonitoring: false,
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
    hasMonitoring: true,
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
    hasMonitoring: false,
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
    hasMonitoring: true,
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
    hasMonitoring: false,
  },
];

const ELASTIC_IP_FEE_PER_MONTH = 3.6; // $0.005 per hour * 24 * 30 = $3.60 per IP per month
const STORAGE_COST_PER_GB_MONTH = 0.10; // Approximate EBS gp2 cost: $0.10/GB-month
const ROTATING_IP_FEE_PER_MONTH = 10.0;
const BACKUP_FEE_PER_MONTH = 5.0;
const MONITORING_FEE_PER_MONTH = 8.0;

interface Service {
  name: string;
  getMonthlyCost: (server: Server) => number;
}

const services: Service[] = [
  { name: "Compute", getMonthlyCost: (s) => s.monthlyComputePrice },
  { name: "Storage", getMonthlyCost: (s) => s.storageSizeGB * STORAGE_COST_PER_GB_MONTH },
  { name: "Elastic IP", getMonthlyCost: () => ELASTIC_IP_FEE_PER_MONTH },
  { name: "Rotating IP", getMonthlyCost: (s) => (s.hasRotatingIP ? ROTATING_IP_FEE_PER_MONTH : 0) },
  { name: "Backup", getMonthlyCost: (s) => (s.hasBackup ? BACKUP_FEE_PER_MONTH : 0) },
  { name: "Monitoring", getMonthlyCost: (s) => (s.hasMonitoring ? MONITORING_FEE_PER_MONTH : 0) },
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
  const activeServers = servers.filter((s) => new Date(s.activeSince) <= month.end);
  const totals = services.reduce((acc, service) => {
    const count = activeServers.filter((server) => service.getMonthlyCost(server) > 0).length;
    acc[service.name] = { total: activeServers.reduce((sum, server) => sum + service.getMonthlyCost(server), 0), count };
    return acc;
  }, {} as Record<string, { total: number; count: number }>);
  const perServerTotals = activeServers.reduce((acc, server) => {
    acc[server.name] = services.reduce((sum, svc) => sum + svc.getMonthlyCost(server), 0);
    return acc;
  }, {} as Record<string, number>);
  const grandTotal = Object.values(totals).reduce((sum, { total }) => sum + total, 0);
  return { totals, grandTotal, activeServers, perServerTotals };
}

function PaymentDetailsTab() {
  // Mock data for saved payment method and billing address
  const hasSavedCard = true; // Change to false to simulate no saved card
  const cardLast4 = "4242";
  const cardBrand = "Visa";
  const cardExp = "12/2026";
  const billingAddress = {
    name: "John Doe",
    line1: "123 Main St",
    city: "Anytown",
    state: "CA",
    postalCode: "12345",
    country: "USA",
  };

  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="md" color="gray.700">Payment Method</Heading>
      {hasSavedCard ? (
        <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm">
          <Text fontWeight="bold">{cardBrand} **** {cardLast4}</Text>
          <Text>Expires: {cardExp}</Text>
        </Box>
      ) : (
        <Text>No payment method saved.</Text>
      )}
      <Heading size="md" color="gray.700" mt={4}>Billing Address</Heading>
      <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm">
        <Text>{billingAddress.name}</Text>
        <Text>{billingAddress.line1}</Text>
        <Text>{billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}</Text>
        <Text>{billingAddress.country}</Text>
      </Box>
      <Button colorScheme="blue" as="a" href="https://billing.stripe.com/" target="_blank">
        Manage in Stripe
      </Button>
    </VStack>
  );
}

function BillingPage() {
  const currentMonth = months[months.length - 1];
  const { totals: currentTotals, activeServers: currentActiveServers, perServerTotals, grandTotal } = calculateTotalsForMonth(currentMonth);

  const history = months.slice(0, -1).map((month) => {
    const { grandTotal } = calculateTotalsForMonth(month);
    return { month, total: grandTotal };
  });

  const allTimeTotal = months.slice(0, -1).reduce((sum, month) => sum + calculateTotalsForMonth(month).grandTotal, 0);
  const averageMonthly = history.length > 0 ? allTimeTotal / history.length : 0;
  const previousMonthTotal = history.length > 0 ? history[history.length - 1].total : 0;
  const monthOverMonthChange = previousMonthTotal > 0 ? ((currentTotals["Compute"].total + currentTotals["Storage"].total + currentTotals["Elastic IP"].total - previousMonthTotal) / previousMonthTotal) * 100 : 0;

  return (
    <Container maxW="container.xl" py={10}>
      <Flex align="center" justify="space-between" py={6} mb={6}>
        <Heading size="xl" color="gray.800">Billing Portal</Heading>
        <Text fontSize="lg" color="gray.600">Manage your hosting costs and review billing history</Text>
      </Flex>

      <Tabs variant="enclosed" colorScheme="blue" isFitted>
        <TabList>
          <Tab fontWeight="semibold">Current Billing</Tab>
          <Tab fontWeight="semibold">Service Details</Tab>
          <Tab fontWeight="semibold">Billing History</Tab>
          <Tab fontWeight="semibold">Invoices</Tab>
          <Tab fontWeight="semibold">Payment Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading size="md" mb={6} color="gray.700">Costs for {currentMonth.name}</Heading>
            <VStack align="stretch" spacing={6}>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
                <Table variant="simple" size="md">
                  <Thead bg="gray.100">
                    <Tr>
                      <Th>Server Name</Th>
                      <Th>IP Address</Th>
                      <Th isNumeric>Total Cost (USD)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentActiveServers.map((server) => (
                      <Tr key={server.name}>
                        <Td>{server.name}</Td>
                        <Td>{server.ip}</Td>
                        <Td isNumeric>${perServerTotals[server.name].toFixed(2)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot bg="gray.50">
                    <Tr>
                      <Th colSpan={2}>Total</Th>
                      <Th isNumeric>${grandTotal.toFixed(2)}</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </Box>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
                <Table variant="simple" size="md">
                  <Thead bg="gray.100">
                    <Tr>
                      <Th>Service</Th>
                      <Th>Quantity</Th>
                      <Th isNumeric>Cost (USD)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {services.map((s) => (
                      <Tr key={s.name}>
                        <Td>{s.name}</Td>
                        <Td>x {currentTotals[s.name].count}</Td>
                        <Td isNumeric>${currentTotals[s.name].total.toFixed(2)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot bg="gray.50">
                    <Tr>
                      <Th colSpan={2}>Total</Th>
                      <Th isNumeric>${grandTotal.toFixed(2)}</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </Box>
            </VStack>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={6} color="gray.700">Service Details for {currentMonth.name}</Heading>
            <Accordion allowMultiple>
              {services.map((s) => {
                const relevantServers = currentActiveServers.filter((server) => s.getMonthlyCost(server) > 0);
                const total = currentTotals[s.name].total;
                return (
                  <AccordionItem key={s.name} borderWidth="1px" borderRadius="md" mb={4}>
                    <h2>
                      <AccordionButton bg="gray.50" _hover={{ bg: "gray.100" }}>
                        <Box as="span" flex="1" textAlign="left" fontWeight="semibold">
                          {s.name} - ${total.toFixed(2)} (x {relevantServers.length} {relevantServers.length !== 1 ? "servers" : "server"})
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {relevantServers.length > 0 ? (
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Server Name</Th>
                              <Th isNumeric>Cost (USD)</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {relevantServers.map((server) => (
                              <Tr key={server.name}>
                                <Td>{server.name}</Td>
                                <Td isNumeric>${s.getMonthlyCost(server).toFixed(2)}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Text color="gray.600">No servers using this service.</Text>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={6} color="gray.700">Billing History</Heading>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
              <Table variant="simple" size="md">
                <Thead bg="gray.100">
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
            <Box mt={6} p={4} borderWidth="1px" borderRadius="lg" bg="gray.50" boxShadow="sm">
              <VStack align="stretch" spacing={3}>
                <Flex justify="space-between">
                  <Text fontWeight="semibold" color="gray.700">Total Spent to Date</Text>
                  <Text fontWeight="bold">${allTimeTotal.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="semibold" color="gray.700">Average Monthly Cost</Text>
                  <Text fontWeight="bold">${averageMonthly.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="semibold" color="gray.700">Month-over-Month Change</Text>
                  <Text fontWeight="bold">{monthOverMonthChange.toFixed(2)}%</Text>
                </Flex>
              </VStack>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={6} color="gray.700">Invoices</Heading>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
              <Table variant="simple" size="md">
                <Thead bg="gray.100">
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
                        <Button size="sm" colorScheme="blue" variant="outline">
                          Download Invoice
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={6} color="gray.700">Payment Details</Heading>
            <PaymentDetailsTab />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button as={ChakraLink} href=".." mt={6} colorScheme="blue" variant="outline" size="md">
        Back to Hosting
      </Button>
    </Container>
  );
}

export const Route = createFileRoute("/_layout/hosting/billing")({
  component: BillingPage,
});