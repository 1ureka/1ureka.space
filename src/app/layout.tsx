import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";

import ContextProvider from "@/context/ContextProvider";
import ThemeProvider from "@/theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import "./globals.css";

export const metadata: Metadata = {
  title: "1ureka's space",
  description: "WIP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <AppRouterCacheProvider>
            <ThemeProvider>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
