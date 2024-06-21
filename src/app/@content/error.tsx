"use client";

import { NextLinkComposed } from "@/components/Link";
import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { Button, Stack, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <BoxM
      {...layoutChildMotionProps}
      sx={{ height: 1, display: "grid", placeItems: "center" }}
    >
      <Stack spacing={3} alignItems={"center"}>
        <StackM variants={yScaleVar} spacing={1} alignItems={"center"}>
          <Typography variant="h6">Something went wrong...</Typography>
          <Typography variant="body2">{error.message}</Typography>
        </StackM>

        <StackM variants={yScaleVar} direction="row" spacing={1}>
          <Button onClick={() => reset()}>Try again</Button>
          <Button component={NextLinkComposed} to="/">
            Home
          </Button>
        </StackM>
      </Stack>
    </BoxM>
  );
}
