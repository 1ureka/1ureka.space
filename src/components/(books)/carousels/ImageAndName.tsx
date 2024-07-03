"use client";

import { Box, Typography } from "@mui/material";
import { Alert, Origin, Thumbnail } from "..";

import type { ImageMetadataWithIndex } from "@/data/type";
import { BoxM } from "@/components/Motion";
import { carouselsImageVar } from "@/components/MotionProps";

const containerSx = {
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
};

const createImageContainerSx = (width: string, height: string) => ({
  position: "relative",
  display: "grid",
  placeItems: "center",
  overflow: "clip",
  width,
  height,
  maxWidth: `calc(${height} * (16 / 9))`,
  maxHeight: `calc(${width} * (9 / 16))`,
});

interface ImageAndNameProps {
  isAuth: boolean;
  width: string;
  height: string;
  metadataList: ImageMetadataWithIndex[];
  index: number;
}

export default function ImageAndName({
  isAuth,
  width,
  height,
  metadataList,
  index,
}: ImageAndNameProps) {
  const metadata = metadataList[index];

  return (
    <Box sx={containerSx}>
      <BoxM
        variants={carouselsImageVar}
        sx={createImageContainerSx(width, height)}
      >
        <Thumbnail metadata={metadata} />
        {isAuth && <Origin metadata={metadata} />}
        {!isAuth && <Alert />}
      </BoxM>

      <Typography variant="h6" sx={{ position: "absolute", bottom: "3%" }}>
        {metadata.name}
      </Typography>
    </Box>
  );
}
