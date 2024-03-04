import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import Home from "./Home";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: "blackAlpha.700",
      },
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}

export default App;
