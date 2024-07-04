"use client";

import { Skeleton, Stack } from "@mui/material";
import { IconButton, MenuItem, TextField } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

const containerSx = {
  borderRadius: 2,
  border: "solid 2px",
  borderColor: "divider",
  p: 2,
  gap: 2,
} as const;

export default function UploadField() {
  return (
    <StackM variants={yScaleVar} sx={containerSx}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField fullWidth size="small" label="Category" select>
          <MenuItem value="scene">Scene</MenuItem>
          <MenuItem value="props">Props</MenuItem>
        </TextField>

        <IconButton sx={{ mx: 1.5 }}>
          <CloseRoundedIcon fontSize="small" sx={{ color: "grey.500" }} />
        </IconButton>
      </Stack>

      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ height: "auto", aspectRatio: 16 / 9 }}
      />

      <Stack spacing={0.5}>
        <TextField variant="filled" fullWidth size="small" label="File name" />
        <TextField variant="filled" fullWidth size="small" label="Group" />
      </Stack>
    </StackM>
  );
}
