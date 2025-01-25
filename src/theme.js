import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: "#e6f6ff",
      100: "#b3e0ff",
      200: "#80cbff",
      300: "#4db5ff",
      400: "#1a9fff",
      500: "#0080ff",
      600: "#0066cc",
      700: "#004d99",
      800: "#003366",
      900: "#001a33",
    },
  },
})

export default theme

