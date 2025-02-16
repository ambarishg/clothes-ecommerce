import {
    Box,
    Heading,
    Text,
    Divider,
    VStack,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  const CancellationRefundPolicy = () => {
    const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');
    const textColor = useColorModeValue('gray.600', 'gray.400');
    const boxBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
  
    return (
      <Box
        bg={boxBg}
        borderWidth="1px"
        borderRadius="md"
        borderColor={borderColor}
        p={6}
        boxShadow="sm"
        mx="auto"
        maxW="container.md" // Responsive max width
      >
        <Heading
          as="h2"
          size="lg"
          mb={4}
          textAlign="center"
          color={headingColor}
        >
          Cancellation & Refund Policy
        </Heading>
        <Text fontSize="sm" color="gray.500" textAlign="center" mb={2}>
          Last updated on 16-02-2025 17:25:47
        </Text>
        <Divider mb={5} />
  
        <VStack spacing={4} align="start">
          <Text color={textColor}>
            MALA SARKAR believes in helping its customers as far as possible, and
            therefore has a liberal cancellation policy. Under this policy:
          </Text>
  
          <Box pl={4}>
            <Text fontWeight="medium" color={headingColor}>
              • Cancellations:
            </Text>
            <Text color={textColor} mt={2}>
              Cancellations will be considered only if the request is made
              immediately after placing the order. However, the cancellation
              request may not be entertained if the orders have been communicated
              to the vendors/merchants and they have initiated the process of
              shipping them.
            </Text>
          </Box>
  
          <Box pl={4}>
            <Text fontWeight="medium" color={headingColor}>
              • Perishable Items:
            </Text>
            <Text color={textColor} mt={2}>
              MALA SARKAR does not accept cancellation requests for perishable
              items like flowers, eatables etc. However, refund/replacement can
              be made if the customer establishes that the quality of product
              delivered is not good.
            </Text>
          </Box>
  
          <Box pl={4}>
            <Text fontWeight="medium" color={headingColor}>
              • Damaged or Defective Items:
            </Text>
            <Text color={textColor} mt={2}>
              In case of receipt of damaged or defective items please report the
              same to our Customer Service team. The request will, however, be
              entertained once the merchant has checked and determined the same at
              his own end. This should be reported within Only same day days of
              receipt of the products. In case you feel that the product received
              is not as shown on the site or as per your expectations, you must
              bring it to the notice of our customer service within Only same day
              days of receiving the product. The Customer Service Team after
              looking into your complaint will take an appropriate decision.
            </Text>
          </Box>
  
          <Box pl={4}>
            <Text fontWeight="medium" color={headingColor}>
              • Warranty & Refunds:
            </Text>
            <Text color={textColor} mt={2}>
              In case of complaints regarding products that come with a warranty
              from manufacturers, please refer the issue to them. In case of any
              Refunds approved by the MALA SARKAR, it’ll take 3-5 Days days for
              the refund to be processed to the end customer.
            </Text>
          </Box>
        </VStack>
      </Box>
    );
  };
  
  export default CancellationRefundPolicy;
  