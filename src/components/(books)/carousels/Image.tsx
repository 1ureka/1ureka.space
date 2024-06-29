import { Box, Typography } from "@mui/material";
import type { Metadata } from "@/data/table";

import { BoxM } from "@/components/Motion";
import { carouselsImageVar } from "@/components/MotionProps";

const containerSx = {
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
};

export default function Image({
  width,
  height,
  metadataList,
  index,
}: {
  width: string;
  height: string;
  metadataList: Metadata[];
  index: number;
}) {
  const imageContainerSx = {
    position: "relative",
    display: "grid",
    placeItems: "center",
    overflow: "clip",
    width,
    height,
    maxWidth: `calc(${height} * (16 / 9))`,
    maxHeight: `calc(${width} * (9 / 16))`,
  };

  return (
    <Box sx={containerSx}>
      <BoxM variants={carouselsImageVar} sx={imageContainerSx}>
        {/* <BooksCarouselsImage category={category} name={name} /> */}
      </BoxM>

      <Typography variant="h6" sx={{ position: "absolute", bottom: "3%" }}>
        {metadataList[index].name + " : " + metadataList[index].index}
        {/* TODO: using id to get name  */}
      </Typography>
    </Box>
  );
}
