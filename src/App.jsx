// src/App.jsx
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";

import { CartProvider } from "./contexts/CartContext";
import theme from "./theme";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Router>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <Header onCartOpen={handleCartOpen} />
            <Box flex="1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<Shop />} />
              </Routes>
            </Box>
            <Footer />
            {/* Ensure Cart is rendered here */}
            <Cart isOpen={isCartOpen} onClose={handleCartClose} />
          </Box>
        </Router>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
