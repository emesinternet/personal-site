import React from "react";
import { Box } from "@chakra-ui/react";
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

  return (
    <Box position="relative">
      <Box position="fixed" top={0} left={0} w="100%" h="100%" zIndex={-1}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </Box>
      {renderContent()}
    </Box>
  );
};

export default Layout;
