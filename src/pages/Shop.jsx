import { useState } from "react"
import { Box, Container,  SimpleGrid, Select, Input, VStack, HStack, Text } from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"

// This would typically come from an API or database
const allProducts = [
  { id: "1", name: "Classic T-Shirt", price: 19.99, image: "/SHIRT.jpg?height=200&width=200" },
  { id: "2", name: "Classic Red T-Shirt", price: 49.99, image: "/REDSHIRT.jpg?height=200&width=200" },
  { id: "3", name: "Classic Yellow T-Shirt", price: 39.99, image: "/YELLOWSHIRT.jpg?height=200&width=200" },
  { id: "4", name: "Classic Purple T-Shirt", price: 59.99, image: "/PURPLESHIRT.jpg?height=200&width=200" },
  { id: "5", name: "Classic Red Blue T-Shirt", price: 129.99, image: "/RED-BLUE.jpg?height=200&width=200" },
  { id: "6", name: "Classic Deep Red T-Shirt", price: 79.99, image: "/COLORRED.jpg?height=200&width=200" },
  { id: "7", name: "Classic Green Shirt", price: 44.99, image: "/GREEN.jpg?height=200&width=200" },
  { id: "8", name: "Polka Dot", price: 34.99, image: "/POLKA.jpg?height=200&width=200" },
]

const Shop = () => {
  const [products, setProducts] = useState(allProducts)
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (e) => {
    const value = e.target.value
    setSortBy(value)
    const sortedProducts = [...products].sort((a, b) => {
      if (value === "price") {
        return a.price - b.price
      } else {
        return a.name.localeCompare(b.name)
      }
    })
    setProducts(sortedProducts)
  }

  const handleFilter = (e) => {
    const value = e.target.value
    setFilterCategory(value)
    const filteredProducts = value ? allProducts.filter((product) => product.category === value) : allProducts
    setProducts(filteredProducts)
  }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearchTerm(value)
    const searchedProducts = allProducts.filter(
      (product) => product.name.toLowerCase().includes(value)
    )
    setProducts(searchedProducts)
  }

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">

          <HStack spacing={4}>
            <Select placeholder="Sort by" value={sortBy} onChange={handleSort}>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </Select>
            
            <Input placeholder="Search products" value={searchTerm} onChange={handleSearch} />
          </HStack>
          {products.length === 0 ? (
            <Text>No products found.</Text>
          ) : (
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Shop

