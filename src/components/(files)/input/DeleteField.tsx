"use client";

import type { ImageMetadata } from "@/data/type";
import Image from "next/image";

import { Box, Skeleton, Stack } from "@mui/material";
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

const imageContainerSx = {
  borderRadius: 2,
  position: "relative",
  aspectRatio: 16 / 9,
  overflow: "hidden",
} as const;

interface UploadFieldProps {
  onRemove: () => void;
  metadata: ImageMetadata;
}

export default function DeleteField({ onRemove, metadata }: UploadFieldProps) {
  return (
    <StackM variants={yScaleVar} sx={containerSx}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          fullWidth
          size="small"
          label="Category"
          select
          defaultValue={metadata.category}
          disabled
        >
          <MenuItem value="scene">Scene</MenuItem>
          <MenuItem value="props">Props</MenuItem>
        </TextField>

        <IconButton sx={{ mx: 1.5 }} onClick={onRemove}>
          <CloseRoundedIcon fontSize="small" sx={{ color: "grey.500" }} />
        </IconButton>
      </Stack>

      <Box sx={imageContainerSx}>
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ height: "auto", aspectRatio: 16 / 9 }}
        />
        <Image
          src={`/api/image/${metadata.id}/thumbnail`}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </Box>

      <Stack spacing={0.5}>
        <TextField
          variant="filled"
          fullWidth
          size="small"
          label="File name"
          defaultValue={metadata.name}
          disabled
        />
        <TextField
          variant="filled"
          fullWidth
          size="small"
          label="Group"
          defaultValue={metadata.group}
          disabled
        />
      </Stack>
    </StackM>
  );
}
