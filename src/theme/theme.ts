"use client";
import { Comfortaa } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import type { TypographyOptions } from "@mui/material/styles/createTypography";
import type {} from "@mui/material/themeCssVarsAugmentation";

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
    lineHeight: 1.25,
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

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data" },
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
        },
        content: {
          layer1: "#ffffff", // top
          layer2: "#e0e0e0",
          layer3: "#bdbdbd",
          backdrop: "#ffffff60",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#e783ad",
        },
        secondary: {
          main: "#83e7bd",
        },
        content: {
          layer1: "#1F1F1F",
          layer2: "#1A1A1A",
          layer3: "#1A1A1A",
          backdrop: "#00000099",
        },
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface PaletteOptions {
    content: {
      layer1: string;
      layer2: string;
      layer3: string;
      backdrop: string;
    };
  }
  interface Palette {
    content: {
      layer1: string;
      layer2: string;
      layer3: string;
      backdrop: string;
    };
  }
}
