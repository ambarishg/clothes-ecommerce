import { Box, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={4} mt={8}>
      <Text textAlign="center" color="gray.600">
        &copy; 2023 Stylish Threads. All rights reserved.
      </Text>
    </Box>
  )
}

export default Footer

