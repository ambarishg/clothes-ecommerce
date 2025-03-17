// src/components/Header.jsx

import { Box, Flex, Heading, Spacer, Button, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { HamburgerIcon } from '@chakra-ui/icons';
import MobileNav from './MobileNav'; // Import a new MobileNav component
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

const Header = ({ onCartOpen }) => {
  const { cart ,getItemCount } = useCart();
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
          <Menu>
            <MenuButton variant='ghost'>FAQ</MenuButton>
            <MenuList>
             
              <MenuItem><Link to="/contactus">Contact Us</Link></MenuItem>
              <MenuItem><Link to="/TermsAndConditions">Terms and Conditions</Link></MenuItem>
              <MenuItem><Link to="/CancellationRefundPolicy">Cancellation and Refund Policy</Link></MenuItem>
              
            </MenuList>  
          </Menu>
          
          <Button variant="ghost" onClick={onCartOpen}>
            Cart ({ getItemCount()})
          </Button>
        </Flex>
      </Flex>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isOpen} onClose={onClose} onCartOpen={onCartOpen} />
    </Box>
  );
};

export default Header;
