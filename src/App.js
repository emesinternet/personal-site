import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/inter";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import theme from "./theme";

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router>
          <Layout />
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
