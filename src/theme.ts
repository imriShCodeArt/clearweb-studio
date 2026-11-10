import { createTheme, type Direction } from "@mui/material/styles";

export const clearWebColors = {
  background: "#0B0C0D",
  surface: "#171719",
  surfaceElevated: "#222326",
  border: "#3B3C40",

  primary: "#F7CF00",
  primaryLight: "#FFE15C",
  primaryDark: "#C9A800",

  textPrimary: "#F5F5F5",
  textSecondary: "#BDBFC3",
  textMuted: "#85878D",

  glow: "rgba(247, 207, 0, 0.25)",
  borderSubtle: "rgba(255, 255, 255, 0.12)",
};

export function createAppTheme(direction: Direction) {
  return createTheme({
  direction,

  palette: {
    mode: "dark",

    primary: {
      main: clearWebColors.primary,
      light: clearWebColors.primaryLight,
      dark: clearWebColors.primaryDark,
      contrastText: "#0B0C0D",
    },

    secondary: {
      main: "#BDBFC3",
      light: "#F5F5F5",
      dark: "#85878D",
      contrastText: "#0B0C0D",
    },

    background: {
      default: clearWebColors.background,
      paper: clearWebColors.surface,
    },

    text: {
      primary: clearWebColors.textPrimary,
      secondary: clearWebColors.textSecondary,
      disabled: clearWebColors.textMuted,
    },

    divider: clearWebColors.borderSubtle,

    action: {
      hover: "rgba(255, 255, 255, 0.06)",
      selected: "rgba(247, 207, 0, 0.12)",
      focus: "rgba(247, 207, 0, 0.18)",
    },
  },

  typography: {
    fontFamily: 'var(--font-heebo), "Heebo", Arial, sans-serif',

    h1: {
      fontWeight: 800,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: clearWebColors.background,
          backgroundImage:
            "radial-gradient(ellipse at 75% 0%, #252012 0%, transparent 35%)",
          backgroundAttachment: "fixed",
        },
        "::selection": {
          backgroundColor: clearWebColors.primary,
          color: clearWebColors.background,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: "10px 24px",
          boxShadow: "none",
        },
        contained: {
          "&.MuiButton-colorPrimary": {
            "@media (hover: hover)": {
              "&:hover": {
                "--variant-containedBg": clearWebColors.primaryLight,
                boxShadow: "0 0 24px rgba(247, 207, 0, 0.18)",
              },
            },
          },
        },
        outlined: {
          borderColor: clearWebColors.border,
          "&:hover": {
            borderColor: clearWebColors.primary,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(145deg, #222326 0%, #141416 100%)",
          border: `1px solid ${clearWebColors.borderSubtle}`,
          borderRadius: 18,
          boxShadow: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#1C1D20",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: clearWebColors.border,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#74767B",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: clearWebColors.primary,
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: clearWebColors.borderSubtle,
        },
      },
    },
  },
  });
}

export const themes: Record<Direction, ReturnType<typeof createAppTheme>> = {
  ltr: createAppTheme("ltr"),
  rtl: createAppTheme("rtl"),
};
