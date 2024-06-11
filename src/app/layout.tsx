import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";

import ContextProvider from "@/context/ContextProvider";
import ThemeProvider from "@/theme/ThemeProvider";
import Frame from "./frame";

export const metadata: Metadata = {
  title: {
    template: "1ureka's space | %s",
    default: "page",
  },
  description:
    "A personal website for storing and managing a portfolio of 3D CG, with basic image editing capabilities.",
  icons: {
    icon: "/favicon.webp",
  },
};

const bodyStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  margin: 0,
  overflow: "hidden",
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
      <body style={bodyStyle}>
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
