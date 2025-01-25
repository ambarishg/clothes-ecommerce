import { Box, Heading, Container } from "@chakra-ui/react"
import ProductGrid from "../components/ProductGrid"

const products = [
  { id: "1", name: "Classic T-Shirt", price: 19.99, image: "/SHIRT.jpg?height=200&width=200" },
  { id: "2", name: "Classic Red T-Shirt", price: 49.99, image: "/REDSHIRT.jpg?height=200&width=200" },
  { id: "3", name: "Classic Yellow T-Shirt", price: 39.99, image: "/YELLOWSHIRT.jpg?height=200&width=200" },
  { id: "4", name: "Classic Purple T-Shirt", price: 59.99, image: "/PURPLESHIRT.jpg?height=200&width=200" },
  { id: "5", name: "Classic Red Blue T-Shirt", price: 129.99, image: "/RED-BLUE.jpg?height=200&width=200" },
  { id: "6", name: "Classic Deep Red T-Shirt", price: 79.99, image: "/COLORRED.jpg?height=200&width=200" },
  { id: "7", name: "Classic Green Shirt", price: 44.99, image: "/GREEN.jpg?height=200&width=200" },
  { id: "8", name: "Polka Dot", price: 34.99, image: "/POLKA.jpg?height=200&width=200" },
]

const HomePage = () => {
  return (
    <Box py={{ base: 4, md: 8 }}>
      <Container maxW="container.xl">
        <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={6}>
          Featured Products
        </Heading>
        <ProductGrid products={products} />
      </Container>
    </Box>
  )
}

export default HomePage
