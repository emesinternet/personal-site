import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Home from "../Home";
import WASaverPolicy from "../WASaverPolicy";
import Dither from "./Dither";

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

  const waveColor = useColorModeValue([0.9, 0.9, 0.9], [0.2, 0.2, 0.2]);

  return (
    <Box position="relative">
      <Box position="fixed" top={0} left={0} w="100%" h="100%" zIndex={-1}>
        <Dither
          waveColor={waveColor}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.2}
          colorNum={8}
          waveAmplitude={0.15}
          waveFrequency={2}
          waveSpeed={0.02}
        />
      </Box>
      {renderContent()}
    </Box>
  );
};

export default Layout;
