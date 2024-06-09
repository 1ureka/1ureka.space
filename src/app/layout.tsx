import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    absolute: "1ureka's space",
    template: "1ureka's space | %s",
    default: "page",
  },
  description:
    "A personal website for storing and managing a portfolio of 3D CG, with basic image editing capabilities.",
  icons: {
    icon: "/favicon.webp",
  },
};

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";
import "./globals.css";

import ContextProvider from "@/context/ContextProvider";
import ThemeProvider from "@/theme/ThemeProvider";

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
