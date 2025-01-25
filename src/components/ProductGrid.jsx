import { SimpleGrid } from "@chakra-ui/react"
import ProductCard from "./ProductCard"

const ProductGrid = ({ products }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </SimpleGrid>
  )
}

export default ProductGrid

