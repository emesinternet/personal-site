import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import WASaverPolicy from "./WASaverPolicy";
import Layout from "./components/Layout";

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
  localStorage.setItem("chakra-ui-color-mode", "dark");
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/privacy-policies"
            element={
              <Layout>
                <WASaverPolicy />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
