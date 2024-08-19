"use client";

import ThemeProvider from "@/theme/ThemeProvider";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionProps, createMotionVar } from "@/components/MotionProps";

import Link from "next/link";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box, CssBaseline } from "@mui/material";
import { Button, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

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
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                minHeight: "100vh",
                bgcolor: "content.layer2",
              }}
            >
              <Content error={error} reset={reset} />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

function Content({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <StackM
      {...createMotionProps()}
      spacing={3}
      alignItems={"center"}
      sx={{ maxWidth: 675 }}
    >
      <BoxM variants={createMotionVar()}>
        <ErrorRoundedIcon fontSize="large" color="primary" />
      </BoxM>

      <StackM variants={createMotionVar()} spacing={1} alignItems={"center"}>
        <Typography variant="h6">Something went wrong...</Typography>
        <Typography variant="body2" className="text-ellipsis">
          {error.message}
        </Typography>
      </StackM>

      <StackM variants={createMotionVar()} direction="row" spacing={1}>
        <Button onClick={() => reset()}>Try again</Button>
        <Button component={Link} href="/">
          Home
        </Button>
      </StackM>
    </StackM>
  );
}
