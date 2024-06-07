import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { theme } from "./theme";

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
}
