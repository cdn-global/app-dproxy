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
        fontFamily: '"Inter", sans-serif', // Modern, clean font
        lineHeight: "1.6",
        bg: "gray.100", // Slightly lighter gray for a cleaner look
        color: "gray.900",
        transition: "all 0.2s ease", // Smooth transitions
      },
    }),
  },
  colors: {
    ui: {
      main: "#F97316", // Vibrant orange as primary
      secondary: "#FB923C", // Softer orange for secondary elements
      success: "#10B981", // Bright green for success
      danger: "#EF4444", // Vivid red for errors
      light: "#FFFFFF", // White for backgrounds
      dark: "#111827", // Darker, sharper gray for dark mode
      darkSlate: "#1F2A44", // Deep slate for high contrast
      dim: "#6B7280", // Neutral gray for secondary text
    },
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"Fira Code", monospace', // Modern monospace for code
  },
  components: {
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === "dark" ? "gray.50" : "gray.900",
        fontWeight: "extrabold", // Bolder for modern look
        letterSpacing: "-0.02em",
      }),
    },
    Text: {
      baseStyle: (props) => ({
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        fontWeight: "medium",
      }),
    },
    Code: {
      baseStyle: (props) => ({
        bg: props.colorMode === "dark" ? "gray.800" : "gray.50",
        color: props.colorMode === "dark" ? "gray.50" : "gray.900",
        fontSize: "sm",
        p: 3,
        borderRadius: "lg", // Softer, modern radius
        boxShadow: props.colorMode === "dark" ? "inset 0 1px 2px rgba(0,0,0,0.2)" : "inset 0 1px 2px rgba(0,0,0,0.1)",
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: "semibold",
        borderRadius: "lg", // Larger radius for modern feel
        px: 6, // More padding for better click area
        py: 3,
        transition: "all 0.3s ease",
      },
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "ui.light",
          _hover: {
            backgroundColor: "#EA580C", // Darker, vibrant orange on hover
            transform: "translateY(-2px)", // Subtle lift effect
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
          _active: {
            transform: "translateY(0)",
          },
          _disabled: {
            backgroundColor: "ui.main",
            opacity: 0.4,
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "#DC2626",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
          _active: {
            transform: "translateY(0)",
          },
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
            fontWeight: "semibold",
            _selected: {
              color: "ui.main",
              fontWeight: "bold",
              borderBottomColor: "ui.main",
              borderBottomWidth: "3px", // Thicker for emphasis
            },
            _hover: {
              color: "ui.secondary",
              bg: "gray.50",
            },
          },
          tablist: {
            borderBottom: "1px solid",
            borderColor: "gray.200",
          },
        },
      },
    },
    Toast: {
      baseStyle: {
        container: {
          bg: "ui.light",
          color: "gray.900",
          borderRadius: "lg",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // Stronger shadow for depth
          padding: "16px",
          position: "absolute",
          top: "24px",
          transform: "translateX(-50%)",
          minWidth: "320px",
          maxWidth: "90%",
          fontWeight: "medium",
        },
      },
      variants: {
        error: {
          container: {
            bg: "red.50",
            color: "red.900",
            border: "1px solid",
            borderColor: "red.200",
          },
        },
        success: {
          container: {
            bg: "green.50",
            color: "green.900",
            border: "1px solid",
            borderColor: "green.200",
          },
        },
        info: {
          container: {
            bg: "orange.50",
            color: "orange.900",
            border: "1px solid",
            borderColor: "orange.200",
          },
        },
        warning: {
          container: {
            bg: "yellow.50",
            color: "yellow.900",
            border: "1px solid",
            borderColor: "yellow.200",
          },
        },
      },
    },
  },
});

export default theme;