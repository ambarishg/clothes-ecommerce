import React, { useState } from "react";
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
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useCart } from "../contexts/CartContext";
import { load } from "@cashfreepayments/cashfree-js";

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
 
  
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please provide email and phone number",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('https://paymentwb.azurewebsites.net/api/create_cashfree_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_amount: total,
          customer_email: email,
          customer_phone: phone
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const data = await response.json();
      sessionStorage.setItem("order_id",data.order_id);
      let checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      };
      cashfree.checkout(checkoutOptions);

    } catch (error) {
      toast({
        title: "Payment Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
                <Image 
                  src={item.image || "/placeholder.svg"} 
                  alt={item.name} 
                  boxSize="50px" 
                  objectFit="cover" 
                />
                <VStack align="start" flex={1}>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text>₹{item.price.toFixed(2)}</Text>
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
                  <IconButton 
                    icon={<AddIcon />} 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                    size="sm" 
                  />
                </HStack>
                <Button 
                  onClick={() => removeFromCart(item.id)} 
                  colorScheme="red" 
                  size="sm"
                >
                  Remove
                </Button>
              </HStack>
            ))}

            {/* Customer Information Form */}
            <VStack spacing={3} mt={4}>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </FormControl>
            </VStack>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <VStack width="100%" align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold">Total:</Text>
              <Text fontWeight="bold">₹{total.toFixed(2)}</Text>
            </HStack>
            <Button 
              colorScheme="blue" 
              width="100%" 
              onClick={handleCheckout}
              isDisabled={!email || !phone}
            >
              Proceed to Payment
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
