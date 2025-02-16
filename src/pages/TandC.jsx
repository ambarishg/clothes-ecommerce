import {
    Box,
    Text,
    VStack,
    Divider,
    Heading,
    Stack,
    Container,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  const TermsAndConditions = () => {
    const bgColor = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'gray.300');
    const headingColor = useColorModeValue('gray.900', 'whiteAlpha.900');
    const dividerColor = useColorModeValue('gray.200', 'whiteAlpha.300');
    const lastUpdatedColor = useColorModeValue('gray.500', 'gray.400');
    const boxBorderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  
    return (
      <Container maxW="container.md" py={10}>
        <Box
          p={8}
          borderWidth={1}
          borderRadius="xl"
          boxShadow="xl"
          bg={bgColor}
          borderColor={boxBorderColor}
        >
          <Heading
            as="h2"
            size="2xl"
            textAlign="center"
            mb={6}
            color={headingColor}
          >
            Terms & Conditions
          </Heading>
          <Text
            fontSize="sm"
            color={lastUpdatedColor}
            textAlign="center"
            mb={4}
          >
            Last updated on 16-02-2025 17:10:50
          </Text>
          <Divider my={6} borderColor={dividerColor} />
  
          <VStack align="start" spacing={6}>
            <Text fontSize="md" color={textColor} lineHeight="1.7">
              These Terms and Conditions, along with our privacy policy or other
              terms (“Terms”), constitute a binding agreement between MALA SARKAR
              (“Website Owner” or “we” or “us” or “our”) and you (“you” or
              “your”). They govern your use of our website, goods (as applicable),
              or services (as applicable) (collectively, “Services”).
            </Text>
  
            <Text fontSize="md" color={textColor} lineHeight="1.7">
              By using our website and availing the Services, you acknowledge
              that you have read, understood, and agreed to these Terms
              (including the Privacy Policy). We reserve the right to modify these
              Terms at any time without prior notice. Your continued use of the
              website constitutes your acceptance of the revised Terms.
            </Text>
  
            <Text fontSize="md" color={textColor} lineHeight="1.7">
              The use of this website or availing of our Services is subject to
              the following terms of use:
            </Text>
  
            <VStack align="start" spacing={3} pl={5} width="100%">
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                1. To access and use the Services, you agree to provide true,
                accurate, and complete information during and after registration.
                You are responsible for all activities conducted through your
                registered account.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                2. Neither we nor any third parties warrant or guarantee the
                accuracy, timeliness, performance, completeness, or suitability of
                the information and materials offered on this website or through
                the Services for any specific purpose.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                3. Your use of our Services and the website is at your sole risk
                and discretion. You are responsible for independently assessing
                and ensuring that the Services meet your requirements.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                4. The contents of the Website and the Services are proprietary to
                Us, and you shall not claim any intellectual property rights,
                title, or interest in its contents.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                5. Unauthorized use of the Website or the Services may result in
                legal action against you as per these Terms or applicable laws.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                6. You agree to pay the charges associated with availing the
                Services.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                7. You agree not to use the website and/or Services for any
                purpose that is unlawful, illegal, or forbidden by these Terms, or
                Indian or local laws that might apply to you.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                8. The website and Services may contain links to third-party
                websites. Accessing these links subjects you to the terms of use,
                privacy policy, and other policies of those websites.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                9. Initiating a transaction for availing the Services constitutes a
                legally binding and enforceable contract with us for the Services.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                10. You may claim a refund if we are unable to provide the
                Service. Refund timelines will align with the specific Service or
                our policies.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                11. Neither party shall be liable for failure to perform obligations
                if performance is prevented or delayed by a force majeure event.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                12. These Terms and any related disputes shall be governed by and
                construed in accordance with the laws of India.
              </Text>
  
              <Text fontSize="md" color={textColor} lineHeight="1.7">
                13. All disputes shall be subject to the exclusive jurisdiction of
                the courts in KOLKATA, West Bengal.
              </Text>
            </VStack>
  
            <Text fontSize="md" color={textColor} lineHeight="1.7">
              For any concerns or communications regarding these Terms, please
              contact us using the information provided on this website.
            </Text>
          </VStack>
  
          <Divider my={6} borderColor={dividerColor} />
  
          <Stack spacing={2} mt={4}>
            <Text fontSize="sm" color={lastUpdatedColor} textAlign="center">
              Current date: Sunday, February 16, 2025, 5:14 PM IST
            </Text>
          </Stack>
        </Box>
      </Container>
    );
  };
  
  export default TermsAndConditions;
  