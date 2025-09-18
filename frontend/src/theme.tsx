import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      "html, body": {
        fontFamily: '"Poppins", sans-serif',
        lineHeight: "1.5",
        bg: "gray.50",
        color: "gray.900",
        transition: "all 0.3s ease-in-out",
      },
    }),
  },
  colors: {
    ui: {
      main: "#C2410C", // Darker, richer orange for primary
      secondary: "#EA580C", // Slightly lighter but still bold for secondary
      success: "#00CC88",
      danger: "#FF2D2D",
      light: "#F8FAFC",
      dark: "#0F172A",
      darkSlate: "#1E293B",
      dim: "#64748B",
    },
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Poppins", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  components: {
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === "dark" ? "gray.50" : "ui.dark",
        fontWeight: "black",
        letterSpacing: "-0.03em",
      }),
      sizes: {
        xl: { fontSize: "4xl", lineHeight: "1.2" },
        lg: { fontSize: "3xl", lineHeight: "1.3" },
      },
    },
    Text: {
      baseStyle: (props) => ({
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        fontWeight: "medium",
        letterSpacing: "-0.01em",
      }),
    },
    Code: {
      baseStyle: (props) => ({
        bg: props.colorMode === "dark" ? "ui.darkSlate" : "ui.light",
        color: props.colorMode === "dark" ? "gray.50" : "ui.dark",
        fontSize: "sm",
        p: 4,
        borderRadius: "xl",
        boxShadow: props.colorMode === "dark" ? "0 4px 10px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid",
        borderColor: props.colorMode === "dark" ? "ui.secondary" : "ui.main",
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "0", // Square, rigid corners
        px: 6, // Reduced padding for a tighter, rigid feel
        py: 3,
        transition: "all 0.2s ease-in-out",
        _focus: { boxShadow: "0 0 0 3px rgba(194, 65, 12, 0.4)" }, // Darker orange focus ring
        background: "ui.main !important", // Force background visibility
      },
      variants: {
        primary: {
          background: "ui.main !important", // Explicit background to prevent overrides
          color: "ui.light",
          _hover: {
            background: "#A3340A !important", // Darker orange on hover
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(194, 65, 12, 0.4)",
          },
          _active: { transform: "translateY(0)" },
          _disabled: {
            background: "ui.main !important",
            opacity: 0.3,
          },
        },
        danger: {
          background: "ui.danger !important",
          color: "ui.light",
          _hover: {
            background: "#E51A1A !important",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(255, 45, 45, 0.3)",
          },
          _active: { transform: "translateY(0)" },
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
    Tabs: {
      variants: {
        subtle: {
          tab: {
            color: "ui.dim",
            fontWeight: "bold",
            fontSize: "lg",
            py: 3,
            _selected: {
              color: "ui.main",
              fontWeight: "black",
              borderBottomColor: "ui.main",
              borderBottomWidth: "4px",
              bg: "ui.light",
              boxShadow: "0 2px 8px rgba(255, 98, 0, 0.2)",
            },
            _hover: {
              color: "ui.secondary",
              bg: "gray.100",
              borderRadius: "md",
            },
          },
          tablist: {
            borderBottom: "2px solid",
            borderColor: "gray.100",
          },
        },
      },
    },
    Toast: {
      baseStyle: {
        container: {
          bg: "ui.light",
          color: "ui.dark",
          borderRadius: "xl",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          padding: "20px",
          position: "absolute",
          top: "30px",
          transform: "translateX(-50%)",
          minWidth: "340px",
          maxWidth: "95%",
          fontWeight: "semibold",
          border: "1px solid",
          borderColor: "ui.main",
        },
      },
      variants: {
        error: {
          container: {
            bg: "red.50",
            color: "red.900",
            borderColor: "ui.danger",
          },
        },
        success: {
          container: {
            bg: "green.50",
            color: "green.900",
            borderColor: "ui.success",
          },
        },
        info: {
          container: {
            bg: "orange.50",
            color: "orange.900",
            borderColor: "ui.main",
          },
        },
        warning: {
          container: {
            bg: "yellow.50",
            color: "yellow.900",
            borderColor: "yellow.400",
          },
        },
      },
    },
  },
});

export default theme;