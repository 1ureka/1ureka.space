"use client";
import { Comfortaa } from "next/font/google";
import { Palette } from "@mui/material/styles";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const comfortaa = Comfortaa({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const typography: (palette: Palette) => TypographyOptions = (palette) => ({
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
  subTitle1: {
    fontWeight: 500,
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  subTitle2: {
    fontWeight: 500,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    color: palette.text.secondary,
  },
  body1: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  body2: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
    color: palette.text.secondary,
  },
  caption: {
    fontSize: "0.65rem",
    lineHeight: 1.66,
    color: palette.text.secondary,
  },
  button: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  // overline : {}
});

export const theme = extendTheme({
  typography,
});
