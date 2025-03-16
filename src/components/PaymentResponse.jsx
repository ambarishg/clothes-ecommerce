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
    <Box p={8} maxW="600px" mx="auto">
      <Heading as="h1" mb={6} textAlign="center">
        Payment Status
      </Heading>
        <Box mt={4} mb={2}>
          {paymentStatus && paymentStatus.includes('PAID') ? 'Payment Successful!' : 'Payment Issue Detected'}
          <Text mt={4}>
            Order ID: {orderId || 'Not available'}
          </Text>
        </Box>
      
    </Box>
  );
}

export default PaymentResponse;
