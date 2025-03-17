import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Grid,
  GridItem,
  Badge,
  useColorModeValue,
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
  const [orderDetails, setOrderDetails] = useState(null);

  // Get cart context
  const { clearCart, getCartDetails } = useCart();

  // Get cart details
  const cartDetails = getCartDetails();

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
      setOrderDetails(data);
      console.log("THE ORDER STATUS IS ----------------------");
      console.log(data.order_status);
      
      // Clear cart if payment is successful
      if (data.order_status && data.order_status.toLowerCase().includes('paid')) {
        // Save cart details to state before clearing
        setOrderDetails(prev => ({
          ...prev,
          cartDetails: cartDetails
        }));
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

  // Background colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // Date formatting
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleString();
  };

  return (
    <Box
      p={8}
      maxW="800px"
      mx="auto"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="lg"
      py={6}
    >
      <Heading as="h1" mb={6} textAlign="center" fontSize="2xl" fontWeight="bold">
        Order Confirmation
      </Heading>
      
      {isLoading ? (
        <Text textAlign="center">Verifying payment...</Text>
      ) : error ? (
        <Text textAlign="center" color="red.500">{error}</Text>
      ) : (
        <>
          <Box 
            mb={6} 
            textAlign="center" 
            bg={paymentStatus && paymentStatus.includes('PAID') ? 'green.50' : 'red.50'} 
            p={4} 
            borderRadius="md"
          >
            {paymentStatus && paymentStatus.includes('PAID') ? (
              <Badge colorScheme="green" p={2} fontSize="md">
                Payment Successful
              </Badge>
            ) : (
              <Badge colorScheme="red" p={2} fontSize="md">
                Payment Issue Detected
              </Badge>
            )}
          </Box>

          <Box bg={cardBgColor} p={5} borderRadius="md" mb={6}>
            <Flex justifyContent="space-between" mb={4}>
              <Box>
                <Text fontWeight="bold">Order ID</Text>
                <Text>{orderId || 'Not available'}</Text>
              </Box>
              <Box textAlign="right">
                <Text fontWeight="bold">Date</Text>
                <Text>{formatDate()}</Text>
              </Box>
            </Flex>
          </Box>

          {/* Display order details only if payment is successful */}
          {paymentStatus && paymentStatus.includes('PAID') && orderDetails && orderDetails.cartDetails && (
            <>
              <Heading as="h2" size="md" mb={4}>
                Order Summary
              </Heading>
              
              <Box bg={cardBgColor} p={5} borderRadius="md" mb={6}>
                <Grid templateColumns="repeat(12, 1fr)" gap={4} fontWeight="bold" mb={3}>
                  <GridItem colSpan={6}>Product</GridItem>
                  <GridItem colSpan={2} textAlign="center">Quantity</GridItem>
                  <GridItem colSpan={2} textAlign="right">Price</GridItem>
                  <GridItem colSpan={2} textAlign="right">Total</GridItem>
                </Grid>
                
                <Divider mb={4} />
                
                {orderDetails.cartDetails.items.map((item) => (
                  <Grid key={item.id} templateColumns="repeat(12, 1fr)" gap={4} mb={3}>
                    <GridItem colSpan={6}>
                      <Text fontWeight="medium">{item.name}</Text>
                      {item.description && (
                        <Text fontSize="sm" color={textColor} noOfLines={1}>
                          {item.description}
                        </Text>
                      )}
                    </GridItem>
                    <GridItem colSpan={2} textAlign="center">
                      {item.quantity}
                    </GridItem>
                    <GridItem colSpan={2} textAlign="right">
                      ${item.price.toFixed(2)}
                    </GridItem>
                    <GridItem colSpan={2} textAlign="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </GridItem>
                  </Grid>
                ))}
                
                <Divider my={4} />
                
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                  <GridItem colSpan={8} textAlign="right" fontWeight="bold">
                    Subtotal:
                  </GridItem>
                  <GridItem colSpan={4} textAlign="right">
                    ${orderDetails.cartDetails.subtotal.toFixed(2)}
                  </GridItem>
                </Grid>
                
                <Grid templateColumns="repeat(12, 1fr)" gap={4} mt={2}>
                  <GridItem colSpan={8} textAlign="right" fontWeight="bold">
                    Total Items:
                  </GridItem>
                  <GridItem colSpan={4} textAlign="right">
                    {orderDetails.cartDetails.itemCount}
                  </GridItem>
                </Grid>
              </Box>
              
              <Box bg={cardBgColor} p={5} borderRadius="md">
                <Heading as="h3" size="sm" mb={3}>
                  Thank you for your purchase
                </Heading>
                <Text fontSize="sm" color={textColor}>
                  A confirmation email has been sent to your registered email address.
                  If you have any questions about your order, please contact our customer service.
                </Text>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default PaymentResponse;