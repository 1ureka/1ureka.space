"use client";
import { Comfortaa } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const comfortaa = Comfortaa({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const typography: TypographyOptions = {
  fontFamily: comfortaa.style.fontFamily,
  // h1: {},
  // h2: {},
  // h3: {},
  h4: {
    fontWeight: 400,
    fontSize: "1.5rem",
    lineHeight: 1.334,
  },
  h5: {
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: 1.6,
  },
  h6: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    color: "var(--mui-palette-text-secondary)",
  },
  body1: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  body2: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
    color: "var(--mui-palette-text-secondary)",
  },
  caption: {
    fontSize: "0.65rem",
    lineHeight: 1.66,
    color: "var(--mui-palette-text-secondary)",
  },
  button: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  // overline : {}
};

export const theme = extendTheme({
  typography,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#e783ad",
          contrastText: "#fff",
        },
        secondary: {
          main: "#83e7bd",
          contrastText: "#fff",
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: "#e783ad",
        },
        secondary: {
          main: "#83e7bd",
        },
      }
    }
  }
});
