import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#0A0A0A" : "white",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        backgroundImage:
          props.colorMode === "dark"
            ? `radial-gradient(circle at 100% 100%, rgba(228, 58, 25, 0.05) 0%, transparent 50%), 
             radial-gradient(circle at 0% 0%, rgba(228, 58, 25, 0.03) 0%, transparent 50%)`
            : `radial-gradient(circle at 100% 100%, rgba(228, 58, 25, 0.08) 0%, transparent 50%), 
             radial-gradient(circle at 0% 0%, rgba(228, 58, 25, 0.05) 0%, transparent 50%)`,
        backgroundAttachment: "fixed",
      },
    }),
  },
  colors: {
    accent: {
      50: "#ffe2dc",
      100: "#ffb3a3",
      200: "#ff8469",
      300: "#ff552f",
      400: "#e43a19",
      500: "#cc2600",
      600: "#991d00",
      700: "#661300",
      800: "#330a00",
      900: "#1a0500",
    },
  },
  components: {
    Container: {
      baseStyle: {
        px: { base: 6, md: 8 },
      },
    },
    Text: {
      baseStyle: (props) => ({
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
      }),
    },
    Link: {
      baseStyle: {
        color: "accent.400",
        _hover: {
          color: "accent.300",
        },
      },
    },
    IconButton: {
      baseStyle: {
        padding: 3,
      },
    },
  },
});

export default theme;
