import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "404",
};

import { NextLinkComposed } from "@/components/Link";
import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { Button, Stack, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

export default function NotFound() {
  return (
    <BoxM
      {...layoutChildMotionProps}
      sx={{ height: 1, display: "grid", placeItems: "center" }}
    >
      <Stack spacing={3} alignItems={"center"} sx={{ maxWidth: 0.6 }}>
        <BoxM variants={yScaleVar}>
          <ErrorRoundedIcon fontSize="large" color="primary" />
        </BoxM>

        <StackM variants={yScaleVar} spacing={1} alignItems={"center"}>
          <Typography variant="h6">Something went wrong...</Typography>
          <Typography variant="body2" className="text-ellipsis">
            404: The requested resource could not be found.
          </Typography>
        </StackM>

        <BoxM variants={yScaleVar}>
          <Button component={NextLinkComposed} to="/">
            Home
          </Button>
        </BoxM>
      </Stack>
    </BoxM>
  );
}
