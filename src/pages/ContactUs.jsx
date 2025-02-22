import {
  Box,
  Text,
  VStack,
  Divider,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';


const ContactUs = () => {
  // Use colorModeValue to adapt colors to light/dark mode
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
      <Box
          p={{ base: 6, md: 8, lg: 10 }} // Responsive padding
          maxW={{ base: 'full', md: 'lg', lg: '2xl' }} // Responsive max width
          mx="auto"
          borderWidth={1}
          borderRadius="md"
          boxShadow="lg" // Softer shadow for a professional look
          bg={bg}
          borderColor={borderColor}
      >
          <Heading
              as="h2"
              size={{ base: 'lg', md: 'xl' }} // Responsive heading size
              textAlign="center"
              mb={4}
              color={headingColor}
          >
              Contact Us
          </Heading>
          <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500" textAlign="center">
              Last updated on 16-02-2025 17:00:03
          </Text>
          <Divider my={4} />

          <VStack align="start" spacing={5}>
              {/* Increased spacing for better readability */}
              <Box>
                  <Text fontSize="md" fontWeight="semibold" color={textColor}>
                      Merchant Legal Entity Name:
                  </Text>
                  <Text fontSize="md" color={textColor}>
                      MALA SARKAR
                  </Text>
              </Box>

              <Box>
                  <Text fontSize="md" fontWeight="semibold" color={textColor}>
                      Registered Address:
                  </Text>
                  <Text fontSize="md" color={textColor}>
                      D.GUPTA LANE, PO SINTHEE, KOLKATA, West Bengal, PIN: 700050
                  </Text>
              </Box>

              <Box>
                  <Text fontSize="md" fontWeight="semibold" color={textColor}>
                      Operational Address:
                  </Text>
                  <Text fontSize="md" color={textColor}>
                      D.GUPTA LANE, PO SINTHEE, KOLKATA, West Bengal, PIN: 700050
                  </Text>
              </Box>

              <Box>
                  <Text fontSize="md" fontWeight="semibold" color={textColor}>
                      Telephone No:
                  </Text>
                  <Text fontSize="md" color={textColor}>
                      8240793981
                  </Text>
              </Box>

              <Box>
                  <Text fontSize="md" fontWeight="semibold" color={textColor}>
                      E-Mail ID:
                  </Text>
                  <Text fontSize="md" color={textColor}>
                      mala.sarkar.dumdum@gmail.com
                  </Text>
              </Box>
          </VStack>

          <Divider my={4} />

          <Stack spacing={2} mt={4}>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" textAlign="center">
                  We look forward to hearing from you!
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" textAlign="center">
                  Current date: Sunday, February 16, 2025, 5:08 PM IST
              </Text>
          </Stack>
      </Box>
  );
};

export default ContactUs;
