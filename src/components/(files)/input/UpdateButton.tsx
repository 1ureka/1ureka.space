"use client";

import { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function UpdateButton({
  category,
}: {
  category: "scene" | "props";
}) {
  const [time, setTime] = useState<string | null>(null);

  const handleUpdate = () => {
    setTime(new Date(Date.now()).toLocaleTimeString());
  };

  useEffect(() => {
    handleUpdate();
  }, [category]);

  return (
    <StackM
      key={time}
      variants={yScaleVar}
      direction="row"
      spacing={1}
      alignItems="center"
    >
      <IconButton color="primary" onClick={handleUpdate}>
        <RefreshRoundedIcon fontSize="small" />
      </IconButton>
      <Typography variant="body2">* Last Update: {time}</Typography>
    </StackM>
  );
}
