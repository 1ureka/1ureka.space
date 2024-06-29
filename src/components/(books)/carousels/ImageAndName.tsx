"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "@/data/table";

import { BoxM } from "@/components/Motion";
import { carouselsImageVar } from "@/components/MotionProps";
import { delay } from "@/utils/client-utils";

const containerSx = {
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
};

export default function ImageAndName({
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
  // TODO: move to hooks/books
  const [image, setImage] = useState(null);
  useEffect(() => {
    let isCurr = true;

    (async () => {
      await delay(250);
      if (!isCurr) return;
      // TODO: fetch data and decode and setState
      console.log("fetch: " + metadataList[index].name);
    })();

    return () => {
      isCurr = false;
    };
  }, [metadataList, index]);

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
        {"GROUP: " +
          metadataList[index].group +
          ",  NAME: " +
          metadataList[index].name}
      </Typography>
    </Box>
  );
}
