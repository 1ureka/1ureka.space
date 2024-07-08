"use client";

import type { ImageMetadataWithIndex } from "@/data/type";
import { useCarouselIndex } from "@/hooks";
import { type TypographyProps, Typography } from "@mui/material";

export default function Name({
  metadataList,
  sx,
}: {
  metadataList: ImageMetadataWithIndex[];
  sx?: TypographyProps["sx"];
}) {
  const index = useCarouselIndex(metadataList);

  return (
    <Typography variant="h6" sx={sx}>
      {metadataList[index].name}
    </Typography>
  );
}
