import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box, CssBaseline } from "@mui/material";
import "@/app/index.css";

import ContextProvider from "@/context/ContextProvider";
import ThemeProvider from "@/theme/ThemeProvider";
import Docker from "@/components/(docker)";

export const metadata: Metadata = {
  title: {
    template: "1ureka's space | %s",
    default: "1ureka's space",
  },
  description:
    "A personal website for storing and managing a portfolio of 3D CG, with basic image editing capabilities.",
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        height: 1,
        bgcolor: "content.layer2",
      }}
    >
      <Docker />

      <Box
        component="main"
        sx={{
          position: "relative",
          height: 1,
          px: { xs: 6, sm: 9, md: 12, lg: 15, xl: 18 },
          py: { xs: 1, sm: 3, md: 5, lg: 7 },
          overflowY: "auto",
          scrollbarGutter: "stable",
        }}
      >
        <Box id="portal-root" sx={{ position: "absolute", inset: 0 }} />
        <Box sx={{ position: "relative", minHeight: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}

function MuiToaster() {
  return (
    <Toaster
      toastOptions={{
        className: "",
        style: {
          background: "var(--mui-palette-SnackbarContent-bg)",
          color: "var(--mui-palette-SnackbarContent-color)",
        },
      }}
    />
  );
}

export default function RootLayout({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <CssBaseline />

            <ContextProvider>
              <Layout>{children}</Layout>

              <MuiToaster />
            </ContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
