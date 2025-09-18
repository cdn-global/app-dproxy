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
        fontFamily: '"Poppins", sans-serif', // Bold, modern font
        lineHeight: "1.5",
        bg: "gray.50", // Clean, light background for contrast
        color: "gray.900",
        transition: "all 0.3s ease-in-out", // Smoother, more noticeable transitions
      },
    }),
  },
  colors: {
    ui: {
      main: "#FF6200", // Vivid, bold orange for primary accents
      secondary: "#FF8F00", // Warm amber for secondary elements
      success: "#00CC88", // Bright teal-green for success states
      danger: "#FF2D2D", // Intense red for errors
      light: "#F8FAFC", // Off-white for crisp backgrounds
      dark: "#0F172A", // Deep slate for dark mode
      darkSlate: "#1E293B", // Richer slate for contrast
      dim: "#64748B", // Cool gray for secondary text
    },
  },
  fonts: {
    heading: '"Poppins", sans-serif', // Bold, geometric font for headings
    body: '"Poppins", sans-serif',
    mono: '"JetBrains Mono", monospace', // Sleek, modern monospace for code
  },
  components: {
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === "dark" ? "gray.50" : "ui.dark",
        fontWeight: "black", // Ultra-bold for impact
        letterSpacing: "-0.03em", // Tightened for modern feel
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
        borderRadius: "xl", // More rounded for a modern edge
        boxShadow: props.colorMode === "dark" ? "0 4px 10px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid",
        borderColor: props.colorMode === "dark" ? "ui.secondary" : "ui.main",
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "xl", // Larger, modern radius
        px: 8, // Generous padding for prominence
        py: 4,
        transition: "all 0.2s ease-in-out",
        _focus: { boxShadow: "0 0 0 3px rgba(255, 98, 0, 0.4)" }, // Orange focus ring
      },
      variants: {
        primary: {
          background: "linear-gradient(135deg, ui.main, ui.secondary)", // Gradient for vibrancy
          color: "ui.light",
          _hover: {
            background: "linear-gradient(135deg, #E55B00, #E57800)", // Darker gradient on hover
            transform: "translateY(-3px)", // Pronounced lift effect
            boxShadow: "0 6px 16px rgba(255, 98, 0, 0.3)",
          },
          _active: { transform: "translateY(0)" },
          _disabled: {
            background: "ui.main",
            opacity: 0.3,
          },
        },
        danger: {
          background: "ui.danger",
          color: "ui.light",
          _hover: {
            background: "#E51A1A",
            transform: "translateY(-3px)",
            boxShadow: "0 6px 16px rgba(255, 45, 45, 0.3)",
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
            fontSize: "lg", // Larger for emphasis
            py: 3,
            _selected: {
              color: "ui.main",
              fontWeight: "black",
              borderBottomColor: "ui.main",
              borderBottomWidth: "4px", // Thicker, bolder underline
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
          borderRadius: "xl", // Softer, modern corners
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // Dramatic shadow for depth
          padding: "20px",
          position: "absolute",
          top: "30px",
          transform: "translateX(-50%)",
          minWidth: "340px",
          maxWidth: "95%",
          fontWeight: "semibold",
          border: "1px solid",
          borderColor: "ui.main", // Orange accent border
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