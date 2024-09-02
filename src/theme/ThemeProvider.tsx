import { ThemeProvider as TP } from "@mui/material/styles";
import { theme } from "./theme";

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TP theme={theme}>{children}</TP>;
}
