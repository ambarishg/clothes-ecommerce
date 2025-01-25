// src/components/MobileNav.jsx

import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const MobileNav = ({ isOpen, onClose, onCartOpen }) => {
  const { cart } = useCart();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Navigation</DrawerHeader>
        <DrawerBody>
          <Box display="flex" flexDirection="column" gap={4}>
            <Button as={Link} to="/" variant="ghost" onClick={onClose}>
              Home
            </Button>
            <Button as={Link} to="/shop" variant="ghost" onClick={onClose}>
              Shop
            </Button>
            <Button as={Link} to="/about" variant="ghost" onClick={onClose}>
              About
            </Button>
            <Button as={Link} to="/contact" variant="ghost" onClick={onClose}>
              Contact
            </Button>
            <Button variant="ghost" onClick={() => { onCartOpen(); onClose(); }}>
              Cart ({cart.length})
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
