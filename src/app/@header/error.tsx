"use client";

import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { IconButton, Typography } from "@mui/material";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

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
      sx={{ display: "grid", placeItems: "center", p: 1 }}
    >
      <StackM
        variants={yScaleVar}
        spacing={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ maxWidth: 0.5 }}
      >
        <Typography variant="body2" className="text-ellipsis">
          {error.message}
        </Typography>
        <IconButton onClick={() => reset()}>
          <ReplayRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </StackM>
    </BoxM>
  );
}
