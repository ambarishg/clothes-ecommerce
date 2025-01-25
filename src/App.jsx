import { ChakraProvider, Box } from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import Shop from "./pages/Shop"
import theme from "./theme"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <Header />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App

