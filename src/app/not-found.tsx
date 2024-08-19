import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "404",
};

import Link from "next/link";
import { Button, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionProps, createMotionVar } from "@/components/MotionProps";

export default function NotFound() {
  return (
    <StackM
      {...createMotionProps()}
      alignItems={"center"}
      sx={{ maxWidth: 675, m: "auto", gap: 3 }}
    >
      <BoxM variants={createMotionVar()}>
        <ErrorRoundedIcon fontSize="large" color="primary" />
      </BoxM>

      <StackM variants={createMotionVar()} spacing={1} alignItems={"center"}>
        <Typography variant="h6">Something went wrong...</Typography>
        <Typography variant="body2" className="text-ellipsis">
          404: The requested resource could not be found.
        </Typography>
      </StackM>

      <BoxM variants={createMotionVar()}>
        <Button component={Link} href="/">
          Home
        </Button>
      </BoxM>
    </StackM>
  );
}
