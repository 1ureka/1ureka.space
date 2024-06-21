import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";
import "@/app/index.css";

import ContextProvider from "@/context/ContextProvider";
import ThemeProvider from "@/theme/ThemeProvider";
import Frame from "./frame";

export const metadata: Metadata = {
  title: {
    template: "1ureka's space | %s",
    default: "1ureka's space",
  },
  description:
    "A personal website for storing and managing a portfolio of 3D CG, with basic image editing capabilities.",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <AppRouterCacheProvider>
            <ThemeProvider>
              <CssBaseline />
              <Frame header={header} content={content} />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
