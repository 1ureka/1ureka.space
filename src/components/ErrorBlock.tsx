import { Link } from "next-view-transitions";
import { Button, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import { BoxM, StackM } from "@/components/Motion";
import { createMotionProps, createMotionVar } from "@/components/MotionProps";
import Block from "./Block";

const containerSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 675,
  gap: 3,
  px: 10,
};

export default function ErrorBlock({
  error,
  action,
}: {
  error: Error;
  action?: React.ReactNode;
}) {
  return (
    <BoxM {...createMotionProps()} sx={{ m: "auto" }}>
      <Block
        SlotProps={{ childContainer: { sx: containerSx } }}
        color="primary.main"
      >
        <BoxM variants={createMotionVar()}>
          <ErrorRoundedIcon fontSize="large" color="primary" />
        </BoxM>

        <StackM variants={createMotionVar()} gap={1} alignItems="center">
          <Typography variant="h6">Something went wrong...</Typography>
          <Typography variant="body2" className="text-ellipsis">
            {error.message}
          </Typography>
        </StackM>

        <StackM variants={createMotionVar()} gap={1} direction="row">
          {action}
          <Button component={Link} href="/">
            Home
          </Button>
        </StackM>
      </Block>
    </BoxM>
  );
}
