import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <Box as="header" bg="gray.100" py={4}>
      <Flex maxW="container.xl" mx="auto" px={4} alignItems="center">
        <Heading as="h1" size="lg">
          <Link to="/">Stylish Threads</Link>
        </Heading>
        <Spacer />
        <Flex as="nav" gap={4}>
          <Button as={Link} to="/" variant="ghost">
            Home
          </Button>
          <Button as={Link} to="/shop" variant="ghost">
            Shop
          </Button>
          <Button as={Link} to="/about" variant="ghost">
            About
          </Button>
          <Button as={Link} to="/contact" variant="ghost">
            Contact
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header

