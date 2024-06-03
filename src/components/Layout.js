import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import MainMenu from "./MainMenu";
import { useLocation } from "react-router-dom";
import Home from "../Home";
import WASaverPolicy from "../WASaverPolicy";

const Layout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");

  const renderContent = () => {
    switch (page) {
      case "privacy-policies":
        return <WASaverPolicy />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <VStack align="stretch">
      <MainMenu />
      <Box flex="1">{renderContent()}</Box>
    </VStack>
  );
};

export default Layout;
