import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "unarthurized",
};

import Link from "next/link";
import { Button, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionProps, yScaleVar } from "@/components/MotionProps";

export default function UnAuth() {
  return (
    <StackM
      {...createMotionProps()}
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
        <Button component={Link} href="/">
          Home
        </Button>
      </BoxM>
    </StackM>
  );
}
