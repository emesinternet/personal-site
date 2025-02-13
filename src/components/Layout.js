import React from "react";
import { Box } from "@chakra-ui/react";
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
      default:
        return <Home />;
    }
  };

  return <Box>{renderContent()}</Box>;
};

export default Layout;
