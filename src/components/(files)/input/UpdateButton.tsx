"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { IconButton, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function UpdateButton() {
  const searchParams = useSearchParams();
  const paramString = searchParams.toString();

  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date(Date.now()).toLocaleTimeString());
  }, [paramString]);

  return (
    <StackM
      key={time}
      variants={yScaleVar}
      direction="row"
      spacing={1}
      alignItems="center"
    >
      <IconButton
        color="primary"
        onClick={() => setTime(new Date(Date.now()).toLocaleTimeString())}
      >
        <RefreshRoundedIcon fontSize="small" />
      </IconButton>
      <Typography variant="body2">* Last Updated: {time}</Typography>
    </StackM>
  );
}
