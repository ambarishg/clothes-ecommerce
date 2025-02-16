// src/components/Header.jsx

import { Box, Flex, Heading, Spacer, Button, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { HamburgerIcon } from '@chakra-ui/icons';
import MobileNav from './MobileNav'; // Import a new MobileNav component

const Header = ({ onCartOpen }) => {
  const { cart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header" bg="gray.100" py={4}>
      <Flex maxW="container.xl" mx="auto" px={4} alignItems="center">
        <Heading as="h1" size="lg">
          <Link to="/">Stylish Threads</Link>
        </Heading>
        <Spacer />
        {/* Hamburger Icon for mobile */}
        <Box display={{ base: "block", md: "none" }} onClick={onOpen}>
          <HamburgerIcon boxSize={6} />
        </Box>
        {/* Desktop Navigation */}
        <Flex as="nav" gap={4} display={{ base: "none", md: "flex" }}>
          <Button as={Link} to="/" variant="ghost">
            Home
          </Button>
          <Button as={Link} to="/shop" variant="ghost">
            Shop
          </Button>
          <Button as={Link} to="/contactus" variant="ghost">
            Contact Us
          </Button>
          
          <Button variant="ghost" onClick={onCartOpen}>
            Cart ({cart.length})
          </Button>
        </Flex>
      </Flex>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isOpen} onClose={onClose} onCartOpen={onCartOpen} />
    </Box>
  );
};

export default Header;
