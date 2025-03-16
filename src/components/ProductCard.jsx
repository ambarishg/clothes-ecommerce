import { Box, Image, Text, Button, VStack } from "@chakra-ui/react";
import { useCart } from "../contexts/CartContext"; // Ensure this matches your context hook

const ProductCard = ({ id, name, price, image }) => {
  const { addToCart } = useCart(); // Use the correct hook

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <Box borderWidth={1} borderRadius="lg" overflow="hidden">
      <Image 
        src={image || "/placeholder.svg"} 
        alt={name} 
        height={200} 
        width="100%" 
        objectFit="cover" 
      />
      <VStack p={4} align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {name}
        </Text>
        <Text color="gray.600">₹{price.toFixed(2)}</Text>
        <Button colorScheme="blue" width="100%" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
