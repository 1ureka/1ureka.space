import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "unarthurized",
};

import { NextLinkComposed } from "@/components/Link";
import { BoxM, StackM } from "@/components/Motion";
import { createStaggerVar, yScaleVar } from "@/components/MotionProps";
import { Button, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

export default function UnAuth() {
  return (
    <StackM
      {...createStaggerVar()}
      spacing={3}
      alignItems={"center"}
      sx={{ maxWidth: 675, m: "auto", p: 10 }}
    >
      <BoxM variants={yScaleVar}>
        <ErrorRoundedIcon fontSize="large" color="primary" />
      </BoxM>

      <StackM variants={yScaleVar} spacing={1} alignItems={"center"}>
        <Typography variant="h6">Unauthorized access</Typography>
        <Typography variant="body2" className="text-ellipsis">
          401: You are not authorized to access this page.
        </Typography>
      </StackM>

      <BoxM variants={yScaleVar}>
        <Button component={NextLinkComposed} to="/">
          Home
        </Button>
      </BoxM>
    </StackM>
  );
}
