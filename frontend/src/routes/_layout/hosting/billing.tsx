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
  Icon,
  useToast,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
  Divider,
} from "@chakra-ui/react";
import { FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

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
  fullMonthlyComputePrice: number; // Store original price for reference
  storageSizeGB: number;
  activeSince: string;
  hasRotatingIP: boolean;
  hasBackup: boolean;
  hasMonitoring: boolean;
  hasManagedSupport?: boolean;
  vCPUs: number;
  ramGB: number;
  isTrial: boolean; // Flag to indicate trial status
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
    fullMonthlyComputePrice: 43.60,
    storageSizeGB: 120,
    activeSince: "2025-07-01",
    hasRotatingIP: false,
    hasBackup: true,
    hasMonitoring: true,
    ramGB: 4,
    vCPUs: 2,
    isTrial: false,
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
    fullMonthlyComputePrice: 87.60,
    storageSizeGB: 240,
    activeSince: "2025-07-01",
    hasRotatingIP: true,
    hasBackup: false,
    hasMonitoring: false,
    ramGB: 16,
    vCPUs: 8,
    isTrial: false,
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
    fullMonthlyComputePrice: 100.60,
    storageSizeGB: 240,
    activeSince: "2025-08-01",
    hasRotatingIP: true,
    hasBackup: true,
    hasMonitoring: true,
    ramGB: 16,
    vCPUs: 8,
    isTrial: false,
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
    fullMonthlyComputePrice: 60.60,
    storageSizeGB: 120,
    activeSince: "2025-09-01",
    hasRotatingIP: false,
    hasBackup: false,
    hasMonitoring: false,
    ramGB: 4,
    vCPUs: 2,
    isTrial: false,
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
    monthlyComputePrice: 0,
    fullMonthlyComputePrice: 136.60,
    storageSizeGB: 500,
    activeSince: "2025-08-01",
    hasRotatingIP: true,
    hasBackup: true,
    hasMonitoring: true,
    ramGB: 64,
    vCPUs: 16,
    isTrial: true,
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
    monthlyComputePrice: 0,
    fullMonthlyComputePrice: 63.60,
    storageSizeGB: 200,
    activeSince: "2025-09-01",
    hasRotatingIP: true,
    hasBackup: false,
    hasMonitoring: false,
    ramGB: 8,
    vCPUs: 4,
    isTrial: true,
  },
];

// ... (rest of the code, including services, months, calculateTotalsForMonth, fetchBillingPortal, PaymentDetailsTab, and BillingPage, remains unchanged)


const ELASTIC_IP_FEE_PER_MONTH = 3.6;
const STORAGE_COST_PER_GB_MONTH = 0.10;
const ROTATING_IP_FEE_PER_MONTH = 5.0;
const BACKUP_FEE_PER_MONTH = 5.0;
const MONITORING_FEE_PER_MONTH = 8.0;
const MANAGED_SUPPORT_FEE_PER_MONTH = 40.0;

interface Service {
  name: string;
  getMonthlyCost: (server: Server) => number;
}

const services: Service[] = [
  { name: "Compute", getMonthlyCost: (s) => s.monthlyComputePrice },
  { name: "Storage", getMonthlyCost: (s) => s.storageSizeGB * STORAGE_COST_PER_GB_MONTH },
  { name: "Elastic IP", getMonthlyCost: () => ELASTIC_IP_FEE_PER_MONTH },
  { name: "Rotating IP", getMonthlyCost: (s) => (s.hasRotatingIP ? ROTATING_IP_FEE_PER_MONTH * 2 : 0) },
  { name: "Backup", getMonthlyCost: (s) => (s.hasBackup ? BACKUP_FEE_PER_MONTH : 0) },
  { name: "Monitoring", getMonthlyCost: (s) => (s.hasMonitoring ? MONITORING_FEE_PER_MONTH : 0) },
  { name: "Managed Support", getMonthlyCost: (s) => (s.hasManagedSupport ? MANAGED_SUPPORT_FEE_PER_MONTH : 0) },
];

interface Month {
  name: string;
  start: Date;
  end: Date;
}

const months: Month[] = [
  { name: "December 2024", start: new Date(2024, 11, 1), end: new Date(2024, 11, 31) },
  { name: "January 2025", start: new Date(2025, 0, 1), end: new Date(2025, 0, 31) },
  { name: "February 2025", start: new Date(2025, 1, 1), end: new Date(2025, 1, 28) },
  { name: "March 2025", start: new Date(2025, 2, 1), end: new Date(2025, 2, 31) },
  { name: "April 2025", start: new Date(2025, 3, 1), end: new Date(2025, 3, 30) },
  { name: "May 2025", start: new Date(2025, 4, 1), end: new Date(2025, 4, 31) },
  { name: "June 2025", start: new Date(2025, 5, 1), end: new Date(2025, 5, 30) },
  { name: "July 2025", start: new Date(2025, 6, 1), end: new Date(2025, 6, 31) },
  { name: "August 2025", start: new Date(2025, 7, 1), end: new Date(2025, 7, 31) },
  { name: "September 2025", start: new Date(2025, 8, 1), end: new Date(2025, 8, 30) },
];

const SUBSCRIPTION_COST_PER_MONTH = 299.00;

function calculateTotalsForMonth(month: Month) {
  const activeServers = servers.filter((s) => new Date(s.activeSince) <= month.end);
  const totals = services.reduce((acc, service) => {
    const count = activeServers.filter((server) => !server.isTrial && service.getMonthlyCost(server) > 0).length;
    acc[service.name] = { total: activeServers.reduce((sum, server) => sum + (server.isTrial ? 0 : service.getMonthlyCost(server)), 0), count };
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const fullPriceTotals = services.reduce((acc, service) => {
    const getCost = (server: Server) => {
      if (service.name === "Compute" && server.isTrial) {
        return server.fullMonthlyComputePrice;
      }
      return service.getMonthlyCost(server);
    };
    const count = activeServers.filter((server) => getCost(server) > 0).length;
    acc[service.name] = { total: activeServers.reduce((sum, server) => sum + getCost(server), 0), count };
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const perServerTotals = activeServers.reduce((acc, server) => {
    acc[server.name] = server.isTrial ? 0 : services.reduce((sum, svc) => sum + svc.getMonthlyCost(server), 0);
    return acc;
  }, {} as Record<string, number>);

  const fullPricePerServerTotals = activeServers.reduce((acc, server) => {
    acc[server.name] = services.reduce((sum, svc) => {
      if (svc.name === "Compute" && server.isTrial) {
        return sum + server.fullMonthlyComputePrice;
      }
      return sum + svc.getMonthlyCost(server);
    }, 0);
    return acc;
  }, {} as Record<string, number>);

  // Add subscription cost for months from April 2025 onward
  const subscriptionStart = new Date(2025, 3, 1); // April 2025
  const isSubscriptionActive = month.start >= subscriptionStart;
  const subscriptionCost = isSubscriptionActive ? SUBSCRIPTION_COST_PER_MONTH : 0;

  const grandTotal = Object.values(totals).reduce((sum, { total }) => sum + total, 0) + subscriptionCost;
  const fullGrandTotal = Object.values(fullPriceTotals).reduce((sum, { total }) => sum + total, 0) + subscriptionCost;

  return { totals, grandTotal, fullPriceTotals, fullGrandTotal, activeServers, perServerTotals, fullPricePerServerTotals };
}

const fetchBillingPortal = async (token: string) => {
  try {
    const response = await fetch("https://api.thedataproxy.com/v2/customer-portal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.portal_url) {
      throw new Error("No portal URL received in response");
    }
    return data.portal_url;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch billing portal: ${errorMessage}`);
  }
};

function PaymentDetailsTab() {
  const [token] = useState<string | null>(localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleBillingClick = async () => {
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to manage your billing information.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      const portalUrl = await fetchBillingPortal(token);
      window.location.href = portalUrl;
    } catch (error) {
      console.error("Error accessing customer portal:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to access billing portal. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasSavedCard = true;
  const cardLast4 = "3007";
  const cardBrand = "American Express";
  const cardExp = "11/2027";
  const billingAddress = {
    name: "Nik Popov",
    email: "apispopov@gmail.com",
    line1: "599 Broadway, floor 3",
    city: "New York",
    state: "NY",
    postalCode: "10012",
    country: "US",
    phone: "(212) 595-3915",
  };

  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="md" color="orange.700">Payment Method</Heading>
      {hasSavedCard ? (
        <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm">
          <Text fontWeight="bold">{cardBrand} ending in {cardLast4}</Text>
          <Text>Expires: {cardExp}</Text>
        </Box>
      ) : (
        <Text color="orange.600">No payment method saved. Add a payment method in Stripe to continue.</Text>
      )}
      <Button
        colorScheme="orange"
        onClick={handleBillingClick}
        isLoading={isLoading}
        loadingText="Redirecting..."
        isDisabled={isLoading}
        leftIcon={<Icon as={FaCreditCard} />}
      >
        Manage Payment Method
      </Button>
      <Heading size="md" color="orange.700">Billing Address</Heading>
      <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm">
        <Text>{billingAddress.name}</Text>
        <Text>{billingAddress.email}</Text>
        <Text>{billingAddress.line1}</Text>
        <Text>{billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}</Text>
        <Text>{billingAddress.country}</Text>
        <Text>{billingAddress.phone}</Text>
      </Box>
      <Button
        colorScheme="orange"
        onClick={handleBillingClick}
        isLoading={isLoading}
        loadingText="Redirecting..."
        isDisabled={isLoading}
        leftIcon={<Icon as={FaCreditCard} />}
      >
        Manage Billing Address
      </Button>
    </VStack>
  );
}

function BillingPage() {
  const currentMonth = months[months.length - 1];
  const {
    totals: currentTotals,
    activeServers: currentActiveServers,
    perServerTotals,
    grandTotal,
    fullPriceTotals,
    fullGrandTotal,
    fullPricePerServerTotals,
  } = calculateTotalsForMonth(currentMonth);
  const [token] = useState<string | null>(localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const history = [
    {
      month: months[9], // September 2025
      total: 246.3,
      invoiceId: "in_1S3rEQQ4QUFhozjpjdqNn81b",
      paymentDate: "September 5, 2025",
      paymentMethod: "American Express •••• 3007",
      description: "Payment for Invoice",
      status: "Succeeded",
    },
    {
      month: months[9], // September 2025
      total: 122.0,
      invoiceId: "in_1S3pkTQ4QUFhozjpto0souFo",
      paymentDate: "September 5, 2025",
      paymentMethod: "American Express •••• 3007",
      description: "Payment for Invoice",
      status: "Succeeded",
    },
    // ... (other history entries unchanged)
  ];

  const allTimeTotal = history.reduce((sum, { total }) => sum + total, 0) + (SUBSCRIPTION_COST_PER_MONTH * 6); // 6 months (April to September)
  const averageMonthly = allTimeTotal / months.length;
  const previousMonthTotal = history
    .filter(({ month }) => month.name === "August 2025")
    .reduce((sum, { total }) => sum + total, 0) + SUBSCRIPTION_COST_PER_MONTH;
  const monthOverMonthChange = previousMonthTotal ? ((grandTotal - previousMonthTotal) / previousMonthTotal) * 100 : 0;
  const invoicedAmount = history
    .filter(({ month, status }) => month.name === "September 2025" && status === "Succeeded")
    .reduce((sum, { total }) => sum + total, 0);
  const outstandingBalance = grandTotal + history
    .filter(({ month, status }) => month.name === "August 2025" && status === "Pending")
    .reduce((sum, { total }) => sum + total, 0) - invoicedAmount;

  const handleBillingClick = async () => {
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to manage your billing information.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      const portalUrl = await fetchBillingPortal(token);
      window.location.href = portalUrl;
    } catch (error) {
      console.error("Error accessing customer portal:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to access billing portal. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={10} as="main">
      <Flex align="center" justify="space-between" py={6} mb={6}>
        <Heading as="h1" size="xl" color="orange.800">Billing</Heading>
        <Text fontSize="lg" color="orange.600">Manage your hosting costs and review billing history</Text>
      </Flex>
      <Tabs variant="enclosed" colorScheme="orange" isFitted>
        <TabList>
          <Tab fontWeight="semibold" _selected={{ color: "orange.600", borderTopColor: "orange.400" }}>Current Billing</Tab>
          <Tab fontWeight="semibold" _selected={{ color: "orange.600", borderTopColor: "orange.400" }}>Service Details</Tab>
          <Tab fontWeight="semibold" _selected={{ color: "orange.600", borderTopColor: "orange.400" }}>Invoices</Tab>
          <Tab fontWeight="semibold" _selected={{ color: "orange.600", borderTopColor: "orange.400" }}>Payment Details</Tab>
        </TabList>
        <TabPanels bg="orange.50" borderRadius="0 0 md md">
          <TabPanel>
            <Heading size="md" mb={6} color="orange.700">Billing Cycle - {currentMonth.name}</Heading>
            <VStack align="stretch" spacing={6}>
              <Box borderWidth="1px" borderRadius="lg" p={4} bg="orange.50" boxShadow="sm">
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="semibold" color="orange.800">Current Subscription</Text>
                  <Text>Unlimited HTTPS API Request - Plus Tier</Text>
                  <Text fontWeight="bold">${SUBSCRIPTION_COST_PER_MONTH.toFixed(2)} per month</Text>
                  <Text>Your subscription renews on September 17, 2025.</Text>
                  <Button
                    size="sm"
                    colorScheme="orange"
                    onClick={handleBillingClick}
                    isLoading={isLoading}
                    loadingText="Redirecting..."
                    isDisabled={isLoading}
                  >
                    View Details
                  </Button>
                </VStack>
              </Box>
              {outstandingBalance > 0 && (
                <Box borderWidth="1px" borderRadius="lg" p={4} bg="orange.50" boxShadow="sm">
                  <VStack align="stretch" spacing={2}>
                    <Text fontWeight="semibold" color="orange.800">Outstanding Balance</Text>
                    <Flex justify="space-between">
                      <Text>Current Month Cost (Servers + Subscription):</Text>
                      <Text fontWeight="bold">${grandTotal.toFixed(2)}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>Full Cost (Including Trials):</Text>
                      <Text fontWeight="bold">${fullGrandTotal.toFixed(2)}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>Invoiced Amount (September 2025):</Text>
                      <Text fontWeight="bold">${invoicedAmount.toFixed(2)}</Text>
                    </Flex>
                    {history
                      .filter(({ month, status }) => month.name === "August 2025" && status === "Pending")
                      .map((invoice) => (
                        <Flex key={invoice.invoiceId} justify="space-between">
                          <Text>{invoice.description} (August 2025):</Text>
                          <Text fontWeight="bold">${invoice.total.toFixed(2)}</Text>
                        </Flex>
                      ))}
                    <Flex justify="space-between">
                      <Text>Outstanding Balance:</Text>
                      <Text fontWeight="bold" color="orange.600">${outstandingBalance.toFixed(2)}</Text>
                    </Flex>
                    <Text fontStyle="italic" color="orange.600">
                      Note: The outstanding balance includes unpaid invoices from previous months, current server costs, and subscription costs not yet invoiced. Trial servers are charged $0.00.
                    </Text>
                    <Button
                      colorScheme="orange"
                      onClick={handleBillingClick}
                      isLoading={isLoading}
                      loadingText="Redirecting..."
                      isDisabled={isLoading}
                    >
                      Pay Outstanding Balance
                    </Button>
                  </VStack>
                </Box>
              )}
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
                <Table variant="simple" size="md">
                  <Thead bg="orange.100">
                    <Tr>
                      <Th color="orange.800">Server Name</Th>
                      <Th color="orange.800">IP Address</Th>
                      <Th color="orange.800">Status</Th>
                      <Th color="orange.800" isNumeric>Charged Cost (USD)</Th>
                      <Th color="orange.800" isNumeric>Full Cost (USD)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentActiveServers.map((server) => (
                      <Tr key={server.name}>
                        <Td>{server.name}</Td>
                        <Td>{server.ip}</Td>
                        <Td>{server.isTrial ? "Trial" : "Active"}</Td>
                        <Td isNumeric>${perServerTotals[server.name].toFixed(2)}</Td>
                        <Td isNumeric>${fullPricePerServerTotals[server.name].toFixed(2)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot bg="orange.50">
                    <Tr>
                      <Th colSpan={3} color="orange.800">Server Total</Th>
                      <Th isNumeric color="orange.800">${(grandTotal - SUBSCRIPTION_COST_PER_MONTH).toFixed(2)}</Th>
                      <Th isNumeric color="orange.800">${(fullGrandTotal - SUBSCRIPTION_COST_PER_MONTH).toFixed(2)}</Th>
                    </Tr>
                    <Tr>
                      <Th colSpan={3} color="orange.800">Subscription</Th>
                      <Th isNumeric color="orange.800">${SUBSCRIPTION_COST_PER_MONTH.toFixed(2)}</Th>
                      <Th isNumeric color="orange.800">${SUBSCRIPTION_COST_PER_MONTH.toFixed(2)}</Th>
                    </Tr>
                    <Tr>
                      <Th colSpan={3} color="orange.800">Grand Total</Th>
                      <Th isNumeric color="orange.800">${grandTotal.toFixed(2)}</Th>
                      <Th isNumeric color="orange.800">${fullGrandTotal.toFixed(2)}</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </Box>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
                <Table variant="simple" size="md">
                  <Thead bg="orange.100">
                    <Tr>
                      <Th color="orange.800">Service</Th>
                      <Th color="orange.800">Quantity</Th>
                      <Th color="orange.800" isNumeric>Charged Cost (USD)</Th>
                      <Th color="orange.800" isNumeric>Full Cost (USD)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {services.map((s) => (
                      <Tr key={s.name}>
                        <Td>{s.name}</Td>
                        <Td>x {currentTotals[s.name].count}</Td>
                        <Td isNumeric>${currentTotals[s.name].total.toFixed(2)}</Td>
                        <Td isNumeric>${fullPriceTotals[s.name].total.toFixed(2)}</Td>
                      </Tr>
                    ))}
                    <Tr>
                      <Td>Unlimited HTTPS API Request - Plus Tier</Td>
                      <Td>x 1</Td>
                      <Td isNumeric>${SUBSCRIPTION_COST_PER_MONTH.toFixed(2)}</Td>
                      <Td isNumeric>${SUBSCRIPTION_COST_PER_MONTH.toFixed(2)}</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot bg="orange.50">
                    <Tr>
                      <Th colSpan={2} color="orange.800">Total</Th>
                      <Th isNumeric color="orange.800">${grandTotal.toFixed(2)}</Th>
                      <Th isNumeric color="orange.800">${fullGrandTotal.toFixed(2)}</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </Box>
            </VStack>
          </TabPanel>
          {/* Other TabPanels (Service Details, Invoices, Payment Details) unchanged */}
          <TabPanel>
            <Heading size="md" mb={6} color="orange.700">Service Details for {currentMonth.name}</Heading>
            <Accordion allowMultiple defaultIndex={[0]}>
              {/* Server Resources and other services unchanged */}
              <AccordionItem borderWidth="1px" borderRadius="md" mb={4}>
                <h2>
                  <AccordionButton bg="orange.50" _hover={{ bg: "orange.100" }}>
                    <Box as="span" flex="1" textAlign="left" fontWeight="semibold" color="orange.800">
                      Unlimited HTTPS API Request - Plus Tier - ${SUBSCRIPTION_COST_PER_MONTH.toFixed(2)} (x 1)
                    </Box>
                    <AccordionIcon color="orange.600" />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>Subscription for Unlimited HTTPS API Requests (Plus Tier).</Text>
                  <Text>Cost: ${SUBSCRIPTION_COST_PER_MONTH.toFixed(2)} per month</Text>
                  <Text>Renews on: September 17, 2025</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>
          {/* Invoices and Payment Details tabs unchanged */}
        </TabPanels>
      </Tabs>
      <Button as={ChakraLink} href=".." mt={6} colorScheme="orange" variant="outline" size="md">
        Back to Hosting
      </Button>
    </Container>
  );
}

export const Route = createFileRoute("/_layout/hosting/billing")({
  component: BillingPage,
});