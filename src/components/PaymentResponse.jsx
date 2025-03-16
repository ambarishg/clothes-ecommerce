import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  VStack
} from '@chakra-ui/react';

function PaymentResponse() {
  // Retrieve order ID from session storage
  const orderId = sessionStorage.getItem("order_id");
  
  // State variables
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to verify payment status
  const verifyPayment = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!orderId) {
        throw new Error('No order ID found in session storage');
      }

      const response = await fetch(
        `https://paymentwb.azurewebsites.net/api/order_status_verification?order_id=${orderId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Payment verification failed');
      }

      const data = await response.json();
      setPaymentStatus(data.order_status);
      console.log("THE ORDER STATUS IS ----------------------");
      console.log(data.order_status);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect to verify payment on component mount
  useEffect(() => {
    if (orderId) {
      verifyPayment();
    } else {
      setError('No order ID found in session storage');
      setIsLoading(false);
    }
  }, [orderId]);

  // Function to determine status color
  const getStatusColor = () => {
    if (!paymentStatus) return 'blue';
    return paymentStatus.toLowerCase().includes('paid') ? 'green' : 'red';
  };

  return (
    <Box p={8} maxW="600px" mx="auto">
      <Heading as="h1" mb={6} textAlign="center">
        Payment Status
      </Heading>

      {isLoading ? (
        <VStack spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text>Verifying payment status...</Text>
        </VStack>
      ) : error ? (
        <Alert status="error" variant="subtle" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Error verifying payment</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <Button
              mt={3}
              size="sm"
              onClick={verifyPayment}
            >
              Retry Verification
            </Button>
          </Box>
        </Alert>
      ) : (
        <Alert
          status={getStatusColor()}
          variant="subtle"
          borderRadius="md"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <Box mt={4} mb={2}>
            <AlertTitle fontSize="xl">
              {paymentStatus && paymentStatus.includes('PAID') ? 'Payment Successful!' : 'Payment Issue Detected'}
            </AlertTitle>
            <AlertDescription maxW="sm" mt={2}>
              {paymentStatus || 'Unknown status'}
            </AlertDescription>
            <Text mt={4} fontSize="sm" opacity={0.8}>
              Order ID: {orderId || 'Not available'}
            </Text>
          </Box>
        </Alert>
      )}
    </Box>
  );
}

export default PaymentResponse;
