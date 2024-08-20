"use client";

import ThemeProvider from "@/theme/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box, Button, CssBaseline } from "@mui/material";
import ErrorBlock from "@/components/ErrorBlock";

const containerSx = {
  display: "grid",
  placeItems: "center",
  minHeight: "100dvh",
  bgcolor: "content.layer2",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <CssBaseline />
            <Box sx={containerSx}>
              <ErrorBlock
                error={error}
                action={<Button onClick={reset}>Try again</Button>}
              />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
