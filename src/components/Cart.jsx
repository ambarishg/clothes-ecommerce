import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useCart } from "../contexts/CartContext";

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    // Create an order on your server
    const response = await fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: total * 100 }), // Amount in paise
    });

    const orderData = await response.json();

    // Initialize Razorpay payment
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Dashboard
      amount: orderData.amount, // Amount in paise
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: orderData.id,
      handler: function (response) {
        alert("Payment successful!");
        // Optionally clear the cart here
        // clearCart();
        onClose(); // Close the cart drawer
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Cart</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="stretch">
            {cart.map((item) => (
              <HStack key={item.id} justify="space-between">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} boxSize="50px" objectFit="cover" />
                <VStack align="start" flex={1}>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text>${item.price.toFixed(2)}</Text>
                </VStack>
                <HStack>
                  <IconButton
                    icon={<MinusIcon />}
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    size="sm"
                  />
                  <Input
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 0)}
                    width="50px"
                    textAlign="center"
                  />
                  <IconButton icon={<AddIcon />} onClick={() => updateQuantity(item.id, item.quantity + 1)} size="sm" />
                </HStack>
                <Button onClick={() => removeFromCart(item.id)} colorScheme="red" size="sm">
                  Remove
                </Button>
              </HStack>
            ))}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <VStack width="100%" align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold">Total:</Text>
              <Text fontWeight="bold">${total.toFixed(2)}</Text>
            </HStack>
            <Button colorScheme="blue" width="100%" onClick={handleCheckout}>
              Checkout
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
