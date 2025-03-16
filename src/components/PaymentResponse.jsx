import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useCart } from "../contexts/CartContext";

/**
 * Component to display payment status after verification.
 */
function PaymentResponse() {
  // Retrieve order ID from session storage
  const orderId = sessionStorage.getItem("order_id");
  
  // State variables
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get cart context
  const { clearCart } = useCart();

  /**
   * Function to verify payment status by fetching data from the API.
   */
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
      
      // Clear cart if payment is successful
      if (data.order_status && data.order_status.toLowerCase().includes('paid')) {
        clearCart();
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Use effect to verify payment on component mount.
   */
  useEffect(() => {
    if (orderId) {
      verifyPayment();
    } else {
      setError('No order ID found in session storage');
      setIsLoading(false);
    }
  }, [orderId]);

  /**
   * Function to determine status color based on payment status.
   */
  const getStatusColor = () => {
    if (!paymentStatus) return 'blue';
    return paymentStatus.toLowerCase().includes('paid') ? 'green' : 'red';
  };

  return (
    <Box
      p={8}
      maxW="600px"
      mx="auto"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      py={6}
    >
      <Heading as="h1" mb={6} textAlign="center" fontSize="xl" fontWeight="bold">
        Payment Status
      </Heading>

  
      <Box mt={4} mb={4} textAlign="center">
        {paymentStatus && paymentStatus.includes('PAID') ? (
          <Box
            
            p={4}
            borderRadius="md"
            color="green.500"
          >
            <Text fontSize="xl" fontWeight="bold">
              Payment Successful!
            </Text>
            <Text mt={4} fontSize="sm" opacity={0.8}>
              Order ID: {orderId || 'Not available'}
            </Text>
          </Box>
        ) : (
          <Box
            
            p={4}
            borderRadius="md"
            color="red.500"
          >
            <Text fontSize="xl" fontWeight="bold">
              Payment Issue Detected
            </Text>
            <Text mt={4} fontSize="sm" opacity={0.8}>
              Order ID: {orderId || 'Not available'}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
  
}

export default PaymentResponse;
