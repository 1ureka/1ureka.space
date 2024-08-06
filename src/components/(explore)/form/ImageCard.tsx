"use client";

import type { ImageMetadata } from "@/data/type";
import Image from "next/image";

import { Box, Button, Skeleton, Stack } from "@mui/material";
import { TextField } from "@mui/material";

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

export default function ImageCard({
  metadata,
  onClick,
}: {
  metadata: ImageMetadata;
  onClick: (id: string) => void;
}) {
  return (
    <StackM variants={yScaleVar} sx={containerSx}>
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
        <Button
          fullWidth
          variant="contained"
          onClick={() => onClick(metadata.id)}
        >
          Select
        </Button>
      </Stack>
    </StackM>
  );
}
