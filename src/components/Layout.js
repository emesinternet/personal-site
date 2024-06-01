import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import MainMenu from "./MainMenu";

const Layout = ({ children }) => {
  return (
    <VStack align="stretch">
      <MainMenu />
      <Box flex="1">{children}</Box>
    </VStack>
  );
};

export default Layout;
